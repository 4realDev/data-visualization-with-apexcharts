import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from './store'

// Create typed versions of plain 'useSelector' and 'useDispatch'
// Instead of importing RootState and AppDispatch types into each component, which needs to dispatch actions or select the data
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
