'use client';

import { Popover, Transition } from '@headlessui/react';
import { Cart } from '@medusajs/medusa';
import { Button } from '@medusajs/ui';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';

import LocalizedClientLink from '@modules/common/components/localized-client-link';
import Thumbnail from '@modules/products/components/thumbnail';
import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';
import { ThumbnailSize } from 'types/medusa';

const CartDropdown = ({
  cart: cartState,
  dict,
}: {
  cart?: Omit<Cart, 'beforeInsert' | 'afterLoad'> | null;
  dict: any;
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  );
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);

  const open = () => setCartDropdownOpen(true);
  const close = () => setCartDropdownOpen(false);

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0) || 0;

  const itemRef = useRef<number>(totalItems || 0);

  const timedOpen = () => {
    open();

    const timer = setTimeout(close, 5000);

    setActiveTimer(timer);
  };

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer);
    }

    open();
  };

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer);
      }
    };
  }, [activeTimer]);

  const pathname = usePathname();

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes('/cart')) {
      timedOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current]);

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <Popover.Button className="h-full flex">
          <LocalizedClientLink className="hover:text-ui-fg-base" href="/cart">
            <div className="flex items-center">
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              {`(${totalItems})`}
            </div>
          </LocalizedClientLink>
        </Popover.Button>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="block absolute top-[calc(100%+1px)] bg-white right-0 w-[420px] rounded-xl font-poppins shadow-xl"
          >
            <div className="p-4 flex items-center justify-center">
              <h3 className="text-lg font-bold text-primary">
                {dict?.layout.nav.cart.title}
              </h3>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-4 no-scrollbar p-px pb-2">
                  {cartState.items
                    .sort((a, b) => {
                      return a.created_at > b.created_at ? -1 : 1;
                    })
                    .map((item) => (
                      <LocalizedClientLink
                        key={item.id}
                        href={`/products/${item.variant.product.handle}`}
                      >
                        <div className="grid grid-cols-[72px_1fr] rounded-md">
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            size={ThumbnailSize.SQUARE}
                          />
                          <div className="flex flex-row whitespace-nowrap items-center text-md mx-2 justify-between text-primary hover:text-primary">
                            <div className="max-w-[240px] overflow-hidden text-ellipsis">
                              {item.title}
                            </div>
                            <div className="max-w-[45px] overflow-hidden text-ellipsis">
                              x{item.quantity}
                            </div>
                          </div>
                        </div>
                      </LocalizedClientLink>
                    ))}
                </div>
                <div className="p-4 flex flex-col gap-y-4 text-small-regular">
                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      className="w-full bg-primary hover:bg-primary"
                      size="large"
                    >
                      {dict?.layout.nav.cart.goToCart}
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                  <div className="bg-primary text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                    <span>0</span>
                  </div>
                  <span className="text-primary">
                    {dict?.layout.nav.cart.cartEmpty}
                  </span>
                  <div>
                    <LocalizedClientLink href="/">
                      <>
                        <span className="sr-only text-primary">
                          {dict?.layout.nav.cart.goToProductPage}
                        </span>
                        <Button
                          onClick={close}
                          className="bg-primary hover:bg-primary"
                        >
                          {dict?.layout.nav.cart.exploreMore}
                        </Button>
                      </>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default CartDropdown;
