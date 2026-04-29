import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'


const navigation = [
  { name: 'Dashboard', href: '/', current: false },
  { name: 'Download', href: '/download', current: false },
  { name: 'Dokumentation', href: '/docs', current: true },
]

const programmingLanguages = [

  {
    name: "TypeScript (React)",
    category: "Frontend",
    description:
      "TypeScript wird für die Entwicklung der Benutzeroberfläche mit React verwendet, um eine typsichere und wartbare Codebasis zu gewährleisten.",
    usage: [ 
      "Entwicklung von React-Komponenten",
      "State Management",
      "Interaktion mit Backend-APIs",
    ],
  },
  { name: "HTML/CSS", 
    category: "Frontend", 
    description: "HTML und CSS werden für die Strukturierung und das Styling der Benutzeroberfläche verwendet.", 
    usage: [
      "Layout und Design", 
      "Webentwicklung"
    ], 
  },
  {
    name: "Python",
    category: "Backend",
    description:
      "Python wird für die Backend-Logik verwendet, um Daten zu verarbeiten, API-Endpunkte bereitzustellen und die Datenbank zu verwalten.",
    usage: [
      "Serverlogik und Datenverarbeitung",
      "API-Entwicklung mit FastAPI",
      "Datenbankinteraktion mit DuckDB",
    ],
  },
    {
    name: "SQL",
    category: "Datenbank",
    description:
      "SQL wird für die Abfrage und Verwaltung der Daten in der DuckDB-Datenbank verwendet.",
    usage: [
      "Datenanalyse und -aggregation",
      "Abfrage von Messdaten",
      "Erstellung von Datenbankstrukturen",
    ],
  },
];

const technologies = [
    {
      name: "React",
      category: "Frontend",
      description:
        "React wird für die Benutzeroberfläche verwendet. Komponentenbasierter Aufbau sorgt für wartbaren und wiederverwendbaren Code.",
      usage: [
        "Routing zwischen Seiten",
        "Dynamische UI-Komponenten",
        "Aktualisierung der Anzeige basierend auf Benutzereingaben und Datenänderungen",
      ],
    },
    {
      name: "Recharts",
      category: "Frontend",
      description:
        "TypeScript-Bibliothek für die Erstellung von interaktiven Diagrammen und Grafiken im Dashboard.",
      usage: [
        "Darstellung von Zeitreihen-Diagrammen für Sensorwerte",
        "Interaktive Visualisierungen",
        "Anpassbare Charts",
      ],
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      description:
        "Tailwind CSS wird für modernes, schnelles und responsives Styling eingesetzt.",
      usage: [
        "Responsive Layouts",
        "Vorlagen UI-Komponenten",
        "Spacing / Typography",
      ],
    },
    {
      name: "FastAPI",
      category: "Backend",
      description:
        "FastAPI ist eine Python Bibliothek und stellt API-Endpunkte bereit, wodurch Client Anfragen verarbeitet werden können.",
      usage: [
        "Schnittstelle zwischen Frontend, Datenbank und Wetterstation",
        "API-Endpunkte",
        "Fungiert als Server",
      ],
    },
    {
      name: "Pandas",
      category: "Backend",
      description:
        "Pandas ist eine Python Bibliothek und wird genutzt, um Messdaten als Excel-Datei zu exportieren.",
      usage: [
        "CSV / Excel Verarbeitung",
        "Exprort von Messdaten",
      ],
    },
    {
      name: "DuckDB",
      category: "Backend",
      description:
        "DuckDB ist eine spaltenorientierte Datenbank, die für die Speicherung und Abfrage der Messdaten verwendet wird.",
      usage: [
        "Speicherung der Sensordaten",
        "Schnelle lokale Datenbank",
      ],
    },
    {
      name: "Docker",
      category: "Bereitstellung",
      description:
        "Docker wird verwendet, um die Anwendung in Containern bereitzustellen, was die Portabilität und Skalierbarkeit verbessert.",
      usage: [
        "Containerisierung der Anwendung",
        "Einfaches Deployment auf verschiedenen Geräten",
        "Docker Volumes für persistente Datenhaltung",
      ],
    },
  ];

  const hardware = [
    {
      name: "Raspberry Pi 5",
      category: "Server",
      description:
        "Der Raspberry Pi 5 dient als zentrale Steuereinheit der Wetterstation, auf dem die Sensoren angeschlossen und die Software ausgeführt wird.",
      usage: [
        "Server für die Wetterstation",
        "Speicherung der Daten",
        "Ausführung der Docker Container",
      ],
    },
    {
      name: "ESP-32",
      category: "Mikrocontroller",
      description:
        "Der ESP-32 ist ein Mikrocontroller, der für die Erfassung von Sensordaten und die Kommunikation mit dem Raspberry Pi verwendet wird.",
      usage: [
        "Erfassung von Sensordaten",
        "Kommunikation mit Raspberry Pi",
        "Drahtlose Datenübertragung",
      ],
    },
  ];


