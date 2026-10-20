# DESIGN.md — ArtificiiDeli.ro

## Design Read & Liveliness Dials

Reading this as: **Prezentare de servicii pirotehnice și efecte speciale pentru evenimente** pentru **organizatori de nunți, petreceri gender reveal, evenimente private și corporate din România**, în stil **editorial nocturn / electric night**, dial **ENERGY 3 / RHYTHM 3 / MOTION 2**.

- **Dial: ENERGY 3 / RHYTHM 3 / MOTION 2**
- **Concept central de direcție artistică**: „Electric nights. Unforgettable celebrations.” (direcție vizuală internă; textul public este redactat natural în limba română, fără clișee traduse mecanic).

---

## 1. Identitate și Personalitate

- **Cinematic**: Compoziții dramatice pe fundal de noapte profundă, scară tipografică amplă și punere în valoare a luminii reale din spectacolele pirotehnice.
- **Vibrant**: Albastru electric, alb cristalin și cyan luminos domină structura, completate punctual de magenta și cyan în secțiunea Gender Reveal și de accente rare de roșu în exploziile din Canvas.
- **Profesionist**: Informații tehnice clare despre siguranță, autorizare și desfășurare, navigație directă și opțiuni imediate de contact (telefon, WhatsApp, cerere de ofertă).

### Motivul de Identitate (Identity Motif)
- **Linia de Traiectorie Ascendentă (Launch Trajectory Line)**: un reper fin vertical/diagonal cu punct incandescent la vârf, inspirat de ascensiunea unei comete pirotehnice înainte de deschidere. Ancorează indicii de secțiune (`01`, `02`, `03`, `04`) și leagă compoziția Hero de restul paginii.

---

## 2. Paleta de Culori și Ierarhia Contrastului (Verificată WCAG AA/AAA)

Tema este fixată pe fundal întunecat nocturn (`#071426`) deoarece produsul fizic (artificii pe cerul nopții, scântei reci, fum iluminat) cere fundal închis pentru a-și păstra contrastul și luminozitatea reală (R-21).

| Token | Valoare Hex | Rol | Raport Contrast |
| :--- | :--- | :--- | :--- |
| `--bg-midnight` | `#071426` | Fundal de bază (cer nocturn profund) | — |
| `--bg-navy` | `#0C1E36` | Panouri editoriale, suprafețe secundare | — |
| `--bg-navy-elevated` | `#122A4A` | Suprafețe interactive ridicate, contururi structurale | — |
| `--text-primary` | `#F5FAFF` | Titluri, text principal, valori importante | `17.59:1` pe `#071426` (AAA) |
| `--text-secondary` | `#A8C0DC` | Paragrafe descriptive, note tehnice | `9.88:1` pe `#071426` (AAA) |
| `--text-muted` | `#7E9AB8` | Etichete de index, metadate secundare | `5.78:1` pe `#071426` (AA) |
| `--accent-cyan` | `#39D9FF` | CTA principal (cu text `#071426`), focus ring, evidențiere | `11.03:1` cu `#071426` (AAA) |
| `--accent-blue` | `#087CFF` | Linii de traiectorie, grafică, particule principale | `3.75:1` cu `#F5FAFF` (UI/Large) |
| `--accent-blue-ink` | `#0562D0` | Suprafețe albastre cu text alb `#F5FAFF` | `5.46:1` cu `#F5FAFF` (AA) |
| `--accent-magenta` | `#EC42D7` | Accent dedicat Gender Reveal și particule pirotehnice | `5.56:1` pe `#071426` (AA) |
| `--accent-red` | `#FF405B` | Particule rare în explozii și stări de eroare | `5.52:1` pe `#071426` (AA) |

---

## 3. Tipografie (R-06)

- **Titluri (`--font-display`)**: `'Syne'`, sans-serif (greutăți 700, 800) — caracter arhitectural și teatral, ales pentru a da titlurilor greutatea unui afiș de spectacol nocturn.
- **Corp de text și UI (`--font-sans`)**: `'Plus Jakarta Sans'`, sans-serif (greutăți 400, 500, 600, 700) — lizibilitate excelentă pe fundal închis și suport complet `latin-ext` pentru diacriticele românești (`ă, â, î, ș, ț`).

---

## 4. Reguli de Compoziție și Ritm (`RHYTHM 3`)

1. **Fără șabloane SaaS**: Nu se folosesc grile repetitive de 3 carduri egale, hero centrat cu două butoane pastilă, bare de logo-uri inventate sau subsoluri șablon pe 4 coloane.
2. **Hero Asimetric**: Titlul și acțiunea principală sunt ancorate în stânga pe un plan lizibil, în timp ce partea dreaptă și registrul superior expun cadrul fotografic principal și cerul interactiv Canvas 2D.
3. **Variație între secțiuni**:
   - *Servicii*: Index editorial numerotat cu compoziții adaptate scării fiecărui serviciu (desfășurare amplă pentru spectacolele exterioare, compoziție duală Cyan/Magenta pentru Gender Reveal, fișă tehnică orizontală pentru efectele de interior).
   - *Galerie*: Secvență editorială cu raporturi de aspect variate (`16:9`, `9:16` vertical specific filmărilor de eveniment/WhatsApp, `4:5`) și vizualizator `<dialog>` accesibil din tastatură.
   - *Proces & Siguranță*: Specificație arhitecturală în două coloane (fără iconițe decorative în pătrate rotunjite).
   - *Contact*: Panou direct de comandă și dialog (WhatsApp, Telefon, Formular/Email verificat).
