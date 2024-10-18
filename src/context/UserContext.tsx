'use client'

// UserContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface UserContextType {
  profileUser: {
    username: string;
    email: string;
  };
  setProfileUser: React.Dispatch<React.SetStateAction<{
    username: string;
    email: string;
  }>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useProfileUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useProfileUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profileUser, setProfileUser] = useState({
    username: '',
    email: '',
  });

  return (
    <UserContext.Provider value={{ profileUser, setProfileUser }}>
      {children}
    </UserContext.Provider>
  );
};
