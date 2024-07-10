import { CheckCircle2, CircleDashed, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
// import { UpdateGuestModal } from "./update-guest-modal";

export type Participants = {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();

  const [participants, setParticipants] = useState<Participants[]>([]);
  // const [selectedParticipant, setSelectedParticipant] = useState<Participants | undefined>(undefined);
  // const [isUpdateGuestModalOpen, setIsUpdateGuestModalOpen] = useState(false);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants))
  }, [tripId]);

  // function openUpdateGuestModal() {
  //   setIsUpdateGuestModalOpen(true);
  // };

  // function closeUpdateGuestModal() {
  //   setIsUpdateGuestModalOpen(false);
  //   setSelectedParticipant(undefined);
  // };

  return (
    <div className="space-y-6">

      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {
          participants.map((participant, index) => (
            <div key={participant.id} className="flex items-center justify-between gap-4">
          
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {participant.name ?? `Convidado ${index}`}
                </span>
                <span className="block text-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>
              {/* <Pencil
                onClick={() => {
                  setSelectedParticipant(participant);
                  openUpdateGuestModal();
                }}
                className="size-5 shrink-0 ml-auto cursor-pointer"
              /> */}
              {
                participant.is_confirmed ? (
                  <CheckCircle2 className="size-5 shrink-0 text-green-400" />
                ) : (
                  <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                )
              }
            </div>
          ))
        }
      </div>

      {/* {
        selectedParticipant?.id && isUpdateGuestModalOpen && (
          <UpdateGuestModal
            participant={selectedParticipant}
            closeUpdateGuestModal={closeUpdateGuestModal}
          />
        )
      } */}
    </div>
  );
};
