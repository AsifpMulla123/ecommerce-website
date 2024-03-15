import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants"
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from '../../order/OrderSlice';
import { PencilIcon, EyeIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import Pagination from '../../common/Pagination';
const AdminOrder = () => {
    //eslint-disable-next-line
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders)
    const totalOrders = useSelector(selectTotalOrders)
    console.log(totalOrders);
    const [editableOrderId, setEditableOrderId] = useState(-1);
    const [sort, setSort] = useState({});

    const handleShow = (order) => {
        setEditableOrderId(order.id);
        console.log("handleShow");
    }
    const handleEdit = (order) => {
        console.log("handleEdit", order);
    }
    const handleUpdate = (e, order) => {
        const updateOrder = { ...order, status: e.target.value }
        dispatch(updateOrderAsync(updateOrder));
        setEditableOrderId(-1);
    }
    const handlePage = (page) => {
        setPage(page);
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
        dispatch(fetchAllOrdersAsync(pagination));
    }
    const handleSort = (sortOption) => {
        const sort = { _sort: sortOption.sort, _order: sortOption.order };
        console.log({ sort });
        setSort(sort);
    }
    const chooseColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-purple-200 text-purple-600';
            case 'dispatched':
                return 'bg-yellow-200 text-yellow-600';
            case 'delivered':
                return 'bg-green-200 text-green-600';
            case 'cancelled':
                return 'bg-red-200 text-red-600';

            default:
                return 'bg-purple-200 text-purple-600';
        }
    }
    useEffect(() => {
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
        dispatch(fetchAllOrdersAsync({ sort, pagination }));
        // handlePage();
    }, [dispatch, page, sort])
    return (
        <div className="overflow-x-auto">
            <div className=" flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
                <div className="w-full">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left cursor-pointer" onClick={e => handleSort({ sort: 'id', order: sort?._order === 'asc' ? 'desc' : 'asc' })}>Order Number {
                                        sort._sort === 'id' && (sort._order === 'asc' ? (<ArrowUpIcon className="w-4 h-4 inline" />) : (<ArrowDownIcon className="w-4 h-4 inline" />))}
                                    </th>
                                    <th className="py-3 px-6 text-left">Items</th>
                                    <th className="py-3 px-6 text-left cursor-pointer" onClick={e => handleSort({ sort: 'totalAmount', order: sort?._order === 'asc' ? 'desc' : 'asc' })}>total Amount {
                                        sort._sort === 'totalAmount' && (sort._order === 'asc' ? (<ArrowUpIcon className="w-4 h-4 inline" />) : (<ArrowDownIcon className="w-4 h-4 inline" />))}
                                    </th>
                                    <th className="py-3 px-6 text-center">Status</th>
                                    <th className="py-3 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {orders.map((order) => <tr className="border-b border-gray-200 hover:bg-gray-100"
                                    key={order.id}
                                >
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                            </div>
                                            <span className="font-medium">{order.id}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {order.items.map((item, index) =>
                                            <div
                                                key={index}
                                                className="flex items-center">
                                                <div className="mr-2">
                                                    <img
                                                        className="w-6 h-6 rounded-full"
                                                        src={item.product.thumbnail}
                                                        alt={item.product.title}
                                                    />
                                                </div>
                                                <span>{item.product.title} - # {item.quantity} - ₹{discountedPrice(item.product)}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex items-center justify-center">
                                            ₹{order.totalAmount}
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="">
                                            <div>
                                                <strong>{order.selectedAddress.name}</strong>,
                                            </div>
                                            <div>{order.selectedAddress.street},</div>
                                            <div>{order.selectedAddress.city}, </div>
                                            <div>{order.selectedAddress.state}, </div>
                                            <div>{order.selectedAddress.pinCode}, </div>
                                            <div>{order.selectedAddress.phone}, </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {order.id === editableOrderId ? (
                                            <select onChange={e => handleUpdate(e, order)}>
                                                <option value="Pending">Pending</option>
                                                <option value="dispatched">Dispatched</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        ) : (
                                            <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                                                {order.status}
                                            </span>

                                        )
                                        }
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center">
                                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                <EyeIcon className="w-4 h-4" onClick={e => handleShow(order)}></EyeIcon>
                                            </div>
                                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                <PencilIcon className="w-4 h-4" onClick={e => handleEdit(order)}></PencilIcon>
                                            </div>
                                        </div>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Pagination page={page} setPage={setPage}
                handlePage={handlePage} totalItems={totalOrders}
            />
        </div>
    )
}

export default AdminOrder