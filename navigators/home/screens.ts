import { NavigatorScreenParams } from '@react-navigation/core';
import { Book } from '../../store/books/index';

export type TabScreenParam = {
  Home: undefined;
  Chart: undefined;
  Online: undefined;
  Custom: undefined
};

export type HomeScreenParam = {
  Tab: TabScreenParam;
  Book: {
    data: Book
  };
  NewBook: {
    edit : boolean,
    data?: Book
  }
};
