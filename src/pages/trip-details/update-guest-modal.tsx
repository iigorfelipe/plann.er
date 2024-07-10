// import { AtSign, User, X } from "lucide-react";
// import { Button } from "../../components/button";
// import { FormEvent } from "react";
// import { api } from "../../lib/axios";
// import { toast } from "react-toastify";
// import { Participants } from "./guests";

// type UpdateGuestModalProps = {
//   closeUpdateGuestModal: () => void;
//   participant: Participants;
// };

// export function UpdateGuestModal({
//   participant,
//   closeUpdateGuestModal,
// }: UpdateGuestModalProps) {
  
//   async function createActivity(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const data = new FormData(event.currentTarget);

//     const title = data.get('title')?.toString();
//     const email = data.get('email')?.toString();

//     if (!email) return;

//     const toastId = toast.loading("Loading...");

//     await api.patch(``, {
//       title,
//       email
//     })
//       .then(() => {
//         toast.update(toastId, {
//           render: "Convidado atualizado!",
//           type: "success",
//           isLoading: false,
//           autoClose: 1500
//         });
//         window.document.location.reload();
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.update(toastId, {
//           render: "Erro ao atualizar convidado. Tente novamente.",
//           type: "error",
//           isLoading: false,
//           autoClose: 2500
//         });
//       });  
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
//       <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

//         <div className="space-y-2">
//           <div className="flex items-center justify-between">
//             <h2>Editar convidado</h2>
//             <button onClick={closeUpdateGuestModal}>
//               <X />
//             </button>
//           </div>
//           <p className="text-sm text-zinc-400">
//             {participant?.name || 'O convidado'} receberá um e-mail sobre essa mudança.
//           </p>
//         </div>

//         <form onSubmit={createActivity} className="space-y-3">

//           <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
//             <User className="text-zinc-400 size-5" />
//             <input
//               name="title"
//               placeholder="Nome do convidado"
//               className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
//               defaultValue={participant?.name || ''}
//             />
//           </div>

//           <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
//             <AtSign className="text-zinc-400 size-5" />
//             <input
//               type="email"
//               name="email"
//               placeholder="Atualizar o e-mail do convidado"
//               className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
//               defaultValue={participant?.email || ''}
//             />
//           </div>
          
//           <Button size="full">
//             Confirmar
//           </Button>
//         </form>

//       </div>
//     </div>
//   );
// };
export {} // TODO: implementação futura