import React from 'react';
import { LibraryProvider, useLibrary } from './context/LibraryContext';
import Dashboard from './components/Dashboard';
import BookCatalog from './components/BookCatalog';
import BorrowingRecords from './components/BorrowingRecords';
import BookModal from './components/BookModal';
import AddBookForm from './components/AddBookForm';
import BorrowModal from './components/BorrowModal';
import ConfirmDialog from './components/ConfirmDialog';
import { CheckCircle, AlertCircle, Info, BookOpen } from 'lucide-react';

const MainApp = () => {
  const {
    activeView,
    modalState,
    closeModal,
    deleteBook,
    returnBook,
    toast
  } = useLibrary();

  return (
    <div className="app-container">
      {}
      {toast && (
        <div className={`toast-notification toast--${toast.type}`} role="alert">
          <div className="toast-icon">
            {toast.type === 'error' ? (
              <AlertCircle size={20} />
            ) : toast.type === 'info' ? (
              <Info size={20} />
            ) : (
              <CheckCircle size={20} />
            )}
          </div>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}

      {}
      <div className="app-wrapper">
        <Dashboard />

        <main className="main-content">
          {activeView === 'catalog' ? <BookCatalog /> : <BorrowingRecords />}
        </main>

        {}
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-title">
                <BookOpen size={16} /> LibraryPro System
              </span>
              <span className="footer-sep">•</span>
              <span>Archival &amp; Circulation Suite</span>
            </div>
            <p className="footer-copy">
              Built with React, Vite &amp; LocalStorage Persistence. Designed with classic amber &amp; sepia aesthetic.
            </p>
          </div>
        </footer>
      </div>

      {}
      {modalState.isOpen && (
        <>
          {modalState.type === 'add' && (
            <AddBookForm onClose={closeModal} />
          )}

          {modalState.type === 'edit' && (
            <AddBookForm
              initialData={modalState.data}
              isEdit={true}
              onClose={closeModal}
            />
          )}

          {modalState.type === 'detail' && (
            <BookModal book={modalState.data} onClose={closeModal} />
          )}

          {modalState.type === 'borrow' && (
            <BorrowModal book={modalState.data} onClose={closeModal} />
          )}

          {modalState.type === 'delete' && (
            <ConfirmDialog
              title="Delete Book from Archive"
              message={`Are you sure you want to remove "${modalState.data?.title}" from the catalog? This action will permanently remove it from library records.`}
              confirmText="Delete Book"
              confirmVariant="danger"
              onConfirm={() => deleteBook(modalState.data?.id)}
              onClose={closeModal}
            />
          )}

          {modalState.type === 'confirmReturn' && (
            <ConfirmDialog
              title="Confirm Return of Book"
              message={`Confirm return of "${modalState.data?.bookTitle}" issued to patron "${modalState.data?.borrowerName}"? This will return 1 copy to shelf stock.`}
              confirmText="Confirm Return"
              confirmVariant="primary"
              onConfirm={() => returnBook(modalState.data?.recordId)}
              onClose={closeModal}
            />
          )}
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <LibraryProvider>
      <MainApp />
    </LibraryProvider>
  );
}

export default App;
