import { NotSignIn } from '@/components/layout/AuthLayout';
import OrderFormPay from '@/components/orders/OrderFormPay';
import { GET_ORDER } from '@/graphql/orders';
import { useQuery } from '@apollo/client';
import Popup from '../customs/Popup';

export default function AddPaidType({ id, open, setOpen }) {
  const { data, loading, error } = useQuery(GET_ORDER, {
    variables: { id },
  });

  return (
    <>
      {loading && null}
      {error && <NotSignIn />}
      {data && (
        <Popup title="Tipo de Pago" openPopup={open} setOpenPopup={setOpen}>
          <OrderFormPay order={data.obtenerPedido} id={id} setOpen={setOpen} />
        </Popup>
      )}
    </>
  );
}
