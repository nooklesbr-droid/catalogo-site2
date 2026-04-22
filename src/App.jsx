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

const SENHA_REAL = "2801";

const databaseSecreto = [
  {
    id: "fornecedores-py-geral",
    type: "shop",
    title: "Fornecedores Paraguai",
    items: [
      { name: "CAMILA", phone: "+595 987 434342", notes: "Iphones Swap e Perfumes" },
      { name: "JOANA", phone: "+595 975 521432", notes: "Perfumes" },
      { name: "LA PETISQUERA PARAGUAI", phone: "+595 982 464403", notes: "Perfumes" },
      { name: "LOJA PERFUMES PARAGUAI", phone: "+595 981 365607", notes: "Geral" },
      { name: "NOELIA ATACADO", phone: "+595 976 530616", notes: "Perfume Elegance" },
      { name: "PERFUMARIA PARAGUAI", phone: "+595 992 279951", notes: "Geral" },
      { name: "CINDY (PONTOCOM)", phone: "+595 981 365607", notes: "Geral" },
      { name: "JOEL (CHARME PERFUMERIA)", phone: "+595 985 689923", notes: "Charme Perfumes" },
      { name: "RODRIGO (EL KILLO)", phone: "+593 993 324431", notes: "Especialista" },
      { name: "CHARLES (EL KILLO)", phone: "+593 836 653", notes: "Especialista" },
      { name: "CINTHIA (EL KILLO)", phone: "+594 812 498", notes: "Especialista" },
      { name: "JAC. (EL KILLO)", phone: "+55 21 99338-8704", notes: "Especialista" },
      { name: "CELESTE MACEDONIA", phone: "+595 976 969999", notes: "Geral" },
    ],
  },
  {
    id: "eletronicos",
    type: "shop",
    title: "Eletrônicos",
    items: [
      { name: "AIDE ATACADO CONNECT 333", phone: "+595 984 280444", notes: "Eletrônicos" },
      { name: "PAOLA MEGA", phone: "+595 991 719482", notes: "Eletrônicos" },
      { name: "VANESSA ATLANTICO SHOP", phone: "+595 974 560956", notes: "Eletrônicos" },
      { name: "NORMA IPHONE BESTSHOP", phone: "+595 992 908371", notes: "iPhones e Geral" },
      { name: "PERLA MEGA", phone: "+595 983 262366", notes: "Eletrônicos" },
      { name: "ROSA PAEZ ATACADO CONNECT", phone: "+595 981 686916", notes: "Eletrônicos" },
      { name: "BLAS MEGA CELL", phone: "+595 992 797759", notes: "Celulares e Eletrônicos" },
    ],
  },
  {
    id: "vapes",
    type: "shop",
    title: "Vapes e Pods",
    items: [
      { name: "FÁTIMA EPIC VAPE SHOP", phone: "+595 985 842998", notes: "Vapes" },
      { name: "TOTAL VAPE - LIZ", phone: "+595 987 139304", notes: "Pods e Vapes" },
    ],
  },
  {
    id: "farmacias-fernando",
    type: "shop",
    title: "Farmácias (Indicação Fernando)",
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
    items: [
      { name: "PHARMA SPACEFIT", phone: "+595 983 099034", notes: "Entrega garantida" },
      { name: "CINDY (FARMAUTIL)", phone: "+595 995 664468", notes: "Entrega garantida" },
      { name: "CINDY RESERVA", phone: "+595 973 172188", notes: "Número secundário" },
      { name: "MARIZA SPACE FIT", phone: "+595 986 263110", notes: "Logística integrada" },
      { name: "TRIUNFO", phone: "+595 993 329379", notes: "Garantia e Freteiro" },
      { name: "LARISSA SPACE", phone: "+595 987 435558", notes: "Fornecedor Farmácia" },
      { name: "SPACE 2", phone: "+595 986 236942", notes: "Fornecedor Farmácia" },
      { name: "FARMAUTIL BODY FACTORY 3", phone: "+595 994 365202", notes: "Fornecedor Farmácia" },
      { name: "FARMAUTIL - BODY FACTORY", phone: "+595 995 664468", notes: "Fornecedor Farmácia" },
      { name: "ANA CÁCERES FARMÁCIA", phone: "+595 983 689419", notes: "Farmácia" },
    ],
  },
  {
    id: "farmacias-anabolizantes",
    type: "shop",
    title: "Anabolizantes",
    items: [
      { name: "TRIUNFO (ANABOL)", phone: "+595 993 329379", notes: "Especialista" },
      { name: "KRATOS AZEVEDO", phone: "+595 992 601025", notes: "Especialista" },
      { name: "GABRIEL STAR COMPANY", phone: "+595 987 459535", notes: "Performance" },
      { name: "RODRIGO (EL KILLO)", phone: "+595 993 324431", notes: "Especialista" },
      { name: "ALEE ATACADO", phone: "+595 994 998866", notes: "Hormônios e performance" },
      { name: "CHARLES (EL KILLO)", phone: "+595 973 836653", notes: "Especialista" },
      { name: "CINTHIA (EL KILLO)", phone: "+594 812 498", notes: "Especialista" },
      { name: "JAC. (EL KILLO)", phone: "+55 21 99338-8704", notes: "Especialista" },
    ],
  },
  {
    id: "estoque-sp",
    type: "shop",
    title: "Estoque SP",
    items: [
      { name: "RODRIGO ZPHARMA", phone: "+595 976 876430", notes: "Estoque em São Paulo" },
      { name: "DRA.", phone: "+55 11 94751-2328", notes: "Fornecedor São Paulo" },
    ],
  },
  {
    id: "fernando-freteiros",
    type: "shipping",
    title: "Freteiros (Indicação Fernando)",
    items: [
      { name: "ANDERSON", phone: "+55 45 9109-4135", notes: "Freteiro" },
      { name: "PAULO FRETEIRO", phone: "+55 41 9930-1081", notes: "Novo Freteiro" },
      { name: "DENISE FRETEIRA", phone: "+55 11 95722-2547", notes: "Indicação Fernando" },
      { name: "ANTÔNIO", phone: "+1 (407) 574-1627", notes: "Indicação Fernando" },
      { name: "TIRZEFARMA", phone: "+595 992 171856", notes: "Freteiro" },
    ],
  },
  {
    id: "freteiros-porcentagem",
    type: "shipping",
    title: "Freteiros % e Garantia",
    items: [
      { name: "DENISE", phone: "+55 11 95722-2547", notes: "Garantia até SP" },
      { name: "SONIA", phone: "+595 992 907185", notes: "Garantia até SP" },
    ],
  }
];

