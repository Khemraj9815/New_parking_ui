import Image from "next/image";
import { ComboboxDemo } from '@/components/ui/combobox';
import { DatePickerDemo } from '@/components/ui/datepicker';
import { Combobox_Area } from '@/components/ui/combobox_Area';
import { Card, CardContent } from "@/components/ui/card";
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
        
      {/* now here comes a cards it will be for slots          */}

        <div className="py-14 w-24 ms-14">
          <Card>
            <CardContent>
              <div className="">
                <h1 className="text-center ">1</h1>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
