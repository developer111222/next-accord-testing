// app/dashboard/page.

'use client'
import { useEffect } from 'react';
import { RootState, AppDispatch } from '../../redux/store';
import { useAppDispatch,useAppSelector } from '@/redux/hooks';
import { getProducts, resetState } from '@/redux/slices/ProductSlice';
import Loader from '@/utils/Loader';
export default function DashboardPage() {

  const dispatch = useAppDispatch();
  // const router = useRouter();
  const { loading, error, message, success, products } = useAppSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(getProducts());
 
  }, [dispatch]);
  return (
    <div>
       {loading && <Loader />}
       {error && <p>{error}</p>}
       <div className='border-2 border-vlack w-100 h-60 p-10 rounded-lg' >
<h2 className='lg:text-5xl text-center font-bold'>Products</h2>

<p className='text-center lg:text-4xl my-10 p-5 rounded-full border-3'>{products.length}</p>
       </div>
    </div>
  )
}
