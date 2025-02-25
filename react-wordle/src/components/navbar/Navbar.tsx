import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
  UserCircleIcon,
  ShoppingBagIcon,
  XIcon,
} from '@heroicons/react/outline'
import { GAME_TITLE } from '../../constants/strings'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ProfileSidebar } from '../sidebar/ProfileSidebar'
import { useState } from 'react'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
  dailyProgress?: {
    completed: number
    total: number
    currentIndex: number
  }
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
  dailyProgress,
}: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isShopModalOpen, setIsShopModalOpen] = useState(false)
  return (
    <div className="navbar">
      <div className="navbar-content px-5">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open profile"
            >
              <UserCircleIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={() => setIsShopModalOpen(true)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open shop"
            >
              <ShoppingBagIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
          <InformationCircleIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-xl font-bold dark:text-white">{GAME_TITLE}</p>
          {dailyProgress && (
            <p className="text-sm dark:text-white">
              Progress: {dailyProgress.completed}/{dailyProgress.total} words
            </p>
          )}
          <ConnectButton />
        </div>
        <div className="right-icons">
          <ChartBarIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <CogIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
      </div>
      <hr></hr>
      <ProfileSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Shop Modal */}
      <Transition.Root show={isShopModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsShopModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-gray-900 dark:text-gray-100">
                        Worboo Shop
                      </Dialog.Title>
                      <button
                        type="button"
                        className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={() => setIsShopModalOpen(false)}
                      >
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="group relative">
                          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
                            <div className="h-full w-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                Item {i + 1}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">100 coins</p>
                            </div>
                            <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              Buy
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
