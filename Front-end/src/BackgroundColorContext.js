import React from 'react';

const BackgroundColorContext = React.createContext();

export const BackgroundColorProvider = BackgroundColorContext.Provider;
export const BackgroundColorConsumer = BackgroundColorContext.Consumer;

export const useBackgroundColor = () => {
    return React.useContext(BackgroundColorContext);
};

export default BackgroundColorContext;
