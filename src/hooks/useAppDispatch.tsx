import { useDispatch } from "react-redux";
import {AppDispatch} from "../store/index.types";


type DispatchFunc = () => AppDispatch;
const useAppDispatch: DispatchFunc = useDispatch;

export default useAppDispatch;
