import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import { Tokens, getAPIInstance, getAxiosInstance } from '../utils/axios';
// @types
import { ActionMap, AuthState, AuthUser, JWTContextType } from '../@types/auth';

// ----------------------------------------------------------------------

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER',
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUser;
  };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  const axios = getAxiosInstance();
  const api = getAPIInstance();

  useEffect(() => {
    const initialize = async () => {
      try {

        const response = await api.get('/api/user/me');

        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: true,
            user: response.data
          }
        });

      } catch (err) {
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post('/api/auth/login', {
      email,
      password,
    });

    const { accessToken, refreshToken, user } = response.data;

    localStorage.setItem(Tokens.refreshToken, refreshToken);
    localStorage.setItem(Tokens.accessToken, accessToken);
    
    dispatch({
      type: Types.Login,
      payload: {
        user
      },
    });
  };

  const register = async (data: Record<string, any>) => {
    const response = await axios.post('/api/auth/register',data);
    const { accessToken, refreshToken, user } = response.data;

    localStorage.setItem(Tokens.refreshToken, refreshToken);
    localStorage.setItem(Tokens.accessToken, accessToken);
    
    dispatch({
      type: Types.Register,
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    await api.post('/api/auth/logout', {});
    
    localStorage.removeItem(Tokens.refreshToken);
    localStorage.removeItem(Tokens.accessToken);
    
    dispatch({ 
      type: Types.Logout 
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
