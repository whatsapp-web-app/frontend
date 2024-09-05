import {Provider} from "react-redux";
import store, {persistor} from "../store";
import {PersistGate} from "redux-persist/integration/react";
import {FC, ReactNode} from "react";


type Props={
    children:ReactNode
}

const StoreProvider:FC<Props>=({children})=>{
    return(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default StoreProvider;
