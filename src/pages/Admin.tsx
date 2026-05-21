import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Database, 
  Trash2, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Phone, 
  User, 
  MapPin, 
  Activity, 
  Briefcase, 
  Search, 
  Filter, 
  Clipboard, 
  Check, 
  Download, 
  RefreshCw,
  LogOut,
  Sliders,
  AlertCircle
} from "lucide-react";
import { supabase, SQL_SETUP_SCRIPT, Inquiry } from "../lib/supabase";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Filtering, Searching, and Sorting State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [sortField, setSortField] = useState<string>("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  
  // Selected Inquiry for details or note editing
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [copiedSql, setCopiedSql] = useState(false);

  // Stats Counters
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    progress: 0,
    closed: 0,
    dealerships: 0
  });

  // Check login on mount
  useEffect(() => {
    const term = localStorage.getItem("noori_admin_auth");
    if (term === "authenticated") {
      setIsLoggedIn(true);
      fetchInquiries();
    }
  }, []);

  // Recalculate stats when inquiries change
  useEffect(() => {
    const total = inquiries.length;
    const isNew = inquiries.filter(i => i.status === "New" || !i.status).length;
    const progress = inquiries.filter(i => i.status === "In Progress" || i.status === "Contacted").length;
    const closed = inquiries.filter(i => i.status === "Closed").length;
    const dealerships = inquiries.filter(i => i.type === "dealership_enquiry").length;

    setStats({
      total,
      new: isNew,
      progress,
      closed,
      dealerships
    });
  }, [inquiries]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = username.trim().toLowerCase();
    if (cleanEmail === "admin@nooriev.in" && password === "Nooriev@123") {
      localStorage.setItem("noori_admin_auth", "authenticated");
      setIsLoggedIn(true);
      setLoginError("");
      fetchInquiries();
    } else {
      setLoginError("Invalid email address or security password. Please use Admin@nooriev.in / Nooriev@123.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("noori_admin_auth");
    setIsLoggedIn(false);
  };

  const fetchInquiries = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        // If the table doesn't exist yet, guide the user to set it up
        if (error.code === "P0001" || error.message?.includes("does not exist")) {
          setErrorMsg("TABLE_MISSING");
        } else {
          setErrorMsg(error.message);
        }
      } else {
        setInquiries(data as Inquiry[] || []);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: Inquiry['status']) => {
    try {
      const { error } = await supabase
        .from("enquiries")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) {
        alert("Failed to update status in database: " + error.message);
      } else {
        setInquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const saveNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from("enquiries")
        .update({ notes: noteText })
        .eq("id", id);

      if (error) {
        alert("Failed to save notes: " + error.message);
      } else {
        setInquiries(prev => prev.map(item => item.id === id ? { ...item, notes: noteText } : item));
        setActiveNoteId(null);
        setNoteText("");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const startEditingNote = (item: Inquiry) => {
    setActiveNoteId(item.id || null);
    setNoteText(item.notes || "");
  };

  const deleteInquiry = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enquiry from the records?")) return;
    try {
      const { error } = await supabase
        .from("enquiries")
        .delete()
        .eq("id", id);

      if (error) {
        alert("Failed to delete enquiry: " + error.message);
      } else {
        setInquiries(prev => prev.filter(item => item.id !== id));
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const copySql = () => {
    navigator.clipboard.writeText(SQL_SETUP_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const exportToCsv = () => {
    if (inquiries.length === 0) return;
    const headers = ["ID", "Created At", "Name", "Phone", "Model", "City", "Message", "Type", "Status", "Notes"];
    const csvRows = [
      headers.join(","),
      ...inquiries.map(row => [
        `"${row.id || ''}"`,
        `"${row.created_at || ''}"`,
        `"${(row.name || '').replace(/"/g, '""')}"`,
        `"${(row.phone || '').replace(/"/g, '""')}"`,
        `"${(row.model || '').replace(/"/g, '""')}"`,
        `"${(row.city || '').replace(/"/g, '""')}"`,
        `"${(row.message || '').replace(/"/g, '""')}"`,
        `"${row.type || ''}"`,
        `"${row.status || ''}"`,
        `"${(row.notes || '').replace(/"/g, '""')}"`
      ].join(","))
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `noori_ev_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortArrow = (field: string) => {
    if (sortField !== field) return <span className="text-gray-300 ml-1">⇅</span>;
    return sortOrder === "asc" ? <span className="text-brand-green font-bold ml-1">↑</span> : <span className="text-brand-green font-bold ml-1">↓</span>;
  };

  // Filter computation
  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch = 
      (item.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phone || "").includes(searchQuery) ||
      (item.city || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.model || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.message || "").toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "All" || item.status === statusFilter || (!item.status && statusFilter === "New");
    const matchesType = typeFilter === "All" || item.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Sorting computation
  const sortedInquiries = [...filteredInquiries].sort((a, b) => {
    let aVal: any = a[sortField as keyof Inquiry] || "";
    let bVal: any = b[sortField as keyof Inquiry] || "";

    if (typeof aVal === "string") aVal = aVal.toLowerCase();
    if (typeof bVal === "string") bVal = bVal.toLowerCase();

    // Secondary sorting by date if fields are equal
    if (aVal === bVal) {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA; // default date descending
    }

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  if (!isLoggedIn) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-brand-blue p-8 text-center text-white relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/10 rounded-full blur-2xl"></div>
            <Lock className="mx-auto mb-4 text-brand-green" size={40} />
            <h2 className="text-2xl font-bold font-display tracking-tight">NOORI EV Admin</h2>
            <p className="text-white/60 text-xs mt-1 tracking-wider uppercase">Inquiry Manager Verification</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {loginError && (
              <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1 font-sans">Email Address</label>
              <input 
                required
                type="email" 
                placeholder="Admin@nooriev.in"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-brand-blue focus:border-brand-green outline-hidden transition-colors font-medium"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1 font-sans">Password</label>
              <input 
                required
                type="password" 
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-55 border border-gray-100 rounded-2xl px-5 py-4 text-brand-blue focus:border-brand-green outline-hidden transition-colors font-medium"
              />
            </div>

            <div className="bg-brand-blue/5 rounded-2xl p-4 text-xs text-brand-blue/80 space-y-1 leading-relaxed border border-brand-blue/10">
              <p className="font-bold uppercase text-[10px] tracking-wider text-brand-blue">🔐 Authorized Credentials</p>
              <p>Email: <strong className="font-mono font-bold text-brand-blue">Admin@nooriev.in</strong></p>
              <p>Password: <strong className="font-mono font-bold text-brand-blue">Nooriev@123</strong></p>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-brand-green text-brand-blue py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all glow-green cursor-pointer"
            >
              Verify Credentials
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <div>
            <div className="flex items-center gap-3">
              <span className="bg-brand-green/20 text-brand-blue px-3 py-1 rounded-full text-xs font-bold">Authorized Center</span>
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-semibold text-gray-400">Database Connected</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-blue font-display mt-2">Enquiries Control Dashboard</h1>
            <p className="text-gray-500 mt-1 max-w-xl">Supervising incoming test drives, dealer onboarding applications, and customer feedback messages.</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={exportToCsv}
              disabled={inquiries.length === 0}
              className="flex-1 md:flex-initial bg-brand-blue text-white px-5 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-blue/90 disabled:opacity-40 select-none cursor-pointer"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button 
              onClick={fetchInquiries}
              className="bg-gray-100 text-brand-blue p-3.5 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw size={18} className={`${loading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-50 text-red-600 px-5 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-100 transition-colors cursor-pointer"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Database setup blueprint when table is missing in Supabase */}
        {errorMsg === "TABLE_MISSING" && (
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-amber-200 rounded-[2rem] p-8 mb-10 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-3 rounded-2xl text-amber-700">
                <Database size={28} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-amber-950 font-display">Supabase SQL Schema Setup Required</h3>
                <p className="text-amber-800 text-sm max-w-3xl leading-relaxed">
                  The <code className="font-mono bg-amber-100 px-1.5 py-0.5 rounded text-amber-950">enquiries</code> table was not detected on your Supabase instance. Since you provided customized keys, you must execute this SQL command in your <strong>Supabase SQL Editor</strong> to construct the target table & configure instant access rules.
                </p>
              </div>
            </div>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-xs font-mono max-h-64 leading-relaxed">
                {SQL_SETUP_SCRIPT}
              </pre>
              <button 
                onClick={copySql}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 py-1.5 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                {copiedSql ? <Check size={14} className="text-brand-green" /> : <Clipboard size={14} />}
                {copiedSql ? "Copied!" : "Copy SQL Code"}
              </button>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={fetchInquiries}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 px-6 rounded-xl text-sm shadow-md shadow-amber-600/10 transition-colors"
              >
                I Have Executed This - Refresh Page
              </button>
            </div>
          </div>
        )}

        {/* Key business stats panels */}
        {errorMsg !== "TABLE_MISSING" && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
            {[
              { label: "Total Received", value: stats.total, color: "border-brand-blue text-brand-blue bg-white", icon: MessageSquare },
              { label: "New Inquiry", value: stats.new, color: "border-orange-200 text-orange-600 bg-orange-50/50", icon: Clock },
              { label: "Active Contact", value: stats.progress, color: "border-blue-200 text-blue-600 bg-blue-50/30", icon: Activity },
              { label: "Completed / Closed", value: stats.closed, color: "border-brand-green text-green-700 bg-emerald-50/20", icon: CheckCircle },
              { label: "Partnership Request", value: stats.dealerships, color: "border-purple-200 text-purple-700 bg-purple-50/30", icon: Briefcase }
            ].map((stat, i) => (
              <div key={i} className={`p-6 rounded-3xl border ${stat.color} shadow-xs flex flex-col justify-between`}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-gray-400">{stat.label}</span>
                  <stat.icon size={18} className="opacity-60" />
                </div>
                <p className="text-4xl font-extrabold font-display leading-none">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Filters and search section */}
        {errorMsg !== "TABLE_MISSING" && (
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-grow relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by customer name, phone number, messages or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-6 py-3.5 text-brand-blue text-sm focus:border-brand-green outline-hidden"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl">
                <Filter size={14} className="text-gray-400" />
                <span className="text-xs font-semibold text-gray-500">Status:</span>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent text-sm font-bold text-brand-blue focus:outline-hidden"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New / Uncontacted</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl">
                <Sliders size={14} className="text-gray-400" />
                <span className="text-xs font-semibold text-gray-500">Type:</span>
                <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-transparent text-sm font-bold text-brand-blue focus:outline-hidden"
                >
                  <option value="All">All Types</option>
                  <option value="scooter_enquiry">Scooter Enquiry</option>
                  <option value="contact_message">Contact Message</option>
                  <option value="dealership_enquiry">Dealership Request</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-gray-100/60 p-1 rounded-xl self-stretch md:self-auto ml-auto">
                <button 
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${viewMode === "table" ? "bg-white text-brand-blue shadow-xs" : "text-gray-500 hover:text-brand-blue"}`}
                >
                  <span>📊</span> Table View
                </button>
                <button 
                  type="button"
                  onClick={() => setViewMode("cards")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${viewMode === "cards" ? "bg-white text-brand-blue shadow-xs" : "text-gray-500 hover:text-brand-blue"}`}
                >
                  <span>🗂️</span> Card View
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading Spinner / Error messages */}
        {loading && inquiries.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
            <RefreshCw className="animate-spin text-brand-blue mx-auto mb-4" size={40} />
            <p className="text-gray-500 font-medium">Retrieving dealership inquiries from Supabase...</p>
          </div>
        )}

        {errorMsg && errorMsg !== "TABLE_MISSING" && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-[2rem] text-center max-w-2xl mx-auto mb-8">
            <AlertCircle size={32} className="mx-auto mb-4" />
            <h3 className="text-lg font-bold">Failed to Fetch Data</h3>
            <p className="text-sm text-red-600 mt-2">{errorMsg}</p>
            <p className="text-xs text-gray-400 mt-4 leading-relaxed">
              If this is your first time setting up, please verify your keys, check your workspace terminal logs, or ensure the enquiries table SQL is executed.
            </p>
          </div>
        )}

        {/* Main List Layout */}
        {!loading && errorMsg !== "TABLE_MISSING" && filteredInquiries.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
            <MessageSquare className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500 font-bold text-lg">No matching enquiries found</p>
            <p className="text-gray-400 text-sm mt-1">Try relaxing filters or search fields.</p>
          </div>
        )}

        {sortedInquiries.length > 0 && errorMsg !== "TABLE_MISSING" && (
          viewMode === "table" ? (
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-left min-w-[1000px] border-collapse">
                <thead className="bg-gray-50/70 border-b border-gray-100 text-brand-blue text-[10px] font-black uppercase tracking-wider select-none">
                  <tr>
                    <th 
                      onClick={() => handleSort("name")} 
                      className="py-5 px-6 cursor-pointer hover:bg-gray-100/80 transition-all font-sans"
                    >
                      <div className="flex items-center gap-1.5">
                        Customer Name {getSortArrow("name")}
                      </div>
                    </th>
                    <th className="py-5 px-6 font-sans">Contact Info</th>
                    <th 
                      onClick={() => handleSort("type")} 
                      className="py-5 px-6 cursor-pointer hover:bg-gray-100/80 transition-all font-sans"
                    >
                      <div className="flex items-center gap-1.5">
                        Category {getSortArrow("type")}
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort("model")} 
                      className="py-5 px-6 cursor-pointer hover:bg-gray-100/80 transition-all font-sans"
                    >
                      <div className="flex items-center gap-1.5">
                        Scooter Model {getSortArrow("model")}
                      </div>
                    </th>
                    <th className="py-5 px-6 font-sans max-w-[250px]">Customer Remarks</th>
                    <th 
                      onClick={() => handleSort("status")} 
                      className="py-5 px-6 cursor-pointer hover:bg-gray-100/80 transition-all font-sans"
                    >
                      <div className="flex items-center gap-1.5">
                        Status {getSortArrow("status")}
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort("created_at")} 
                      className="py-5 px-6 cursor-pointer hover:bg-gray-100/80 transition-all font-sans"
                    >
                      <div className="flex items-center gap-1.5">
                        Date {getSortArrow("created_at")}
                      </div>
                    </th>
                    <th className="py-5 px-6 font-sans text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs text-brand-blue">
                  {sortedInquiries.map((item) => {
                    const dateString = item.created_at ? new Date(item.created_at).toLocaleString() : "Unknown date";
                    
                    // Define colored badges based on state
                    const getStatusStyles = (status: Inquiry['status'] | string) => {
                      switch (status) {
                        case "Closed":
                          return "bg-green-100 text-green-800 border-green-200";
                        case "In Progress":
                        case "Contacted":
                          return "bg-blue-100 text-blue-800 border-blue-200";
                        case "New":
                        default:
                          return "bg-orange-100 text-orange-850 border-orange-200";
                      }
                    };

                    const getTypeLabel = (type: string) => {
                      switch (type) {
                        case "dealership_enquiry":
                          return "🏢 Dealer Application";
                        case "contact_message":
                          return "✉️ Support Message";
                        case "scooter_enquiry":
                        default:
                          return "🛵 Booking Enquiry";
                      }
                    };

                    // Sanitize customer phone numbers for WhatsApp integration 
                    const cleanPhone = (item.phone || "").replace(/\D/g, "");
                    const formattedPhoneForWa = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;

                    return (
                      <React.Fragment key={item.id}>
                        <tr className={`hover:bg-gray-50/50 transition-colors ${item.status === "New" ? "bg-orange-50/10 font-medium" : ""}`}>
                          {/* Name */}
                          <td className="py-4 px-6 font-bold text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-brand-blue/5 text-brand-blue flex items-center justify-center font-bold text-xs">
                                {item.name ? item.name.charAt(0).toUpperCase() : "C"}
                              </div>
                              <span className="truncate max-w-[150px]" title={item.name}>{item.name}</span>
                            </div>
                          </td>

                          {/* Contact Info */}
                          <td className="py-4 px-6">
                            <div className="space-y-0.5">
                              <p className="font-semibold text-brand-blue flex items-center gap-1">
                                <Phone size={11} className="text-gray-400 shrink-0" />
                                {item.phone}
                              </p>
                              <p className="text-gray-500 font-mono text-[10px] flex items-center gap-1">
                                <MapPin size={10} className="text-gray-400 shrink-0" />
                                {item.city || "Not Specified"}
                              </p>
                            </div>
                          </td>

                          {/* Type badge */}
                          <td className="py-4 px-6">
                            <span className="text-[10px] font-bold text-brand-blue bg-brand-green/20 py-1 px-2.5 rounded-md border border-brand-green/30 select-none whitespace-nowrap">
                              {getTypeLabel(item.type)}
                            </span>
                          </td>

                          {/* Scooter Model */}
                          <td className="py-4 px-6 font-bold text-brand-blue">
                            {item.model || "—"}
                          </td>

                          {/* Message Remarks */}
                          <td className="py-4 px-6 max-w-[250px]">
                            <div className="truncate text-gray-600 italic hover:text-gray-900 transition-colors cursor-help" title={item.message || "No message left"}>
                              {item.message || "No remarks left."}
                            </div>
                          </td>

                          {/* Status update selector dropdown */}
                          <td className="py-4 px-6">
                            <select 
                              value={item.status || "New"}
                              onChange={(e) => updateStatus(item.id!, e.target.value as Inquiry['status'])}
                              className={`text-[11px] font-bold py-1 px-2 rounded-lg border focus:outline-hidden cursor-pointer ${getStatusStyles(item.status || "New")}`}
                            >
                              <option value="New">Set New</option>
                              <option value="Contacted">Set Contacted</option>
                              <option value="In Progress">Set In Progress</option>
                              <option value="Closed">Set Closed</option>
                            </select>
                          </td>

                          {/* Date format */}
                          <td className="py-4 px-6 text-gray-400 font-mono text-[11px] whitespace-nowrap">
                            {dateString}
                          </td>

                          {/* Quick actions (call, wa, annotation switch, trash) */}
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a 
                                href={`https://wa.me/${formattedPhoneForWa}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="bg-[#25D366] text-white p-2 rounded-lg hover:scale-105 transition-transform shrink-0"
                                title="Quick WhatsApp Chat"
                              >
                                <MessageSquare size={13} />
                              </a>
                              
                              <a 
                                href={`tel:${item.phone}`}
                                className="bg-brand-blue text-white p-2 rounded-lg hover:scale-105 transition-transform shrink-0"
                                title="Direct CALL"
                              >
                                <Phone size={13} />
                              </a>

                              <button 
                                type="button"
                                onClick={() => startEditingNote(item)}
                                className={`p-2 rounded-lg text-xs font-bold transition-colors shrink-0 ${item.notes ? "bg-amber-100 text-amber-800" : "bg-gray-100 hover:bg-gray-200 text-gray-600"}`}
                                title={item.notes ? "Edit Follow-up note" : "Annotate notes"}
                              >
                                <Clipboard size={13} />
                              </button>

                              <button 
                                type="button"
                                onClick={() => deleteInquiry(item.id!)}
                                className="bg-red-50 text-red-600 hover:bg-red-100 p-2 rounded-lg transition-colors shrink-0"
                                title="Delete Inquiry"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Inline Editing Notes row expansion if activeNoteId matches */}
                        {activeNoteId === item.id && (
                          <tr className="bg-amber-50/40">
                            <td colSpan={8} className="py-3 px-6 border-b border-gray-100">
                              <div className="flex items-center gap-3 w-full">
                                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 font-sans shrink-0">Annotation Note:</span>
                                <input 
                                  type="text"
                                  placeholder="Type lead follow-up notes here (e.g., 'Advised loan partners', 'Callbacks tomorrow')..."
                                  value={noteText}
                                  onChange={(e) => setNoteText(e.target.value)}
                                  className="flex-grow bg-white border border-amber-300 rounded-lg px-4 py-2 text-xs text-brand-blue font-medium focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-hidden"
                                />
                                <button 
                                  type="button"
                                  onClick={() => saveNote(item.id!)}
                                  className="bg-brand-green text-brand-blue px-3 py-2 rounded-lg text-xs font-bold shrink-0 hover:opacity-95"
                                >
                                  Save Note
                                </button>
                                <button 
                                  type="button"
                                  onClick={() => setActiveNoteId(null)}
                                  className="bg-gray-200 text-gray-650 px-3 py-2 rounded-lg text-xs shrink-0 hover:bg-gray-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}

                        {/* Non-editing Notes row footprint if notes exist but we are not currently editing */}
                        {activeNoteId !== item.id && item.notes && (
                          <tr className="bg-amber-50/10">
                            <td colSpan={8} className="py-2.5 px-6 border-b border-gray-100 text-[11px] text-gray-500">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold uppercase text-[9px] tracking-wider text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">Notes:</span>
                                <span className="italic font-medium text-gray-700">{item.notes}</span>
                                <button 
                                  type="button"
                                  onClick={() => startEditingNote(item)}
                                  className="text-brand-blue font-bold text-[10px] hover:underline ml-1"
                                >
                                  (Edit Notes)
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedInquiries.map((item) => {
                const dateString = item.created_at ? new Date(item.created_at).toLocaleString() : "Unknown date";
                
                // Define colored badges based on state
                const getStatusStyles = (status: Inquiry['status'] | string) => {
                  switch (status) {
                    case "Closed":
                      return "bg-green-100 text-green-800 border-green-200";
                    case "In Progress":
                    case "Contacted":
                      return "bg-blue-100 text-blue-800 border-blue-200";
                    case "New":
                    default:
                      return "bg-orange-100 text-orange-850 border-orange-200";
                  }
                };

                const getTypeLabel = (type: string) => {
                  switch (type) {
                    case "dealership_enquiry":
                      return "🏢 Partnership Application";
                    case "contact_message":
                      return "✉️ Support Message";
                    case "scooter_enquiry":
                    default:
                      return "🛵 Scooter Booking";
                  }
                };

                // Sanitize customer phone numbers for WhatsApp integration 
                const cleanPhone = (item.phone || "").replace(/\D/g, "");
                const formattedPhoneForWa = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;

                return (
                  <div 
                    key={item.id} 
                    className={`bg-white rounded-[2rem] p-6 shadow-xs border ${item.status === "New" ? "border-l-4 border-l-orange-500" : "border-gray-100"} hover:shadow-md transition-all space-y-6`}
                  >
                    {/* Top Row: Type, Status, Date */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-50">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-black uppercase tracking-wider text-brand-blue bg-brand-green/20 py-1.5 px-3 rounded-lg border border-brand-green/30">
                          {getTypeLabel(item.type)}
                        </span>
                        <span className="text-gray-400 text-xs font-medium font-mono">{dateString}</span>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <span className={`text-xs font-bold py-1 px-3 rounded-full border ${getStatusStyles(item.status || "New")}`}>
                          {item.status || "New"}
                        </span>
                        
                        {/* Interactive dropdown to dynamically change status */}
                        <select 
                          value={item.status || "New"}
                          onChange={(e) => updateStatus(item.id!, e.target.value as Inquiry['status'])}
                          className="bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-brand-blue px-2.5 py-1.5 focus:outline-hidden"
                        >
                          <option value="New">Set to New</option>
                          <option value="Contacted">Set to Contacted</option>
                          <option value="In Progress">Set to In Progress</option>
                          <option value="Closed">Set to Closed</option>
                        </select>
                      </div>
                    </div>

                    {/* Context grid containing client info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Customer Info */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-brand-blue">
                          <User size={18} className="shrink-0 opacity-60" />
                          <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Customer</p>
                            <p className="font-bold text-lg leading-tight">{item.name}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-brand-blue">
                          <Phone size={18} className="shrink-0 opacity-60" />
                          <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Contact Phone</p>
                            <p className="font-semibold">{item.phone}</p>
                          </div>
                        </div>
                      </div>

                      {/* Scooter & City */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-brand-blue">
                          <Database size={18} className="shrink-0 opacity-60" />
                          <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Scooter / Context</p>
                            <p className="font-bold text-base">{item.model || "Not Specified"}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-brand-blue">
                          <MapPin size={18} className="shrink-0 opacity-60" />
                          <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">City Location</p>
                            <p className="font-medium text-gray-700">{item.city || "Not Specified"}</p>
                          </div>
                        </div>
                      </div>

                      {/* Remarks details */}
                      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col justify-between">
                        <div>
                          <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Customer Remarks</p>
                          <p className="text-sm text-gray-650 leading-relaxed italic">{item.message || "No remarks left."}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions Bar & Internal note editing */}
                    <div className="pt-4 border-t border-gray-50 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      {/* Left: Contact actions */}
                      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                        <a 
                          href={`https://wa.me/${formattedPhoneForWa}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex-1 lg:flex-initial bg-[#25D366] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                        >
                          <MessageSquare size={14} />
                          WhatsApp Chat
                        </a>
                        
                        <a 
                          href={`tel:${item.phone}`}
                          className="flex-1 lg:flex-initial bg-brand-blue text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                        >
                          <Phone size={14} />
                          Direct Call
                        </a>

                        <button 
                          onClick={() => deleteInquiry(item.id!)}
                          className="bg-red-50 text-red-600 hover:bg-red-100 p-2.5 rounded-xl transition-colors"
                          title="Delete record"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Right: Notes engine */}
                      <div className="w-full lg:w-96">
                        {activeNoteId === item.id ? (
                          <div className="flex gap-2">
                            <input 
                              type="text"
                              placeholder="Type internal follow-up notes..."
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              className="flex-grow bg-gray-55 border border-brand-green rounded-xl px-4 py-2 text-xs focus:outline-hidden text-brand-blue font-medium"
                            />
                            <button 
                              onClick={() => saveNote(item.id!)}
                              className="bg-brand-green text-brand-blue px-3 py-2 rounded-xl text-xs font-bold"
                            >
                              Save
                            </button>
                            <button 
                              onClick={() => setActiveNoteId(null)}
                              className="bg-gray-100 text-gray-500 px-3 py-2 rounded-xl text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center bg-gray-100/50 hover:bg-gray-100 border border-gray-200/50 px-4 py-2.5 rounded-xl">
                            <div className="truncate text-xs text-gray-600 mr-2">
                              <span className="font-bold text-brand-blue uppercase text-[10px] tracking-wider block">Internal Notes:</span>
                              <span className="italic font-medium">{item.notes || "Not annotated yet. Spoke to them?"}</span>
                            </div>
                            <button 
                              onClick={() => startEditingNote(item)}
                              className="text-[11px] text-brand-blue font-bold tracking-tight hover:underline shrink-0"
                            >
                              {item.notes ? "Edit" : "Annotate"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )
        )}

      </div>
    </div>
  );
}
