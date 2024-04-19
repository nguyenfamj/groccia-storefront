import { Heading } from '@medusajs/ui';

import ItemsPreviewTemplate from '@modules/cart/templates/preview';
import DiscountCode from '@modules/checkout/components/discount-code';
import CartTotals from '@modules/common/components/cart-totals';
import Divider from '@modules/common/components/divider';
import { retrieveCart } from '@modules/cart/actions';
import { getDictionary } from 'app/[lang]/dictionaries';

const CheckoutSummary = async ({ lang }: { lang: string }) => {
  const dictionary = await getDictionary(lang);

  const cart = await retrieveCart().then((cart) => cart);

  if (!cart) {
    return null;
  }

  return (
    <div className="sticky top-0 flex flex-col-reverse lg:flex-col gap-y-8 py-8 lg:py-0 ">
      <div className="w-full bg-white flex flex-col">
        <Divider className="my-6 lg:hidden" />
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular items-baseline"
        >
          {dictionary.checkout.orderSummary}
        </Heading>
        <Divider className="my-6" />
        <CartTotals data={cart} />
        <ItemsPreviewTemplate region={cart?.region} items={cart?.items} />
        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
