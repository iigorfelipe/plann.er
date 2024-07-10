import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsSteps } from "./steps/invite-guests-steps";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";

function CreateTripPage() {
  const navigete = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [destination, setDestination] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  };

  function closeGUestsInput() {
    setIsGuestsInputOpen(false);
  };

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  };

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  };

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  };

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  };

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!destination) return;
    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) return;
    if (emailsToInvite.length === 0) return;
    if (!ownerName || !ownerEmail) return;

    const toastId = toast.loading("Um momento...")

    await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })
      .then((response) => {
        toast.update(toastId, {
          render: "Viagem criada!",
          type: "success",
          isLoading: false,
          autoClose: 1500
        });

        const { tripId } = response.data;
        navigete(`/trips/${tripId}`);
      })
      .catch((error) => {
        console.error(error);
        toast.update(toastId, {
          render: "Erro ao criar viagem. Tente novamente.",
          type: "error",
          isLoading: false,
          autoClose: 2500
        });
      });
  };

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();

    if (!email) return null;

    if (emailsToInvite.includes(email)) return;

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ]);

    event.currentTarget.reset();
  };

  function removeEmailFromInvite(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter((email) => email !== emailToRemove);

    setEmailsToInvite(newEmailList);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">

      <div className="max-w-3xl w-full px-6 text-center space-y-10">

        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

          <div className="space-y-4">

            <DestinationAndDateStep
              closeGUestsInput={closeGUestsInput}
              isGuestsInputOpen={isGuestsInputOpen}
              openGuestsInput={openGuestsInput}
              setDestination={setDestination}
              eventStartAndEndDates={eventStartAndEndDates}
              setEventStartAndEndDates={setEventStartAndEndDates}
            />

            {
              isGuestsInputOpen && (
                <InviteGuestsSteps
                  emailsToInvite={emailsToInvite}
                  openConfirmTripModal={openConfirmTripModal}
                  openGuestsModal={openGuestsModal}
                />
              )
            }
          </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          com nossos termos de uso e políticas de privacidade.
        </p>
      </div>

      {
        isGuestsModalOpen && (
          <InviteGuestsModal
            addNewEmailToInvite={addNewEmailToInvite}
            closeGuestsModal={closeGuestsModal}
            emailsToInvite={emailsToInvite}
            removeEmailFromInvite={removeEmailFromInvite}
          />
        )
      }

      {
        isConfirmTripModalOpen && (
          <ConfirmTripModal
            closeConfirmTripModal={closeConfirmTripModal}
            createTrip={createTrip}
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}
          />
        )
      }

    </div>
  );
};

export default CreateTripPage;
