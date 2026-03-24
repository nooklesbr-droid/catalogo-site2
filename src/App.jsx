import { useMemo, useState, useEffect } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); 
    window.addEventListener('resize', checkMobile); 
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
}

const SENHA_REAL = "1234";

const databaseSecreto = [
  {
    id: "fornecedores-py-geral",
    type: "shop",
    title: "Fornecedores Paraguai",
    subtitle: "Atacado geral",
    icon: "🛍️",
    items: [
      { name: "CAMILA", phone: "+595 987 434342", notes: "Iphones Swap e Perfumes" },
      { name: "JOANA", phone: "+595 975 521432", notes: "Perfumes" },
      { name: "LA PETISQUERA PARAGUAI", phone: "+595 982 464403", notes: "Perfumes" },
      { name: "LOJA PERFUMES PARAGUAI", phone: "+595 981 365607", notes: "Geral" },
      { name: "NOELIA ATACADO", phone: "+595 976 530616", notes: "Perfume Elegance" },
      { name: "PERFUMARIA PARAGUAI", phone: "+595 992 279951", notes: "Geral" },
      { name: "CINDY (PONTOCOM)", phone: "+595 981 365607", notes: "Geral" },
      { name: "JOEL (CHARME PERFUMERIA)", phone: "+595 985 689923", notes: "Charme Perfumes" },
      { name: "RODRIGO (EL KILLO)", phone: "+595 993 324431", notes: "Especialista" },
      { name: "CHARLES (EL KILLO)", phone: "+595 973 836653", notes: "Especialista" },
      { name: "CINTHIA (EL KILLO)", phone: "+595 994 812498", notes: "Especialista" },
      { name: "JAC. (EL KILLO)", phone: "+55 21 99338-8704", notes: "Especialista" },
    ],
  },
  {
    id: "farmacias-fernando",
    type: "shop",
    title: "Farmácias (Indicação Fernando)",
    subtitle: "Recomendações",
    icon: "🏬",
    items: [
      { name: "DILICOO", phone: "+595 975 852277", notes: "Indicação Fernando" },
      { name: "ALEE ATACADO", phone: "+595 994 998866", notes: "Indicação Fernando" },
      { name: "FARMÁCIA BYMAC", phone: "+595 973 648393", notes: "Indicação Fernando" },
    ],
  },
  {
    id: "farmacias-brasil-garantia",
    type: "shop",
    title: "Farmácias (Entrega Brasil com Garantia)",
    subtitle: "Logística garantida",
    icon: "🇧🇷",
    items: [
      { name: "PHARMA SPACEFIT", phone: "+595 983 099034", notes: "Entrega garantida" },
      { name: "CINDY (FARMAUTIL)", phone: "+595 995 664468", notes: "Entrega garantida" },
      { name: "CINDY RESERVA", phone: "+595 973 172188", notes: "Número secundário" },
      { name: "MARIZA SPACE FIT", phone: "+595 986 263110", notes: "Logística integrada" },
      { name: "TRIUNFO", phone: "+595 993 329379", notes: "Garantia e Freteiro" },
    ],
  },
  {
    id: "farmacias-anabolizantes",
    type: "shop",
    title: "Anabolizantes",
    subtitle: "Hormônios e performance",
    icon: "💉",
    items: [
      { name: "TRIUNFO (ANABOL)", phone: "+595 993 329379", notes: "Especialista" },
      { name: "KRATOS AZEVEDO", phone: "+595 992 601025", notes: "Especialista" },
      { name: "GABRIEL STAR COMPANY", phone: "+595 987 459535", notes: "Performance" },
      { name: "RODRIGO (EL KILLO)", phone: "+595 993 324431", notes: "Especialista" },
    ],
  },
  {
    id: "estoque-sp",
    type: "shop",
    title: "Estoque SP",
    subtitle: "Pronta entrega",
    icon: "📦",
    items: [
      { name: "RODRIGO ZPHARMA", phone: "+595 973 183828", notes: "Estoque em São Paulo" },
    ],
  },
  {
    id: "fernando-freteiros",
    type: "shipping",
    title: "Freteiros (Indicação Fernando)",
    subtitle: "Logística",
    icon: "🚚",
    items: [
      { name: "DENISE FRETEIRA", phone: "+55 11 95722-2547", notes: "Indicação Fernando" },
      { name: "JU RIBEIRO", phone: "+595 993 045009", notes: "Indicação Fernando" },
      { name: "JOHNNY", phone: "+55 45 9904-7330", notes: "Indicação Fernando" },
    ],
  },
  {
    id: "freteiros-porcentagem",
    type: "shipping",
    title: "Freteiros % e Garantia",
    subtitle: "Logística por %",
    icon: "🛡️",
    items: [
      { name: "DENISE", phone: "+55 11 95722-2547", notes: "Garantia até SP" },
      { name: "SONIA", phone: "+595 992 907185", notes: "Garantia até SP" },
    ],
  }
];

