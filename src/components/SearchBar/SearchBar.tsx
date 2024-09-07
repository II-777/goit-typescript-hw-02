// External Libraries
import React from 'react';
import { Field, Form, Formik, FormikErrors, FormikValues } from 'formik';
import { HiOutlineSearch } from 'react-icons/hi';

// Styles 
import css from './SearchBar.module.css';

// Define the shape of the initial form values
interface FormValues {
  newQuery: string;
}

// Define the props for the SearchBar component
interface SearchBarProps {
  onSearch: (query: string) => void;
}

// Define the SearchBar functional component
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const INITIAL_VALUES: FormValues = {
    newQuery: '',
  };

  const handleSubmit = (values: FormValues) => {
    onSearch(values.newQuery);
  };

  return (
    <header className={css.searchBarHeader}>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
      >
        {({ errors }: { errors: FormikErrors<FormValues> }) => (
          <Form className={css.searchForm}>
            <button
              disabled={Object.keys(errors).length > 0}
              className={css.searchFormBtn}
              type="submit"
            >
              <HiOutlineSearch size="24" className={css.searchFormIcon} />
              <span className={css.searchFormBtnLabel}>Search</span>
            </button>
            <Field
              type="text"
              name="newQuery"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              className={css.searchFormInput}
            />
          </Form>
        )}
      </Formik>
    </header>
  );
};

export default SearchBar;
