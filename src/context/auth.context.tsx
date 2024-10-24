import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

type AuthContext = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

export const AuthContext = createContext({} as AuthContext);

//Reducers

const initialState = {
  isAuthenticated: false,
  user: null,
};

type AuthState = {
  isAuthenticated: boolean;
  user: any;
};

type AuthAction = { type: "LOGIN"; payload: any } | { type: "LOGOUT" };

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const values = useMemo(() => ({ state, dispatch }), [state]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "LOGIN", payload: JSON.parse(user) });
    }
  }, []);

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