const removerAcentos = (texto) => {
  if (!texto) return "";
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

export default function App() {
  const isMobile = useIsMobile(); 
  const [dadosDoCatalogo, setDadosDoCatalogo] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

  async function handleLogin() {
    if (password === SENHA_REAL) {
      setDadosDoCatalogo(databaseSecreto);
    } else {
      setError("Código de acesso inválido.");
    }
  }

  const shops = useMemo(() => dadosDoCatalogo?.filter(d => d.type === "shop") || [], [dadosDoCatalogo]);
  const shipping = useMemo(() => dadosDoCatalogo?.filter(d => d.type === "shipping") || [], [dadosDoCatalogo]);

  const filteredItems = useMemo(() => {
    if (!dadosDoCatalogo || !activeTab) return [];
    const section = dadosDoCatalogo.find(s => s.id === activeTab);
    if (!section) return [];
    const buscaLimpa = removerAcentos(search.trim());
    if (!buscaLimpa) return section.items;
    return section.items.filter((item) => 
      removerAcentos(item.name).includes(buscaLimpa) || 
      removerAcentos(item.notes).includes(buscaLimpa) ||
      item.phone.replace(/\D/g, '').includes(buscaLimpa.replace(/\D/g, ''))
    );
  }, [search, dadosDoCatalogo, activeTab]);

  const styles = getStyles(isMobile);

  if (!dadosDoCatalogo) {
    return (
      <div style={styles.page}>
        <div style={styles.loginCenterContainer}>
          <div style={styles.loginContentBox}>
            <div style={styles.loginLeft}>
              <div style={styles.loginPill}>🛡️ AMBIENTE CRIPTOGRAFADO</div>
              <div style={styles.loginSmallHero}>ACESSO RESTRITO • 2026</div>
              <h1 style={styles.loginTitleHero}>Catálogo<br /><span style={styles.textGradientHero}>VIP</span></h1>
              <p style={styles.loginDescHero}>Base de dados exclusiva para fornecedores e logística estratégica.</p>
            </div>
            <div style={styles.loginRight}>
              <div style={styles.loginCard}>
                <div style={styles.loginHeader}><div style={styles.lockBox}>🔑</div><h2 style={styles.loginTitle}>Autenticação</h2></div>
                <div style={styles.inputWrap}>
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} placeholder="Senha" style={styles.input} />
                  <button onClick={() => setShowPassword(!showPassword)} style={styles.eyeButton}>{showPassword ? "🙈" : "👁️"}</button>
                </div>
                {error && <div style={styles.errorText}>{error}</div>}
                <button onClick={handleLogin} style={styles.primaryButton}>LIBERAR SISTEMA</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentSection = activeTab ? dadosDoCatalogo.find(s => s.id === activeTab) : null;

  return (
    <div style={styles.page}>
      <div style={styles.appContainer}>
        <header style={styles.heroPanel}>
          <div style={styles.heroGrid}>
            <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
              <div style={styles.heroPanelSmall}>OPERADOR: VITOR • STATUS: ONLINE</div>
              <h1 style={styles.heroPanelTitle}>Catálogo <span style={styles.textGradientHero}>VIP</span></h1>
            </div>
            <div style={styles.searchCard}>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔎 Filtrar banco de dados..." style={styles.input} />
            </div>
          </div>
        </header>

        <nav style={styles.tabNavContainer}>
          <div style={styles.tabGroup}>{shops.map(s => (<button key={s.id} onClick={() => setActiveTab(s.id)} style={{...styles.tabButton, ...(activeTab === s.id ? styles.tabButtonActive : {})}}><span>{s.icon}</span><span>{s.title}</span></button>))}</div>
          <div style={styles.divider} />
          <div style={styles.tabGroup}>{shipping.map(s => (<button key={s.id} onClick={() => setActiveTab(s.id)} style={{...styles.tabButton, ...(activeTab === s.id ? styles.tabButtonActive : {})}}><span>{s.icon}</span><span>{s.title}</span></button>))}</div>
        </nav>

        <main style={styles.mainContent}>
          {activeTab ? (
            <section style={styles.sectionCard}>
              <div style={styles.sectionHeader}><h2 style={styles.sectionTitle}>{currentSection.title}</h2><span style={styles.recordsPill}>{filteredItems.length} REGISTROS</span></div>
              <div style={styles.tableWrap}>
                <div style={styles.tableHead}>
                  <div style={{ flex: 0.4 }}>ID</div>
                  <div style={{ flex: 1.8 }}>NOME</div>
                  <div style={{ flex: 1.2, textAlign: "center" }}>WHATSAPP</div>
                  <div style={{ flex: 1.6 }}>NOTAS</div>
                </div>
                {filteredItems.map((item, index) => (
                  <div key={item.name + index} style={styles.tableRowBody}>
                    <div style={{...styles.cell, flex: 0.4}}><span style={styles.idx}>#0{index + 1}</span></div>
                    <div style={{...styles.cell, flex: 1.8}}><div style={styles.nameCell}>{item.name}</div></div>
                    <div style={{...styles.cell, flex: 1.2, justifyContent: "center"}}><a href={`https://wa.me/${item.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" style={styles.whatsappLink}>{item.phone}</a></div>
                    <div style={{...styles.cell, flex: 1.6}}><div style={styles.noteCell}>{item.notes}</div></div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <div style={styles.emptyStateContainer}><div style={styles.emptyIcon}>📂</div><h2 style={styles.emptyTitle}>Selecione uma categoria acima</h2></div>
          )}
        </main>
      </div>
    </div>
  );
}

const getStyles = (isMobile) => ({
  page: { 
    minHeight: "100vh", 
    color: "#e2e8f0", 
    fontFamily: "'Segoe UI', sans-serif", 
    background: "#0a0f16", 
    backgroundImage: "radial-gradient(circle at 50% -20%, #1e293b 0%, #0a0f16 100%)", 
    display: "flex", 
    flexDirection: "column",
    boxSizing: "border-box" 
  },
  loginCenterContainer: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "20px", boxSizing: "border-box" },
  loginContentBox: { display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "center", gap: isMobile ? "40px" : "100px", width: "100%", maxWidth: "1200px" },
  loginLeft: { flex: 1, display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : "flex-start", textAlign: isMobile ? "center" : "left", maxWidth: "500px" },
  loginPill: { display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: "8px", background: "rgba(0, 122, 204, 0.1)", color: "#00b4d8", fontSize: 11, fontWeight: 800, border: "1px solid rgba(0, 122, 204, 0.2)", marginBottom: "30px" },
  loginSmallHero: { color: "#64748b", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "4px", marginBottom: 15 },
  loginTitleHero: { margin: 0, fontSize: isMobile ? "50px" : "110px", fontWeight: 800, lineHeight: 0.85, letterSpacing: "-4px" },
  textGradientHero: { background: "linear-gradient(90deg, #007acc, #00b4d8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  loginDescHero: { color: "#94a3b8", fontSize: "18px", lineHeight: 1.6, marginTop: 25 },
  loginRight: { flex: 1, display: "flex", justifyContent: "center", width: "100%", maxWidth: "440px" },
  loginCard: { width: "100%", background: "rgba(30, 41, 59, 0.5)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: 32, padding: isMobile ? "30px 20px" : "50px", backdropFilter: "blur(20px)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" },
  loginHeader: { display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 35 },
  lockBox: { fontSize: "32px" },
  loginTitle: { margin: 0, fontSize: 24, fontWeight: 700, color: "#fff" },
  inputWrap: { position: "relative", marginBottom: "15px" },
  input: { width: "100%", height: 56, borderRadius: 16, border: "1px solid rgba(255, 255, 255, 0.1)", background: "rgba(15, 23, 42, 0.8)", color: "#fff", padding: "0 18px", outline: "none", fontSize: 16, boxSizing: "border-box" },
  eyeButton: { position: "absolute", right: 15, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 20 },
  errorText: { color: "#fb7185", fontSize: 13, textAlign: "center", fontWeight: 600, marginBottom: "15px" },
  primaryButton: { width: "100%", height: 60, borderRadius: 16, background: "linear-gradient(90deg, #007acc, #00b4d8)", color: "#fff", fontWeight: 700, cursor: "pointer", border: "none", fontSize: 14, letterSpacing: "1px" },
  
  // CONTAINER DO APP CORRIGIDO
  appContainer: { 
    width: "95%", 
    maxWidth: "1100px", 
    margin: "0 auto", 
    padding: isMobile ? "20px 0" : "40px 0",
    boxSizing: "border-box"
  },
  heroPanel: { marginBottom: 30, width: "100%" },
  heroGrid: { display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20 },
  heroPanelSmall: { color: "#64748b", fontSize: 11, fontWeight: 800, letterSpacing: "2px", marginBottom: 10 },
  heroPanelTitle: { margin: 0, fontSize: isMobile ? "32px" : "44px", fontWeight: 800, letterSpacing: "-1px" },
  searchCard: { flex: isMobile ? "1 1 100%" : "0 1 400px" },
  
  tabNavContainer: { display: "flex", flexDirection: "column", gap: "12px", marginBottom: "35px", width: "100%" },
  tabGroup: { display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: isMobile ? "center" : "flex-start" },
  divider: { height: "1px", background: "rgba(0, 122, 204, 0.2)", margin: "8px 0" },
  tabButton: { padding: "12px 18px", borderRadius: "10px", background: "rgba(30, 41, 59, 0.4)", border: "1px solid rgba(255, 255, 255, 0.05)", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: "13px", transition: "0.2s" },
  tabButtonActive: { background: "rgba(0, 122, 204, 0.2)", border: "1px solid #007acc", color: "#fff", boxShadow: "0 0 15px rgba(0, 122, 204, 0.2)" },
  
  mainContent: { width: "100%" },
  sectionCard: { background: "rgba(30, 41, 59, 0.15)", borderRadius: 30, padding: isMobile ? "15px" : "25px", border: "1px solid rgba(255, 255, 255, 0.05)", width: "100%", boxSizing: "border-box" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, padding: "0 10px" },
  sectionTitle: { margin: 0, fontSize: "22px", fontWeight: 700, color: "#fff" },
  recordsPill: { fontSize: 10, fontWeight: 800, color: "#64748b" },
  
  // TABELA CORRIGIDA PARA NÃO VAZAR
  tableWrap: { 
    width: "100%", 
    display: "flex", 
    flexDirection: "column",
    overflow: "hidden" // Impede que o conteúdo interno empurre o card
  },
  tableHead: { 
    display: isMobile ? "none" : "flex", 
    padding: "15px 25px", 
    background: "rgba(255,255,255,0.02)", 
    color: "#00b4d8", 
    fontWeight: 800, 
    fontSize: 11, 
    letterSpacing: "1px", 
    borderRadius: "12px", 
    marginBottom: "10px" 
  },
  tableRowBody: { 
    display: "flex", 
    flexDirection: isMobile ? "column" : "row", 
    padding: isMobile ? "20px" : "15px 25px", 
    borderBottom: "1px solid rgba(255, 255, 255, 0.03)", 
    gap: isMobile ? 12 : 0, 
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box"
  },
  cell: { display: "flex", alignItems: "center", overflow: "hidden" },
  idx: { color: "#00b4d8", opacity: 0.5, fontWeight: 700 },
  nameCell: { color: "#fff", fontWeight: 600, fontSize: "15px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  whatsappLink: { textDecoration: "none", color: "#00b4d8", background: "rgba(0, 180, 216, 0.1)", padding: "8px 15px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "1px solid rgba(0, 180, 216, 0.2)", whiteSpace: "nowrap" },
  noteCell: { color: "#94a3b8", fontSize: 13, fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  emptyStateContainer: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", textAlign: "center" },
  emptyIcon: { fontSize: "50px", marginBottom: "15px", opacity: 0.4 },
  emptyTitle: { color: "#fff", fontSize: "20px", margin: 0 }
});
