import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput, FormTextarea } from "../form";

interface Props {
  className?: string;
}

export const CheckoutDeliveryAddress: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Delivery address" className={className}>
      <div className="flex flex-col gap-3">
        <FormInput
          name="address"
          className="text-base"
          placeholder="Enter your delivery address"
        />
        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Additional delivery instructions (optional)"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
