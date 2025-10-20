import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Database, Mail, Calendar } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy | vincxxdev',
  description: 'Informativa sulla privacy e trattamento dei dati personali del portfolio di Vincenzo Buttari',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-primary-background py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/#contacts"
          className="inline-flex items-center gap-2 text-secondary-text hover:text-accent transition-colors duration-300 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          Torna ai Contatti
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-4 bg-accent/10 rounded-full mb-4">
            <Shield className="w-12 h-12 text-accent" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-text mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-secondary-text">
            Informativa sul trattamento dei dati personali
          </p>
          <p className="text-sm text-secondary-text mt-2">
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-secondary-text/20 p-8 mb-8 shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary-text mb-2">1. Titolare del Trattamento</h2>
                <p className="text-secondary-text">
                  Il titolare del trattamento dei dati personali raccolti attraverso questo sito è:
                </p>
                <div className="mt-4 p-4 bg-primary-background/50 rounded-lg">
                  <p className="text-primary-text font-semibold">{siteConfig.author}</p>
                  <p className="text-secondary-text">Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-accent hover:underline">{siteConfig.contact.email}</a></p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-secondary-text/20 p-8 mb-8 shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Database className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary-text mb-2">2. Dati Raccolti</h2>
                <p className="text-secondary-text mb-4">
                  Attraverso il form di contatto, raccogliamo i seguenti dati personali:
                </p>
                <ul className="list-disc list-inside space-y-2 text-secondary-text">
                  <li><strong className="text-primary-text">Nome completo</strong> - per identificare il mittente</li>
                  <li><strong className="text-primary-text">Indirizzo email</strong> - per rispondere alla richiesta</li>
                  <li><strong className="text-primary-text">Oggetto</strong> - per comprendere la natura della richiesta</li>
                  <li><strong className="text-primary-text">Messaggio</strong> - contenuto della comunicazione</li>
                </ul>
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-secondary-text">
                    ℹ️ Non raccogliamo dati di navigazione tramite cookie di profilazione o tracciamento di terze parti.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-secondary-text/20 p-8 mb-8 shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Lock className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary-text mb-2">3. Finalità del Trattamento</h2>
                <p className="text-secondary-text mb-4">
                  I dati personali sono raccolti e trattati per le seguenti finalità:
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-background/50 rounded-lg">
                    <h3 className="text-lg font-semibold text-primary-text mb-2">📧 Risposta alle richieste</h3>
                    <p className="text-secondary-text text-sm">
                      Per fornire risposte alle domande o richieste inviate tramite il form di contatto.
                    </p>
                    <p className="text-xs text-secondary-text/70 mt-2">
                      Base giuridica: consenso dell&apos;interessato (Art. 6, par. 1, lett. a) GDPR)
                    </p>
                  </div>
                  <div className="p-4 bg-primary-background/50 rounded-lg">
                    <h3 className="text-lg font-semibold text-primary-text mb-2">💼 Opportunità professionali</h3>
                    <p className="text-secondary-text text-sm">
                      Per valutare eventuali proposte di collaborazione o offerte di lavoro.
                    </p>
                    <p className="text-xs text-secondary-text/70 mt-2">
                      Base giuridica: consenso dell&apos;interessato (Art. 6, par. 1, lett. a) GDPR)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-secondary-text/20 p-8 mb-8 shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary-text mb-2">4. Conservazione dei Dati</h2>
                <p className="text-secondary-text mb-4">
                  I dati personali saranno conservati per il tempo strettamente necessario a:
                </p>
                <ul className="list-disc list-inside space-y-2 text-secondary-text">
                  <li>Gestire la richiesta ricevuta</li>
                  <li>Mantenere uno storico delle comunicazioni (massimo 24 mesi)</li>
                </ul>
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm text-secondary-text">
                    ✓ Dopo tale periodo, i dati saranno cancellati o resi anonimi in modo irreversibile.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-secondary-text/20 p-8 mb-8 shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary-text mb-2">5. Comunicazione dei Dati</h2>
                <p className="text-secondary-text mb-4">
                  I dati personali NON saranno:
                </p>
                <ul className="list-disc list-inside space-y-2 text-secondary-text">
                  <li>Comunicati a terze parti</li>
                  <li>Trasferiti al di fuori dell&apos;Unione Europea</li>
                  <li>Utilizzati per finalità di marketing</li>
                  <li>Ceduti o venduti</li>
                </ul>
                <div className="mt-4 p-4 bg-primary-background/50 rounded-lg">
                  <p className="text-sm text-secondary-text">
                    Le email ricevute tramite il form di contatto sono gestite attraverso servizi di posta elettronica standard e non vengono elaborate da sistemi automatizzati di terze parti.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-secondary-text/20 p-8 mb-8 shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary-text mb-2">6. Diritti dell&apos;Interessato</h2>
                <p className="text-secondary-text mb-4">
                  In qualità di interessato, hai i seguenti diritti ai sensi del GDPR:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary-background/50 rounded-lg">
                    <h3 className="font-semibold text-primary-text mb-1">🔍 Diritto di accesso</h3>
                    <p className="text-sm text-secondary-text">Ottenere conferma dell&apos;esistenza dei tuoi dati</p>
                  </div>
                  <div className="p-4 bg-primary-background/50 rounded-lg">
                    <h3 className="font-semibold text-primary-text mb-1">✏️ Diritto di rettifica</h3>
                    <p className="text-sm text-secondary-text">Correggere dati inesatti o incompleti</p>
                  </div>
                  <div className="p-4 bg-primary-background/50 rounded-lg">
                    <h3 className="font-semibold text-primary-text mb-1">🗑️ Diritto alla cancellazione</h3>
                    <p className="text-sm text-secondary-text">Richiedere la cancellazione dei dati (diritto all&apos;oblio)</p>
                  </div>
                  <div className="p-4 bg-primary-background/50 rounded-lg">
                    <h3 className="font-semibold text-primary-text mb-1">🚫 Diritto di opposizione</h3>
                    <p className="text-sm text-secondary-text">Opporti al trattamento dei tuoi dati</p>
                  </div>
                  <div className="p-4 bg-primary-background/50 rounded-lg">
                    <h3 className="font-semibold text-primary-text mb-1">⏸️ Diritto di limitazione</h3>
                    <p className="text-sm text-secondary-text">Limitare il trattamento dei dati</p>
                  </div>
                  <div className="p-4 bg-primary-background/50 rounded-lg">
                    <h3 className="font-semibold text-primary-text mb-1">📦 Diritto alla portabilità</h3>
                    <p className="text-sm text-secondary-text">Ricevere i dati in formato strutturato</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                  <p className="text-sm text-secondary-text">
                    Per esercitare questi diritti, invia una richiesta a: <a href={`mailto:${siteConfig.contact.email}`} className="text-accent hover:underline font-semibold">{siteConfig.contact.email}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-secondary-text/20 p-8 mb-8 shadow-xl">
            <h2 className="text-2xl font-bold text-primary-text mb-4">7. Sicurezza dei Dati</h2>
            <p className="text-secondary-text mb-4">
              Adottiamo misure di sicurezza tecniche e organizzative adeguate per proteggere i dati personali da accessi non autorizzati, perdita, distruzione o alterazione, tra cui:
            </p>
            <ul className="list-disc list-inside space-y-2 text-secondary-text">
              <li>Connessione HTTPS crittografata</li>
              <li>Accesso limitato ai dati personali</li>
              <li>Sistemi di backup regolari</li>
              <li>Monitoraggio costante delle misure di sicurezza</li>
            </ul>
          </div>

          <div className="bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-secondary-text/20 p-8 mb-8 shadow-xl">
            <h2 className="text-2xl font-bold text-primary-text mb-4">8. Cookie Policy</h2>
            <p className="text-secondary-text mb-4">
              Questo sito utilizza esclusivamente cookie tecnici necessari per il funzionamento del sito, tra cui:
            </p>
            <ul className="list-disc list-inside space-y-2 text-secondary-text">
              <li><strong className="text-primary-text">Cookie di preferenze tema</strong> - per salvare la scelta tra tema chiaro/scuro</li>
              <li><strong className="text-primary-text">Cookie di preferenze audio</strong> - per salvare la preferenza sugli effetti sonori</li>
            </ul>
            <div className="mt-4 p-4 bg-primary-background/50 rounded-lg">
              <p className="text-sm text-secondary-text">
                Questi cookie sono memorizzati solo nel tuo browser (localStorage) e non vengono trasmessi a server esterni. Non vengono utilizzati cookie di profilazione o tracciamento.
              </p>
            </div>
          </div>

          <div className="bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-secondary-text/20 p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-primary-text mb-4">9. Modifiche alla Privacy Policy</h2>
            <p className="text-secondary-text mb-4">
              Questa informativa sulla privacy può essere aggiornata periodicamente. Ti invitiamo a consultarla regolarmente per essere informato su come proteggiamo i tuoi dati.
            </p>
            <p className="text-secondary-text">
              In caso di modifiche sostanziali, pubblicheremo un avviso sul sito e aggiorneremo la data in cima a questa pagina.
            </p>
          </div>

          <div className="mt-12 p-6 bg-accent/10 border border-accent/30 rounded-lg text-center">
            <p className="text-secondary-text mb-4">
              Hai domande sulla nostra Privacy Policy?
            </p>
            <Link 
              href="/#contacts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-text rounded-lg hover:bg-accent-hover transition-colors duration-300 font-semibold"
            >
              <Mail className="w-5 h-5" />
              Contattaci
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
