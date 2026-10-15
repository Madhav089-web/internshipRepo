import React, { useState, useEffect } from 'react';
import { X, BookPlus, Save, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { CATEGORIES } from '../data/books';

const AddBookForm = ({ initialData, isEdit = false, onClose }) => {
  const { addBook, editBook } = useLibrary();

  const selectableCategories = CATEGORIES.filter((c) => c !== 'All');

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: selectableCategories[0] || 'Fiction',
    publisher: '',
    year: new Date().getFullYear(),
    totalCopies: 3,
    cover: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    if (initialData && isEdit) {
      setFormData({
        id: initialData.id,
        title: initialData.title || '',
        author: initialData.author || '',
        isbn: initialData.isbn || '',
        category: initialData.category || selectableCategories[0],
        publisher: initialData.publisher || '',
        year: initialData.year || new Date().getFullYear(),
        totalCopies: initialData.totalCopies || 1,
        cover: initialData.cover || '',
        description: initialData.description || ''
      });
    }
  }, [initialData, isEdit]);

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Book title is required.';
    } else if (formData.title.trim().length < 2) {
      errs.title = 'Title must be at least 2 characters.';
    }

    if (!formData.author.trim()) {
      errs.author = 'Author name is required.';
    } else if (formData.author.trim().length < 2) {
      errs.author = 'Author name must be at least 2 characters.';
    }

    if (!formData.isbn.trim()) {
      errs.isbn = 'ISBN is required.';
    } else if (formData.isbn.trim().replace(/[-\s]/g, '').length < 9) {
      errs.isbn = 'Please provide a valid ISBN (min 10 characters or digits).';
    }

    if (!formData.publisher.trim()) {
      errs.publisher = 'Publisher is required.';
    }

    const currentYear = new Date().getFullYear();
    const yearNum = Number(formData.year);
    if (!formData.year || isNaN(yearNum) || yearNum < 500 || yearNum > currentYear + 2) {
      errs.year = `Valid year between 500 and ${currentYear + 2} is required.`;
    }

    const copiesNum = Number(formData.totalCopies);
    if (!formData.totalCopies || isNaN(copiesNum) || copiesNum < 1 || copiesNum > 500) {
      errs.totalCopies = 'Total copies must be between 1 and 500.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (name === 'cover') {
      setPreviewError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEdit) {
      editBook({
        ...formData,
        year: parseInt(formData.year, 10),
        totalCopies: parseInt(formData.totalCopies, 10)
      });
    } else {
      addBook({
        ...formData,
        year: parseInt(formData.year, 10),
        totalCopies: parseInt(formData.totalCopies, 10)
      });
    }
  };

  const sampleCoverUrls = [
    { label: 'Classic Bookshelf', url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300' },
    { label: 'Leather Tome', url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300' },
    { label: 'Open Manuscript', url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300' }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window modal-lg" onClick={(e) => e.stopPropagation()}>
        {}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-eyebrow">
              {isEdit ? 'Collection Revision' : 'Catalog Addition'}
            </span>
            <h2 className="modal-title">
              {isEdit ? `Edit "${initialData?.title || 'Book'}"` : 'Add New Book to Collection'}
            </h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {}
        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body form-grid">
            {}
            <div className="form-group col-span-2">
              <label htmlFor="book-title" className="form-label required">
                Book Title
              </label>
              <input
                id="book-title"
                name="title"
                type="text"
                className={`form-input ${errors.title ? 'form-input--error' : ''}`}
                placeholder="e.g. The Brothers Karamazov"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>

            {}
            <div className="form-group">
              <label htmlFor="book-author" className="form-label required">
                Author
              </label>
              <input
                id="book-author"
                name="author"
                type="text"
                className={`form-input ${errors.author ? 'form-input--error' : ''}`}
                placeholder="e.g. Fyodor Dostoevsky"
                value={formData.author}
                onChange={handleChange}
              />
              {errors.author && <span className="form-error">{errors.author}</span>}
            </div>

            {}
            <div className="form-group">
              <label htmlFor="book-isbn" className="form-label required">
                ISBN Number
              </label>
              <input
                id="book-isbn"
                name="isbn"
                type="text"
                className={`form-input mono ${errors.isbn ? 'form-input--error' : ''}`}
                placeholder="e.g. 978-0-14-044924-2"
                value={formData.isbn}
                onChange={handleChange}
              />
              {errors.isbn && <span className="form-error">{errors.isbn}</span>}
            </div>

            {}
            <div className="form-group">
              <label htmlFor="book-category" className="form-label required">
                Category
              </label>
              <select
                id="book-category"
                name="category"
                className="form-input form-select"
                value={formData.category}
                onChange={handleChange}
              >
                {selectableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {}
            <div className="form-group">
              <label htmlFor="book-publisher" className="form-label required">
                Publisher
              </label>
              <input
                id="book-publisher"
                name="publisher"
                type="text"
                className={`form-input ${errors.publisher ? 'form-input--error' : ''}`}
                placeholder="e.g. Penguin Classics"
                value={formData.publisher}
                onChange={handleChange}
              />
              {errors.publisher && <span className="form-error">{errors.publisher}</span>}
            </div>

            {}
            <div className="form-group">
              <label htmlFor="book-year" className="form-label required">
                Publication Year
              </label>
              <input
                id="book-year"
                name="year"
                type="number"
                min="500"
                max={new Date().getFullYear() + 2}
                className={`form-input ${errors.year ? 'form-input--error' : ''}`}
                value={formData.year}
                onChange={handleChange}
              />
              {errors.year && <span className="form-error">{errors.year}</span>}
            </div>

            {}
            <div className="form-group">
              <label htmlFor="book-totalCopies" className="form-label required">
                Total Copies in Archive
              </label>
              <input
                id="book-totalCopies"
                name="totalCopies"
                type="number"
                min="1"
                max="500"
                className={`form-input ${errors.totalCopies ? 'form-input--error' : ''}`}
                value={formData.totalCopies}
                onChange={handleChange}
              />
              {errors.totalCopies && <span className="form-error">{errors.totalCopies}</span>}
            </div>

            {}
            <div className="form-group col-span-2">
              <label htmlFor="book-cover" className="form-label">
                Cover Image URL (Optional)
              </label>
              <div className="cover-input-wrapper">
                <input
                  id="book-cover"
                  name="cover"
                  type="url"
                  className="form-input"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.cover}
                  onChange={handleChange}
                />
              </div>
              <div className="quick-cover-suggestions">
                <span className="suggestion-label">Quick sample covers:</span>
                {sampleCoverUrls.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="suggestion-chip"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, cover: s.url }));
                      setPreviewError(false);
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {}
            <div className="form-group col-span-2">
              <label htmlFor="book-description" className="form-label">
                Archival Description / Synopsis
              </label>
              <textarea
                id="book-description"
                name="description"
                rows="3"
                className="form-input form-textarea"
                placeholder="Brief summary of the book, subject matter, or literary context..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? <Save size={16} /> : <BookPlus size={16} />}
              <span>{isEdit ? 'Save Changes' : 'Add to Catalog'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
