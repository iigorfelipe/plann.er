import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsSteps } from "./steps/invite-guests-steps";

const EMAILS = [
  'jessica.white44@yahoo.com',
  'erik_leffler3@gmail.com',
  'rebekah.conn21@gmail.com',
  'emile.mayer25@yahoo.com',
  'justus_hessel81@hotmail.com',
  'hellen_graham@yahoo.com',
  'kole.schiller27@yahoo.com'
];

function CreateTripPage() {
  const navigete = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState(EMAILS);

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

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigete('/trips/123')
  }

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
          />
        )
      }

    </div>
  );
};

export default CreateTripPage;
