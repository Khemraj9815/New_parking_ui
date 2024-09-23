import Image from "next/image";
import { ComboboxDemo } from '@/components/ui/combobox';
import { DatePickerDemo } from '@/components/ui/datepicker';
import { Combobox_Area } from '@/components/ui/combobox_Area';
import { Card, CardHeader } from "@/components/ui/card";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="relative">
        <header className="flex flex-row space-x-4 px-8">
          {/* Your Comboboxes */}
          <ComboboxDemo />
          <Combobox_Area />
          <DatePickerDemo />
        </header>
        
        {/* Green Shape and Car */}
        <div className="relative">
          {/* Green Background */}
          <div className="green-shape absolute top-0 right-0 w-[400px] h-[300px]"></div>

          {/* Car Image */}

          <div className="car-container absolute top-0 right-0">
            <img src='/car.png' alt="Car" width={300} height={200} />
          </div>
        </div>
        <div>
          <Card />
        </div>
      </main>
    </div>
  );
}
