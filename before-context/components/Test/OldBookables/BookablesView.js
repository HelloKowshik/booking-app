import React, { Fragment, useReducer } from 'react';
import BookableDetails from './BookableDetails';
import BookablesList from './BookablesList';
import reducer from './reducer';

const initialState = {
  group: 'Rooms',
  bookableIndex: 0,
  bookables: [],
  isLoading: true,
  errors: false,
};

const BookablesView = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const bookableInGroup = state.bookables.filter(
    (b) => b.group === state.group
  );
  const bookable = bookableInGroup[state.bookableIndex];
  return (
    <Fragment>
      <BookablesList state={state} dispatch={dispatch} />
      <BookableDetails bookable={bookable} />
    </Fragment>
  );
};

export default BookablesView;
