import { Plus, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type ConfirmTripModal = {
  destination: string;
  eventStartAndEndDates: DateRange | undefined;
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
};

export function ConfirmTripModal({
  destination,
  eventStartAndEndDates,
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail
}: ConfirmTripModal) {

  const displayedDate = (
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
  ) ? format(eventStartAndEndDates.from, "d' de 'LLLL", { locale: ptBR })
      .concat(' a ')
      .concat(format(eventStartAndEndDates.to, "d' de 'LLLL", { locale: ptBR }))
    : null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Confirmar criação da viagem</h2>
            <button onClick={closeConfirmTripModal}>
              <X />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para
            <span className="font-semibold text-zinc-100 p-1">
              {destination}
            </span>
            nas datas de
            <span className="font-semibold text-zinc-100 p-1">
              {displayedDate}
            </span>
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          
          <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              name="name"
              placeholder="Seu e-mail pessoal"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
              onChange={(e) => setOwnerEmail(e.target.value)}
            />
          </div>
          
          <Button type="submit" size="full">
            Confirmar criação da viagem
            <Plus className="size-5" />
          </Button>
        </form>

      </div>
    </div>
  );
};
