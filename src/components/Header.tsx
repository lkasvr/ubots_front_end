'use client';
import { Popover, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  BsFillPersonFill,
  BsFillPersonVcardFill,
  BsPass,
  BsMicrosoftTeams,
} from 'react-icons/bs';

const solutions = [
  {
    name: 'Assistentes',
    href: '/assistants',
    icon: <BsFillPersonVcardFill className="h-8 w-8" />,
  },
  {
    name: 'Clientes',
    href: '/clients',
    icon: <BsFillPersonFill className="h-8 w-8" />,
  },
  {
    name: 'Solicitações',
    href: '/requests',
    icon: <BsPass className="h-8 w-8" />,
  },
  {
    name: 'Times',
    href: '/teams',
    icon: <BsMicrosoftTeams className="h-8 w-8" />,
  },
];

const Header = () => {
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link className="block text-teal-600" href="/requests">
          <span className="sr-only">Home</span>
          <Image
            src="/logo-ubots.png"
            width={600}
            height={200}
            alt="Ubots Logo"
            className="max-w-[180px] max-h-[58px]"
            priority
          />
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/requests"
                >
                  Solicitações
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/clients"
                >
                  Clientes
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/teams"
                >
                  Times
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/assistants"
                >
                  Assistentes
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-primary px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      <span>Menu</span>
                    </Popover.Button>
                    <Transition
                      as={React.Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute left-[-142%] z-10 mt-5 w-screen max-w-[250px] -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 bg-white p-4 lg:grid-cols-2">
                            {solutions.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="-m-3 flex items-center gap-4 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                              >
                                {item.icon}
                                <p className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
