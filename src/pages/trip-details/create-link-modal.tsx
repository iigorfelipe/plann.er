import { Link2, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type CreateLinkModalProps = {
  closeCreateLinkModal: () => void;
};

export function CreateLinkModal({
  closeCreateLinkModal,
}: CreateLinkModalProps) {
  
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get('title')?.toString();
    const url = data.get('url')?.toString();

    if (!title || !url) return;

    const toastId = toast.loading("Um momento...");

    await api.post(`/trips/${tripId}/links`, {
      title,
      url
    })
      .then(() => {
        toast.update(toastId, {
          render: "Novo link criado!",
          type: "success",
          isLoading: false,
          autoClose: 1500
        });
        window.document.location.reload();
      })
      .catch((error) => {
        console.error(error);
        toast.update(toastId, {
          render: "Erro ao criar link. Tente novamente.",
          type: "error",
          isLoading: false,
          autoClose: 2500
        });
      });  
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Cadastrar link</h2>
            <button onClick={closeCreateLinkModal}>
              <X />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">

          <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="title"
              placeholder="Título do link"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <Link2 className="text-zinc-400 size-5" />
            <input
              name="url"
              placeholder="URL"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
            />
          </div>
          
          <Button size="full">
            Salvar link
          </Button>
        </form>

      </div>
    </div>
  );
};
