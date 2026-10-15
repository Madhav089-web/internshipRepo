import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialBooks, initialBorrowingRecords, getRelativeDate } from '../data/books';

const LibraryContext = createContext(null);

const STORAGE_KEYS = {
  BOOKS: 'librarypro_books',
  RECORDS: 'librarypro_borrowing_records',
  VIEW: 'librarypro_active_view'
};

export const LibraryProvider = ({ children }) => {
  
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load books from localStorage', e);
    }
    return initialBooks;
  });

  
  const [borrowingRecords, setBorrowingRecords] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECORDS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load records from localStorage', e);
    }
    return initialBorrowingRecords;
  });

  
  const [activeView, setActiveView] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VIEW);
      if (saved === 'catalog' || saved === 'records') return saved;
    } catch (e) {
      
    }
    return 'catalog';
  });

  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All'); 

  
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, 
    data: null
  });

  
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
    } catch (e) {
      console.error('Failed to save books to localStorage', e);
    }
  }, [books]);

  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(borrowingRecords));
    } catch (e) {
      console.error('Failed to save records to localStorage', e);
    }
  }, [borrowingRecords]);

  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VIEW, activeView);
    } catch (e) {
      
    }
  }, [activeView]);

  
  const isRecordOverdue = (record) => {
    if (record.returnDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(record.dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  };

  
  const getRecordStatus = (record) => {
    if (record.returnDate) return 'returned';
    if (isRecordOverdue(record)) return 'overdue';
    return 'active';
  };

  
  const activeRecordsWithStatus = useMemo(() => {
    return borrowingRecords.map((rec) => {
      const currentStatus = getRecordStatus(rec);
      if (rec.status !== currentStatus) {
        return { ...rec, status: currentStatus };
      }
      return rec;
    });
  }, [borrowingRecords]);

  
  const stats = useMemo(() => {
    const totalBooks = books.length;
    const availableBooks = books.filter((b) => Number(b.availableCopies) > 0).length;

    
    const activeLoans = activeRecordsWithStatus.filter(
      (r) => !r.returnDate && (r.status === 'active' || r.status === 'overdue')
    );
    const borrowedBooks = activeLoans.length;

    
    const overdueBooks = activeLoans.filter((r) => r.status === 'overdue').length;

    const totalCopiesSum = books.reduce((sum, b) => sum + (Number(b.totalCopies) || 0), 0);
    const availableCopiesSum = books.reduce((sum, b) => sum + (Number(b.availableCopies) || 0), 0);

    return {
      totalBooks,
      availableBooks,
      borrowedBooks,
      overdueBooks,
      totalCopiesSum,
      availableCopiesSum
    };
  }, [books, activeRecordsWithStatus]);

  
  const bookHasOverdueCopies = (bookId) => {
    return activeRecordsWithStatus.some(
      (r) => Number(r.bookId) === Number(bookId) && !r.returnDate && r.status === 'overdue'
    );
  };

  
  const getBookActiveBorrowers = (bookId) => {
    return activeRecordsWithStatus.filter(
      (r) => Number(r.bookId) === Number(bookId) && !r.returnDate
    );
  };

  
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !q ||
        book.title?.toLowerCase().includes(q) ||
        book.author?.toLowerCase().includes(q) ||
        book.isbn?.toLowerCase().includes(q);

      
      const matchesCategory =
        selectedCategory === 'All' ||
        book.category?.toLowerCase() === selectedCategory.toLowerCase();

      
      let matchesAvailability = true;
      if (availabilityFilter === 'Available') {
        matchesAvailability = Number(book.availableCopies) > 0;
      } else if (availabilityFilter === 'Borrowed') {
        matchesAvailability = Number(book.availableCopies) < Number(book.totalCopies);
      } else if (availabilityFilter === 'Overdue') {
        matchesAvailability = bookHasOverdueCopies(book.id);
      }

      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [books, searchTerm, selectedCategory, availabilityFilter, activeRecordsWithStatus]);

  

  
  const addBook = (newBookData) => {
    const nextId = books.length > 0 ? Math.max(...books.map((b) => Number(b.id) || 0)) + 1 : 1;
    const totalCopies = parseInt(newBookData.totalCopies, 10) || 1;
    const newBook = {
      ...newBookData,
      id: nextId,
      totalCopies,
      availableCopies: totalCopies,
      year: parseInt(newBookData.year, 10) || new Date().getFullYear(),
      cover:
        newBookData.cover?.trim() ||
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300'
    };

    setBooks((prev) => [newBook, ...prev]);
    showToast(`"${newBook.title}" added to catalog.`);
    closeModal();
    return newBook;
  };

  
  const editBook = (updatedBookData) => {
    const totalCopies = parseInt(updatedBookData.totalCopies, 10) || 1;
    setBooks((prev) =>
      prev.map((b) => {
        if (Number(b.id) === Number(updatedBookData.id)) {
          
          const activeBorrowedCount = (Number(b.totalCopies) || 0) - (Number(b.availableCopies) || 0);
          const safeAvailableCopies = Math.max(0, totalCopies - activeBorrowedCount);

          return {
            ...b,
            ...updatedBookData,
            totalCopies,
            availableCopies: safeAvailableCopies,
            year: parseInt(updatedBookData.year, 10) || b.year
          };
        }
        return b;
      })
    );

    
    setBorrowingRecords((prev) =>
      prev.map((rec) => {
        if (Number(rec.bookId) === Number(updatedBookData.id)) {
          return { ...rec, bookTitle: updatedBookData.title };
        }
        return rec;
      })
    );

    showToast(`"${updatedBookData.title}" updated successfully.`);
    closeModal();
  };

  
  const deleteBook = (bookId) => {
    const bookToDelete = books.find((b) => Number(b.id) === Number(bookId));
    const activeLoans = activeRecordsWithStatus.filter(
      (r) => Number(r.bookId) === Number(bookId) && !r.returnDate
    );

    if (activeLoans.length > 0) {
      showToast(
        `Cannot delete "${bookToDelete?.title}": ${activeLoans.length} copy is currently borrowed.`,
        'error'
      );
      closeModal();
      return false;
    }

    setBooks((prev) => prev.filter((b) => Number(b.id) !== Number(bookId)));
    
    setBorrowingRecords((prev) => prev.filter((r) => Number(r.bookId) !== Number(bookId)));

    showToast(`"${bookToDelete?.title || 'Book'}" deleted from library.`);
    closeModal();
    return true;
  };

  
  const borrowBook = (bookId, borrowerName) => {
    const book = books.find((b) => Number(b.id) === Number(bookId));
    if (!book) {
      showToast('Book not found.', 'error');
      return false;
    }

    if (Number(book.availableCopies) <= 0) {
      showToast(`No copies of "${book.title}" are currently available.`, 'error');
      return false;
    }

    const todayStr = getRelativeDate(0);
    const dueStr = getRelativeDate(14); 

    const newRecord = {
      id: `rec-${Date.now()}`,
      bookId: Number(book.id),
      bookTitle: book.title,
      borrowerName: borrowerName.trim(),
      borrowDate: todayStr,
      dueDate: dueStr,
      returnDate: null,
      status: 'active'
    };

    
    setBooks((prev) =>
      prev.map((b) =>
        Number(b.id) === Number(bookId)
          ? { ...b, availableCopies: Math.max(0, Number(b.availableCopies) - 1) }
          : b
      )
    );

    
    setBorrowingRecords((prev) => [newRecord, ...prev]);

    showToast(`"${book.title}" borrowed by ${borrowerName.trim()}! Due in 14 days.`);
    closeModal();
    return true;
  };

  
  const returnBook = (recordIdOrBookId) => {
    
    let recordToReturn = activeRecordsWithStatus.find(
      (r) => r.id === recordIdOrBookId && !r.returnDate
    );

    if (!recordToReturn) {
      
      recordToReturn = activeRecordsWithStatus.find(
        (r) => Number(r.bookId) === Number(recordIdOrBookId) && !r.returnDate
      );
    }

    if (!recordToReturn) {
      showToast('No active borrowing record found to return.', 'error');
      closeModal();
      return false;
    }

    const todayStr = getRelativeDate(0);

    
    setBorrowingRecords((prev) =>
      prev.map((r) =>
        r.id === recordToReturn.id
          ? { ...r, returnDate: todayStr, status: 'returned' }
          : r
      )
    );

    
    setBooks((prev) =>
      prev.map((b) => {
        if (Number(b.id) === Number(recordToReturn.bookId)) {
          return {
            ...b,
            availableCopies: Math.min(Number(b.totalCopies), Number(b.availableCopies) + 1)
          };
        }
        return b;
      })
    );

    showToast(`"${recordToReturn.bookTitle}" marked as returned!`);
    closeModal();
    return true;
  };

  
  const resetToSampleData = () => {
    setBooks(initialBooks);
    setBorrowingRecords(initialBorrowingRecords);
    showToast('Catalog & borrowing records reset to initial sample data.');
  };

  
  const openModal = (type, data = null) => {
    setModalState({ isOpen: true, type, data });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, data: null });
  };

  const value = {
    books,
    borrowingRecords: activeRecordsWithStatus,
    activeView,
    setActiveView,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    availabilityFilter,
    setAvailabilityFilter,
    filteredBooks,
    stats,
    modalState,
    openModal,
    closeModal,
    toast,
    showToast,
    addBook,
    editBook,
    deleteBook,
    borrowBook,
    returnBook,
    bookHasOverdueCopies,
    getBookActiveBorrowers,
    resetToSampleData
  };

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