export default function App() {
  const isMobile = useIsMobile(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

  const dataAtualizacao = "31/03/2026";

  async function handleLogin() {
    if (password === SENHA_REAL) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Código de acesso inválido.");
    }
  }

  const displayItems = useMemo(() => {
    const termoBusca = search.trim().toLowerCase();
    if (!termoBusca) {
      const categoriaAtiva = databaseSecreto.find(cat => cat.id === activeTab);
      return categoriaAtiva ? categoriaAtiva.items : [];
    }
    const resultados = [];
    databaseSecreto.forEach(categoria => {
      categoria.items.forEach(item => {
        const nome = item.name.toLowerCase();
        const notas = item.notes.toLowerCase();
        const fone = item.phone.replace(/\D/g, '');
        const buscaFone = termoBusca.replace(/\D/g, '');
        if (nome.includes(termoBusca) || notas.includes(termoBusca) || (buscaFone && fone.includes(buscaFone))) {
          if (!resultados.find(r => r.phone === item.phone && r.name === item.name)) {
            resultados.push(item);
          }
        }
      });
    });
    return resultados;
  }, [search, activeTab]);

  const shops = databaseSecreto.filter(d => d.type === "shop");
  const shipping = databaseSecreto.filter(d => d.type === "shipping");

  const styles = getStyles(isMobile);

  if (!isLoggedIn) {
    return (
      <div style={styles.page}>
        <div style={styles.loginCenterContainer}>
          <div style={styles.loginContentBox}>
            <div style={styles.loginLeft}>
              <div style={styles.loginSmallHero}>ACESSO RESTRITO • 2026</div>
              <h1 style={styles.loginTitleHero}>Catálogo<br /><span style={styles.textGradientHero}>VIP</span></h1>
            </div>
            
            <div style={styles.loginRightContainer}>
               <div style={styles.loginCard}>
                  <div style={styles.loginHeader}>
                      <div style={styles.lockBox}>🔑</div>
                      <h2 style={styles.loginTitle}>Autenticação</h2>
                  </div>
                  <div style={styles.inputWrap}>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()} 
                      placeholder="Senha" 
                      style={styles.input} 
                    />
                    <button onClick={() => setShowPassword(!showPassword)} style={styles.eyeButton}>{showPassword ? "🙈" : "👁️"}</button>
                  </div>
                  {error && <div style={styles.errorText}>{error}</div>}
                  <button onClick={handleLogin} style={styles.primaryButton}>LIBERAR SISTEMA</button>
               </div>

               <a href="https://calculadorapept.onrender.com/" target="_blank" rel="noreferrer" style={styles.calcButtonLogin}>
                  <span style={{ fontSize: "20px" }}>🧮</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "11px", opacity: 0.7, fontWeight: 400 }}>Dificuldade com a seringa?</div>
                    <div style={{ fontSize: "14px", fontWeight: 700 }}>CALCULAR DOSAGEM AGORA</div>
                  </div>
               </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.appContainer}>
        <header style={styles.heroPanel}>
          <div style={styles.heroGrid}>
            <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
              <div style={styles.heroPanelSmall}>ÚLTIMA ATUALIZAÇÃO: {dataAtualizacao}</div>
              <h1 style={styles.heroPanelTitle}>Catálogo <span style={styles.textGradientHero}>VIP</span></h1>
            </div>
            <div style={styles.searchCard}>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔎 Digite o nome ou telefone..." style={styles.input} />
            </div>
          </div>
        </header>

        {!(search.trim().length > 0) && (
          <nav style={styles.tabNavContainer}>
            <div style={styles.tabGroup}>{shops.map(s => (<button key={s.id} onClick={() => setActiveTab(s.id)} style={{...styles.tabButton, ...(activeTab === s.id ? styles.tabButtonActive : {})}}><span>{s.title}</span></button>))}</div>
            <div style={styles.divider} />
            <div style={styles.tabGroup}>{shipping.map(s => (<button key={s.id} onClick={() => setActiveTab(s.id)} style={{...styles.tabButton, ...(activeTab === s.id ? styles.tabButtonActive : {})}}><span>{s.title}</span></button>))}</div>
          </nav>
        )}

        <main style={styles.mainContent}>
          {(activeTab || (search.trim().length > 0)) ? (
            <section style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>
                  {(search.trim().length > 0) ? "🔍 Resultados da Pesquisa" : databaseSecreto.find(s => s.id === activeTab)?.title}
                </h2>
                <span style={styles.recordsPill}>{displayItems.length} REGISTROS</span>
              </div>
              <div style={styles.tableWrap}>
                <div style={styles.tableHead}>
                  <div style={{ flex: 0.4 }}>ID</div>
                  <div style={{ flex: 1.8 }}>NOME</div>
                  <div style={{ flex: 1.2, textAlign: "center" }}>WHATSAPP</div>
                  <div style={{ flex: 1.6 }}>NOTAS</div>
                </div>
                {displayItems.map((item, index) => (
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
            <div style={styles.emptyStateContainer}><div style={styles.emptyIcon}>📂</div><h2 style={styles.emptyTitle}>Selecione uma categoria ou pesquise</h2></div>
          )}
        </main>
      </div>
    </div>
  );
}

const getStyles = (isMobile) => ({
  page: { minHeight: "100vh", color: "#e2e8f0", fontFamily: "'Segoe UI', sans-serif", background: "#0a0f16", backgroundImage: "radial-gradient(circle at 50% -20%, #1e293b 0%, #0a0f16 100%)", display: "flex", flexDirection: "column", boxSizing: "border-box" },
  loginCenterContainer: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "20px" },
  loginContentBox: { display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "center", width: "fit-content", gap: isMobile ? "40px" : "60px", margin: "0 auto" },
  loginLeft: { textAlign: isMobile ? "center" : "left", flexShrink: 0 },
  loginSmallHero: { color: "#64748b", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "4px", marginBottom: 15 },
  loginTitleHero: { margin: 0, fontSize: isMobile ? "54px" : "100px", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-4px" },
  textGradientHero: { background: "linear-gradient(90deg, #007acc, #00b4d8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  loginRightContainer: { display: "flex", flexDirection: "column", gap: "20px", width: "380px", flexShrink: 0 },
  loginCard: { width: "100%", background: "rgba(30, 41, 59, 0.4)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: 24, padding: "40px", backdropFilter: "blur(20px)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)", boxSizing: "border-box" },
  loginHeader: { display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 30 },
  lockBox: { fontSize: "32px" },
  loginTitle: { margin: 0, fontSize: 24, fontWeight: 700, color: "#fff" },
  inputWrap: { position: "relative", marginBottom: "15px" },
  input: { width: "100%", height: 56, borderRadius: 12, border: "1px solid rgba(255, 255, 255, 0.1)", background: "rgba(15, 23, 42, 0.8)", color: "#fff", padding: "0 18px", outline: "none", fontSize: 16, boxSizing: "border-box" },
  eyeButton: { position: "absolute", right: 15, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 20 },
  errorText: { color: "#fb7185", fontSize: 13, textAlign: "center", fontWeight: 600, marginBottom: "15px" },
  primaryButton: { width: "100%", height: 56, borderRadius: 12, background: "#00b4d8", color: "#fff", fontWeight: 700, cursor: "pointer", border: "none", fontSize: 14, letterSpacing: "1px" },
  
  // ESTILO DO BOTÃO DE CALCULADORA COM DESTAQUE
  calcButtonLogin: { 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "flex-start", 
    gap: "15px",
    width: "100%", 
    height: "75px", 
    borderRadius: "20px", 
    background: "rgba(0, 180, 216, 0.1)", 
    color: "#00b4d8", 
    padding: "0 25px",
    cursor: "pointer", 
    border: "2px solid rgba(0, 180, 216, 0.3)", 
    textDecoration: "none",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
  },

  appContainer: { width: "95%", maxWidth: "1100px", margin: "0 auto", padding: "40px 0" },
  heroPanel: { marginBottom: 30 },
  heroGrid: { display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20 },
  heroPanelSmall: { color: "#64748b", fontSize: 10, fontWeight: 800, letterSpacing: "2px", marginBottom: 10 },
  heroPanelTitle: { margin: 0, fontSize: isMobile ? "32px" : "44px", fontWeight: 800 },
  searchCard: { flex: isMobile ? "1 1 100%" : "0 1 350px" },
  tabNavContainer: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px" },
  tabGroup: { display: "flex", flexWrap: "wrap", gap: "8px" },
  divider: { height: "1px", background: "rgba(255, 255, 255, 0.05)", margin: "5px 0" },
  tabButton: { padding: "8px 16px", borderRadius: "8px", background: "rgba(30, 41, 59, 0.4)", border: "1px solid rgba(255, 255, 255, 0.05)", color: "#94a3b8", cursor: "pointer", fontSize: "13px", fontWeight: 600 },
  tabButtonActive: { background: "rgba(0, 180, 216, 0.15)", border: "1px solid #00b4d8", color: "#fff" },
  mainContent: { width: "100%" },
  sectionCard: { background: "rgba(30, 41, 59, 0.2)", borderRadius: 20, padding: isMobile ? "15px" : "25px", border: "1px solid rgba(255, 255, 255, 0.05)" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  sectionTitle: { margin: 0, fontSize: "18px", color: "#fff" },
  recordsPill: { fontSize: 10, color: "#64748b" },
  tableWrap: { width: "100%", display: "flex", flexDirection: "column" },
  tableHead: { display: isMobile ? "none" : "flex", padding: "10px 20px", color: "#00b4d8", fontWeight: 800, fontSize: 11, background: "rgba(255,255,255,0.02)", borderRadius: "8px", marginBottom: "10px" },
  tableRowBody: { display: "flex", flexDirection: isMobile ? "column" : "row", padding: "15px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.03)", alignItems: "center" },
  cell: { display: "flex", alignItems: "center" },
  idx: { color: "#00b4d8", opacity: 0.5 },
  nameCell: { color: "#fff", fontWeight: 600 },
  whatsappLink: { textDecoration: "none", color: "#00b4d8", background: "rgba(0, 180, 216, 0.1)", padding: "6px 12px", borderRadius: "6px", fontWeight: 700, fontSize: "13px" },
  noteCell: { color: "#94a3b8", fontSize: 13 },
  emptyStateContainer: { textAlign: "center", padding: "60px 0" },
  emptyIcon: { fontSize: "40px", opacity: 0.3 },
  emptyTitle: { color: "#64748b", fontSize: "16px" }
});
