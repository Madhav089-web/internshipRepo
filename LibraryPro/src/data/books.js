export const initialBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0-7432-7356-5', category: 'Fiction', publisher: 'Scribner', year: 1925, totalCopies: 3, availableCopies: 2, cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300', description: 'A classic American novel set in the Jazz Age.' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0-06-112008-4', category: 'Fiction', publisher: 'J.B. Lippincott', year: 1960, totalCopies: 4, availableCopies: 3, cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300', description: 'Pulitzer Prize novel about racial injustice in the South.' },
  { id: 3, title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '978-0-553-38016-3', category: 'Science', publisher: 'Bantam Books', year: 1988, totalCopies: 2, availableCopies: 0, cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300', description: 'Landmark book on cosmology and black holes.' },
  { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '978-0-06-231609-7', category: 'History', publisher: 'Harper', year: 2011, totalCopies: 5, availableCopies: 3, cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300', description: 'Bold narrative of human history.' },
  { id: 5, title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0-13-235088-4', category: 'Technology', publisher: 'Prentice Hall', year: 2008, totalCopies: 3, availableCopies: 1, cover: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=300', description: 'Best practices for writing maintainable code.' },
  { id: 6, title: '1984', author: 'George Orwell', isbn: '978-0-452-28423-4', category: 'Fiction', publisher: 'Secker & Warburg', year: 1949, totalCopies: 4, availableCopies: 4, cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300', description: 'Dystopian novel about totalitarianism.' },
  { id: 7, title: 'The Pragmatic Programmer', author: 'David Thomas', isbn: '978-0-20-161622-4', category: 'Technology', publisher: 'Addison-Wesley', year: 1999, totalCopies: 2, availableCopies: 2, cover: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=300', description: 'Classic guide to software development.' },
  { id: 8, title: 'Educated', author: 'Tara Westover', isbn: '978-0-39-959050-4', category: 'Biography', publisher: 'Random House', year: 2018, totalCopies: 3, availableCopies: 2, cover: 'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?w=300', description: 'Memoir of a woman who earns a PhD from Cambridge.' },
  { id: 9, title: 'The Origin of Species', author: 'Charles Darwin', isbn: '978-0-14-043205-3', category: 'Science', publisher: 'John Murray', year: 1859, totalCopies: 2, availableCopies: 2, cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', description: 'Foundational work on evolutionary biology.' },
  { id: 10, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', isbn: '978-0-37-453355-7', category: 'Non-Fiction', publisher: 'FSG', year: 2011, totalCopies: 4, availableCopies: 3, cover: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=300', description: 'Two systems that drive the way we think.' },
  { id: 11, title: 'The Alchemist', author: 'Paulo Coelho', isbn: '978-0-06-231500-7', category: 'Fiction', publisher: 'HarperOne', year: 1988, totalCopies: 5, availableCopies: 4, cover: 'https://images.unsplash.com/photo-1576872381149-7847515ce5d8?w=300', description: 'Young shepherd journeying to find treasure.' },
  { id: 12, title: 'Guns, Germs, and Steel', author: 'Jared Diamond', isbn: '978-0-39-331755-8', category: 'History', publisher: 'W.W. Norton', year: 1997, totalCopies: 3, availableCopies: 2, cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300', description: 'Why Western societies dominated the world.' },
  { id: 13, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', isbn: '978-0-59-651774-8', category: 'Technology', publisher: "O'Reilly", year: 2008, totalCopies: 3, availableCopies: 1, cover: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300', description: 'Excellence in JavaScript programming.' },
  { id: 14, title: 'Steve Jobs', author: 'Walter Isaacson', isbn: '978-1-45-164893-4', category: 'Biography', publisher: 'Simon & Schuster', year: 2011, totalCopies: 4, availableCopies: 3, cover: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300', description: 'Riveting story of the ultimate entrepreneur.' },
  { id: 15, title: 'The Selfish Gene', author: 'Richard Dawkins', isbn: '978-0-19-857519-1', category: 'Science', publisher: 'Oxford University Press', year: 1976, totalCopies: 2, availableCopies: 2, cover: 'https://images.unsplash.com/photo-1419640303358-44f0d27f48e7?w=300', description: 'Gene-centered view of evolution.' },
  { id: 16, title: 'Dune', author: 'Frank Herbert', isbn: '978-0-44-100590-9', category: 'Fiction', publisher: 'Chilton Books', year: 1965, totalCopies: 3, availableCopies: 1, cover: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', description: 'Epic sci-fi on a desert planet.' },
  { id: 17, title: 'Atomic Habits', author: 'James Clear', isbn: '978-0-73-521129-2', category: 'Non-Fiction', publisher: 'Avery', year: 2018, totalCopies: 6, availableCopies: 4, cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300', description: 'Framework for improving through small habits.' },
  { id: 18, title: 'The Art of War', author: 'Sun Tzu', isbn: '978-1-59-030963-3', category: 'History', publisher: 'Shambhala', year: 500, totalCopies: 4, availableCopies: 4, cover: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=300', description: 'Ancient Chinese military treatise.' },
  { id: 19, title: 'Becoming', author: 'Michelle Obama', isbn: '978-1-52-476313-8', category: 'Biography', publisher: 'Crown', year: 2018, totalCopies: 5, availableCopies: 3, cover: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300', description: 'Memoir of the former First Lady.' },
  { id: 20, title: 'Design Patterns', author: 'Gang of Four', isbn: '978-0-20-163361-2', category: 'Technology', publisher: 'Addison-Wesley', year: 1994, totalCopies: 2, availableCopies: 0, cover: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=300', description: '23 classic design patterns for OOP.' }
];

export const CATEGORIES = [
  'All',
  'Fiction',
  'Non-Fiction',
  'Science',
  'History',
  'Technology',
  'Biography'
];

export const getRelativeDate = (daysOffset) => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
};

export const initialBorrowingRecords = [
  {
    id: 'rec-101',
    bookId: 3,
    bookTitle: 'A Brief History of Time',
    borrowerName: 'Eleanor Vance',
    borrowDate: getRelativeDate(-21),
    dueDate: getRelativeDate(-7),
    returnDate: null,
    status: 'overdue'
  },
  {
    id: 'rec-102',
    bookId: 3,
    bookTitle: 'A Brief History of Time',
    borrowerName: 'Julian Sterling',
    borrowDate: getRelativeDate(-18),
    dueDate: getRelativeDate(-4),
    returnDate: null,
    status: 'overdue'
  },
  {
    id: 'rec-103',
    bookId: 20,
    bookTitle: 'Design Patterns',
    borrowerName: 'Marcus Zhang',
    borrowDate: getRelativeDate(-10),
    dueDate: getRelativeDate(4),
    returnDate: null,
    status: 'active'
  },
  {
    id: 'rec-104',
    bookId: 20,
    bookTitle: 'Design Patterns',
    borrowerName: 'Sarah Jenkins',
    borrowDate: getRelativeDate(-5),
    dueDate: getRelativeDate(9),
    returnDate: null,
    status: 'active'
  },
  {
    id: 'rec-105',
    bookId: 5,
    bookTitle: 'Clean Code',
    borrowerName: 'Liam O’Connor',
    borrowDate: getRelativeDate(-8),
    dueDate: getRelativeDate(6),
    returnDate: null,
    status: 'active'
  },
  {
    id: 'rec-106',
    bookId: 5,
    bookTitle: 'Clean Code',
    borrowerName: 'Amara Okafor',
    borrowDate: getRelativeDate(-6),
    dueDate: getRelativeDate(8),
    returnDate: null,
    status: 'active'
  },
  {
    id: 'rec-107',
    bookId: 1,
    bookTitle: 'The Great Gatsby',
    borrowerName: 'Chloe Bennett',
    borrowDate: getRelativeDate(-12),
    dueDate: getRelativeDate(2),
    returnDate: null,
    status: 'active'
  },
  {
    id: 'rec-108',
    bookId: 17,
    bookTitle: 'Atomic Habits',
    borrowerName: 'David Kim',
    borrowDate: getRelativeDate(-25),
    dueDate: getRelativeDate(-11),
    returnDate: getRelativeDate(-10),
    status: 'returned'
  },
  {
    id: 'rec-109',
    bookId: 4,
    bookTitle: 'Sapiens',
    borrowerName: 'Hannah Abbott',
    borrowDate: getRelativeDate(-15),
    dueDate: getRelativeDate(-1),
    returnDate: null,
    status: 'overdue'
  }
];