function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ')
}

export default function Docs() {
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    alt="Wetterstation"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="size-8"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current
                            ? 'bg-gray-950/50 text-white'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            
          </DisclosurePanel>
        </Disclosure>

        {/* <header className="relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          </div>
        </header> */}
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-10">
                  <h1 className="text-3xl font-bold text-white">Programmiersprachen</h1>
                  <p className="mt-2 text-gray-400">
                    Übersicht der eingesetzten Programmiersprachen im Projekt.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {programmingLanguages.map((tech) => (
                    <div
                      key={tech.name}
                      className="rounded-2xl border border-white/10 bg-gray-800/50 p-6 shadow-lg"
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">
                          {tech.name}
                        </h2>
                        <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300">
                          {tech.category}
                        </span>
                      </div>

                      <p className="mt-4 text-sm text-gray-400">
                        {tech.description}
                      </p>

                      <div className="mt-5">
                        <h3 className="text-sm font-semibold text-gray-200">
                          Verwendung im Projekt
                        </h3>

                        <ul className="mt-2 space-y-2 text-sm text-gray-400">
                          {tech.usage.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="text-indigo-400">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-10">
                  <h1 className="text-3xl font-bold text-white">Technologien & Bibiotheken im Detail</h1>
                  <p className="mt-2 text-gray-400">
                    Übersicht der eingesetzten Technologien im Projekt.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="rounded-2xl border border-white/10 bg-gray-800/50 p-6 shadow-lg"
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">
                          {tech.name}
                        </h2>
                        <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300">
                          {tech.category}
                        </span>
                      </div>

                      <p className="mt-4 text-sm text-gray-400">
                        {tech.description}
                      </p>

                      <div className="mt-5">
                        <h3 className="text-sm font-semibold text-gray-200">
                          Verwendung im Projekt
                        </h3>

                        <ul className="mt-2 space-y-2 text-sm text-gray-400">
                          {tech.usage.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="text-indigo-400">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-10">
                  <h1 className="text-3xl font-bold text-white">Hardware</h1>
                  <p className="mt-2 text-gray-400">
                    Übersicht der eingesetzten Hardware im Projekt.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {hardware.map((tech) => (
                    <div
                      key={tech.name}
                      className="rounded-2xl border border-white/10 bg-gray-800/50 p-6 shadow-lg"
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">
                          {tech.name}
                        </h2>
                        <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300">
                          {tech.category}
                        </span>
                      </div>

                      <p className="mt-4 text-sm text-gray-400">
                        {tech.description}
                      </p>

                      <div className="mt-5">
                        <h3 className="text-sm font-semibold text-gray-200">
                          Verwendung im Projekt
                        </h3>

                        <ul className="mt-2 space-y-2 text-sm text-gray-400">
                          {tech.usage.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="text-indigo-400">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            
            </div>
        </main>
      </div>
    </>
  )
}
