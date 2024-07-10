import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { CreateLinkModal } from "./create-link-modal";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";

type Link = {
  id: string;
  title: string;
  url: string;
  trip_id: string;
};

export function ImportantLinks() {
  const { tripId } = useParams();

  const [links, setLinks] = useState<Link[]>([]);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true);
  };

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false);
  };

  function copyToClipboard(url: string) {
    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success('Link copiado!', { autoClose: 1500 });
      })
      .catch(() => {
        toast.error('Erro ao copiar o link', { autoClose: 2000 });
      });
  };

  useEffect(() => {
    api
      .get(`trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links))
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {
          links?.map((link) => (
            <div key={link.id} className="flex items-center justify-between gap-4">
              
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a href={link.url} target="_blank" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                  {link.url}
                </a>
              </div>

              <Link2
                className="text-zinc-400 size-5 shrink-0 cursor-pointer"
                onClick={() => copyToClipboard(link.url)} 
              />
            </div>
          ))
        }
      </div>

      <Button onClick={openCreateLinkModal} variant="secondary">
        Cadastrar novo link
        <Plus className="size-5" />
      </Button>

      {
        isCreateLinkModalOpen && (
          <CreateLinkModal
            closeCreateLinkModal={closeCreateLinkModal}
          />
        )
      }
    </div>
  );
};
