import { RadioGroup } from '@headlessui/react';
import { PaymentSession } from '@medusajs/medusa';
import { Text, clx } from '@medusajs/ui';
import React from 'react';

import Radio from '@modules/common/components/radio';

type PaymentContainerProps = {
  paymentSession: PaymentSession;
  selectedPaymentOptionId: string | null;
  disabled?: boolean;
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>;
};

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
}) => {
  return (
    <>
      <RadioGroup.Option
        key={paymentSession.id}
        value={paymentSession.provider_id}
        disabled={disabled}
        className={clx(
          'flex flex-col gap-y-2 text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active',
          {
            'border-ui-border-interactive':
              selectedPaymentOptionId === paymentSession.provider_id,
          }
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <Radio
              checked={selectedPaymentOptionId === paymentSession.provider_id}
            />
            <Text className="text-base-regular">
              {paymentInfoMap[paymentSession.provider_id]?.title ||
                paymentSession.provider_id}
            </Text>
          </div>
          <span className="justify-self-end text-ui-fg-base">
            {paymentInfoMap[paymentSession.provider_id]?.icon}
          </span>
        </div>
      </RadioGroup.Option>
    </>
  );
};

export default PaymentContainer;
