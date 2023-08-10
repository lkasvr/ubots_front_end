'use client';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';

import { Client } from '../clients/api/route';
import { Requests } from './api/route';

export default function Page() {
  const [requests, setRequests] = React.useState<Requests[]>([]);
  const [clients, setClients] = React.useState<Client[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const fetchData = async (endpoint: string) => {
    try {
      const res = await fetch(`http://localhost:3000/${endpoint}/api`);
      const json = await res.json();
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchData('requests').then((res) => setRequests(res));
    fetchData('clients').then((res) => setClients(res));
  }, []);

  const [subject, setSubject] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [clientId, setClientId] = React.useState('');
  const [requestCreated, setRequestCreated] = React.useState<{
    status: string;
  } | null>(null);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    setDisabled(true);
    const data = {
      subject,
      desc,
      clientId,
    };

    try {
      const res = await fetch('http://localhost:3000/requests/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setRequestCreated(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setDisabled(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setRequestCreated(null);
  };

  const openModal = () => setIsOpen(true);

  return (
    <React.Fragment>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 md:w-[80%]"
      >
        + Nova Solicitação
      </button>

      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Criar Nova Solicitação
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6 m-3"
                  >
                    <div>
                      <label
                        htmlFor="Cliente"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Para o Cliente:
                      </label>

                      <select
                        name="Cliente"
                        id="Cliente"
                        value={clientId}
                        className="mt-1.5 w-full h-10  rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value="">Selecione ...</option>
                        {clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="Assunto"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Assunto:
                      </label>

                      <select
                        name="subject"
                        id="subject"
                        value={subject}
                        className="mt-1.5 w-full h-10  rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                        onChange={(e) => setSubject(e.target.value)}
                      >
                        <option value="">Selecione ...</option>
                        {[
                          'Problemas com Cartão',
                          'Contratação de Empréstimos',
                          'Outros Assuntos',
                        ].map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>
                    <label
                      htmlFor="desc"
                      className="relative block h-10 rounded-md border border-gray-200 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
                    >
                      <input
                        type="text"
                        id="desc"
                        value={desc}
                        className="peer border-none bg-transparent pt-2 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Descrição"
                        onChange={(e) => setDesc(e.target.value)}
                      />

                      <span className="pointer-events-none absolute text-[2px] font-light text-gray-900 start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Descrição
                      </span>
                    </label>

                    {requestCreated ? (
                      <span className="mt-1 text-center text-xs text-green-500">
                        Solicitação Criada Com Sucesso:
                        <span className="whitespace-nowrap rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-white">
                          {requestCreated.status}
                        </span>
                      </span>
                    ) : (
                      ''
                    )}

                    <div className="mt-6 text-center">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-primary/40 px-4 py-2 text-sm font-bold text-black/50 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        disabled={disabled}
                      >
                        Enviar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {requests.length > 0
        ? requests.map((request) => (
            <a
              key={request.id}
              className="relative block overflow-hidden rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8"
            >
              <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-primary to-purple-600"></span>

              <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                  <h3
                    className={`text-lg font-bold sm:text-xl ${
                      request.status === 'CONCLUIDA'
                        ? 'text-green-400'
                        : 'text-gray-900'
                    }`}
                  >
                    {request.status}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-gray-600">
                    Cliente Solicitante:{' '}
                    <span className="font-bold">{request.client.name}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-bold text-gray-900">Descrição</p>
                <p className="max-w-[40ch] text-sm text-gray-500">
                  {request.desc}
                </p>
              </div>

              <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">Criada</dt>
                  <dd className="text-xs text-gray-500">
                    {new Date(request.createdAt).toLocaleString()}
                  </dd>
                </div>

                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">
                    Atualizada
                  </dt>
                  <dd className="text-xs text-gray-500">
                    {new Date(request.updatedAt).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </a>
          ))
        : 'No data'}
    </React.Fragment>
  );
}
