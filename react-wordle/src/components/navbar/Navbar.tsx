import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
  UserCircleIcon,
  ShoppingBagIcon,
  XIcon,
} from '@heroicons/react/outline'
import {
  GAME_TITLE,
  DISCORD_URL,
  TELEGRAM_URL,
  SHOP_TITLE,
  SHOP_BUY_BUTTON,
  SHOP_EQUIP_BUTTON,
  SHOP_UNEQUIP_BUTTON,
  SHOP_EQUIPPED_LABEL,
  SHOP_TABS,
  SHOP_ITEMS,
  SHOP_FULL_WORBOO_ITEMS,
  SHOP_BODY_ITEMS,
  SHOP_HEAD_ITEMS,
  SHOP_EYE_ITEMS,
  SHOP_MOUTH_ITEMS,
  SHOP_ACCESSORY_ITEMS,
  RARITY
} from '../../constants/strings'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ProfileSidebar } from '../sidebar/ProfileSidebar'

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
  const [selectedWorboo, setSelectedWorboo] = useState<string | null>(null)
  const [equippedWorboo, setEquippedWorboo] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(SHOP_TABS.FULL_WORBOO)
  const [equippedItems, setEquippedItems] = useState({
    fullWorboo: null as string | null,
    body: null as string | null,
    head: null as string | null,
    eyes: null as string | null,
    mouth: null as string | null,
    accessory: null as string | null
  })

  // Get current items based on active tab
  const getCurrentItems = () => {
    switch (activeTab) {
      case SHOP_TABS.FULL_WORBOO:
        return SHOP_FULL_WORBOO_ITEMS
      case SHOP_TABS.BODY:
        return SHOP_BODY_ITEMS
      case SHOP_TABS.HEAD:
        return SHOP_HEAD_ITEMS
      case SHOP_TABS.EYES:
        return SHOP_EYE_ITEMS
      case SHOP_TABS.MOUTH:
        return SHOP_MOUTH_ITEMS
      case SHOP_TABS.ACCESSORIES:
        return SHOP_ACCESSORY_ITEMS
      default:
        return SHOP_FULL_WORBOO_ITEMS
    }
  }

  // Get equipped item for current tab
  const getEquippedForCurrentTab = () => {
    switch (activeTab) {
      case SHOP_TABS.FULL_WORBOO:
        return equippedItems.fullWorboo
      case SHOP_TABS.BODY:
        return equippedItems.body
      case SHOP_TABS.HEAD:
        return equippedItems.head
      case SHOP_TABS.EYES:
        return equippedItems.eyes
      case SHOP_TABS.MOUTH:
        return equippedItems.mouth
      case SHOP_TABS.ACCESSORIES:
        return equippedItems.accessory
      default:
        return null
    }
  }

  // Set equipped item for current tab
  const setEquippedForCurrentTab = (itemId: string | null) => {
    const newEquippedItems = { ...equippedItems }
    
    switch (activeTab) {
      case SHOP_TABS.FULL_WORBOO:
        newEquippedItems.fullWorboo = itemId
        break
      case SHOP_TABS.BODY:
        newEquippedItems.body = itemId
        break
      case SHOP_TABS.HEAD:
        newEquippedItems.head = itemId
        break
      case SHOP_TABS.EYES:
        newEquippedItems.eyes = itemId
        break
      case SHOP_TABS.MOUTH:
        newEquippedItems.mouth = itemId
        break
      case SHOP_TABS.ACCESSORIES:
        newEquippedItems.accessory = itemId
        break
    }
    
    setEquippedItems(newEquippedItems)
  }

  // Get rarity color class
  const getRarityColorClass = (rarity: typeof RARITY.COMMON) => {
    switch (rarity.color) {
      case 'gray':
        return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      case 'green':
        return 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-300'
      case 'blue':
        return 'bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-300'
      case 'purple':
        return 'bg-purple-200 text-purple-800 dark:bg-purple-700 dark:text-purple-300'
      case 'orange':
        return 'bg-orange-200 text-orange-800 dark:bg-orange-700 dark:text-orange-300'
      default:
        return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

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
          <a 
            href={DISCORD_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mr-3"
            aria-label="Join our Discord"
          >
            <svg 
              className="h-6 w-6 cursor-pointer text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
            </svg>
          </a>
          <a 
            href={TELEGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mr-3"
            aria-label="Join our Telegram"
          >
            <svg 
              className="h-6 w-6 cursor-pointer text-gray-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </a>
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
                        {SHOP_TITLE}
                      </Dialog.Title>
                      <button
                        type="button"
                        className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={() => setIsShopModalOpen(false)}
                      >
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    
                    {/* Shop Tabs */}
                    <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                      <nav className="-mb-px flex space-x-4 overflow-x-auto">
                        {Object.values(SHOP_TABS).map((tab) => (
                          <button
                            key={tab}
                            onClick={() => {
                              setActiveTab(tab)
                              setSelectedWorboo(null)
                            }}
                            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                              activeTab === tab
                                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </nav>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {getCurrentItems().map((item) => (
                        <div 
                          key={item.id} 
                          className={`group relative cursor-pointer ${selectedWorboo === item.id ? 'ring-4 ring-blue-500 rounded-lg' : ''}`}
                          onClick={() => setSelectedWorboo(item.id)}
                        >
                          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* Rarity Badge - Moved to top-left */}
                            <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getRarityColorClass(item.rarity)}`}>
                              {item.rarity.name}
                            </div>
                            {getEquippedForCurrentTab() === item.id && (
                              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {SHOP_EQUIPPED_LABEL}
                              </div>
                            )}
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {item.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.price} coins</p>
                            </div>
                            <button 
                              className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${
                                getEquippedForCurrentTab() === item.id 
                                  ? 'text-gray-700 bg-gray-200 dark:text-gray-300 dark:bg-gray-700' 
                                  : 'text-white bg-blue-600 hover:bg-blue-700'
                              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (getEquippedForCurrentTab() === item.id) {
                                  setEquippedForCurrentTab(null);
                                } else {
                                  setEquippedForCurrentTab(item.id);
                                  // In a real app, this would save to user profile
                                }
                              }}
                            >
                              {getEquippedForCurrentTab() === item.id ? SHOP_UNEQUIP_BUTTON : SHOP_BUY_BUTTON}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {selectedWorboo && (
                      <div className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        {(() => {
                          const item = SHOP_ITEMS.find(item => item.id === selectedWorboo);
                          if (!item) return null;
                          
                          return (
                            <>
                              <div className="flex items-center mb-2">
                                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                  {item.name}
                                </h4>
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${getRarityColorClass(item.rarity)}`}>
                                  {item.rarity.name}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                {item.description}
                              </p>
                              <div className="flex justify-end">
                                <button
                                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
                                    getEquippedForCurrentTab() === selectedWorboo
                                      ? 'text-gray-700 bg-gray-200 dark:text-gray-300 dark:bg-gray-700'
                                      : 'text-white bg-blue-600 hover:bg-blue-700'
                                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                                  onClick={() => {
                                    if (getEquippedForCurrentTab() === selectedWorboo) {
                                      setEquippedForCurrentTab(null);
                                    } else {
                                      setEquippedForCurrentTab(selectedWorboo);
                                    }
                                    // In a real app, this would save to user profile
                                  }}
                                >
                                  {getEquippedForCurrentTab() === selectedWorboo ? SHOP_UNEQUIP_BUTTON : SHOP_EQUIP_BUTTON}
                                </button>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    )}
                    
                    {/* Worboo Preview - Only show when modular parts are equipped */}
                    {(equippedItems.body || equippedItems.head || equippedItems.eyes || equippedItems.mouth || equippedItems.accessory) && !equippedItems.fullWorboo && (
                      <div className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                          Your Custom Worboo
                        </h4>
                        <div className="flex justify-center mb-4">
                          <div className="relative h-40 w-40">
                            {/* This would be a composite image in a real implementation */}
                            {/* For now we'll just show the most recently equipped part */}
                            {equippedItems.body && (
                              <img 
                                src={SHOP_BODY_ITEMS.find(item => item.id === equippedItems.body)?.image} 
                                alt="Body" 
                                className="absolute inset-0 h-full w-full object-contain"
                              />
                            )}
                            {equippedItems.head && (
                              <img 
                                src={SHOP_HEAD_ITEMS.find(item => item.id === equippedItems.head)?.image} 
                                alt="Head" 
                                className="absolute inset-0 h-full w-full object-contain"
                              />
                            )}
                            {equippedItems.eyes && (
                              <img 
                                src={SHOP_EYE_ITEMS.find(item => item.id === equippedItems.eyes)?.image} 
                                alt="Eyes" 
                                className="absolute inset-0 h-full w-full object-contain"
                              />
                            )}
                            {equippedItems.mouth && (
                              <img 
                                src={SHOP_MOUTH_ITEMS.find(item => item.id === equippedItems.mouth)?.image} 
                                alt="Mouth" 
                                className="absolute inset-0 h-full w-full object-contain"
                              />
                            )}
                            {equippedItems.accessory && (
                              <img 
                                src={SHOP_ACCESSORY_ITEMS.find(item => item.id === equippedItems.accessory)?.image} 
                                alt="Accessory" 
                                className="absolute inset-0 h-full w-full object-contain"
                              />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                          Mix and match parts to create your unique Worboo!
                        </p>
                      </div>
                    )}
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
