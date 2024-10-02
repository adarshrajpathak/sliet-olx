// ThemeReducer.jsx

const ThemeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LIGHT_THEME':
      return {
        ...state,
        theme: 'light',
      };
    case 'SET_DARK_THEME':
      return {
        ...state,
        theme: 'dark',
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
};

export default ThemeReducer;
