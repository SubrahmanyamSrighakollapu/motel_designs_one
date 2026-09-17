"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  CalendarCheck,
  BedDouble,
  Mail,
  Newspaper,
  Users,
  Settings,
  Search,
  Plus,
  Bell,
  LogOut,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  DollarSign,
  UserCheck,
  Inbox,
  Eye,
  Edit,
  CheckCircle2,
  AlertCircle,
  X,
  Download,
  Filter,
  RefreshCw,
  Sparkles,
  Building2
} from 'lucide-react';

// Sample Mock Data
const MOCK_STATS = {
  occupancyRate: '92%',
  monthlyRevenue: '$48,250',
  activeStays: 8,
  totalUnits: 9,
  unreadMessages: 3,
  avgStayNights: 3.2,
};

const MOCK_ROOM_UNITS = [
  { id: 101, type: 'Oceanfront Terrace', unitName: 'Unit 101', status: 'Occupied', guest: 'Sarah Jenkins', rate: 420 },
  { id: 102, type: 'Oceanfront Terrace', unitName: 'Unit 102', status: 'Occupied', guest: 'Mark Robinson', rate: 420 },
  { id: 201, type: 'King Bedroom', unitName: 'Unit 201', status: 'Occupied', guest: 'David & Clara Miller', rate: 310 },
  { id: 202, type: 'King Bedroom', unitName: 'Unit 202', status: 'Available', guest: '—', rate: 310 },
  { id: 203, type: 'King Bedroom', unitName: 'Unit 203', status: 'Occupied', guest: 'Elena Rostova', rate: 310 },
  { id: 301, type: 'Twin Room', unitName: 'Unit 301', status: 'Occupied', guest: 'The Baxter Family', rate: 290 },
  { id: 302, type: 'Twin Room', unitName: 'Unit 302', status: 'Occupied', guest: 'Liam Vance', rate: 290 },
  { id: 401, type: 'Garden Room', unitName: 'Unit 401', status: 'Occupied', guest: 'Hannah Wright', rate: 260 },
  { id: 402, type: 'Garden Room', unitName: 'Unit 402', status: 'Maintenance', guest: '—', rate: 260 },
];

const INITIAL_BOOKINGS = [
  {
    reference: 'MH-8F2A109C',
    guestName: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+61 412 889 012',
    roomName: 'Oceanfront Terrace (Unit 101)',
    checkIn: '2026-09-15',
    checkOut: '2026-09-19',
    nights: 4,
    guests: 2,
    total: 1680,
    status: 'Checked-In',
  },
  {
    reference: 'MH-3B7D4411',
    guestName: 'Mark Robinson',
    email: 'm.robinson@example.com',
    phone: '+61 401 554 990',
    roomName: 'Oceanfront Terrace (Unit 102)',
    checkIn: '2026-09-16',
    checkOut: '2026-09-20',
    nights: 4,
    guests: 2,
    total: 1680,
    status: 'Checked-In',
  },
  {
    reference: 'MH-9C1108FE',
    guestName: 'David & Clara Miller',
    email: 'dclaramiller@example.com',
    phone: '+61 422 100 488',
    roomName: 'King Bedroom (Unit 201)',
    checkIn: '2026-09-17',
    checkOut: '2026-09-21',
    nights: 4,
    guests: 2,
    total: 1240,
    status: 'Checked-In',
  },
  {
    reference: 'MH-1488BE02',
    guestName: 'Arthur & Penny Dent',
    email: 'arthur.dent@example.com',
    phone: '+61 405 889 123',
    roomName: 'King Bedroom (Unit 202)',
    checkIn: '2026-09-22',
    checkOut: '2026-09-25',
    nights: 3,
    guests: 2,
    total: 930,
    status: 'Confirmed',
  },
  {
    reference: 'MH-771B04DD',
    guestName: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '+61 433 911 204',
    roomName: 'King Bedroom (Unit 203)',
    checkIn: '2026-09-14',
    checkOut: '2026-09-18',
    nights: 4,
    guests: 1,
    total: 1240,
    status: 'Checked-In',
  },
  {
    reference: 'MH-5201A990',
    guestName: 'The Baxter Family',
    email: 'baxter.stay@example.com',
    phone: '+61 418 300 219',
    roomName: 'Twin Room (Unit 301)',
    checkIn: '2026-09-16',
    checkOut: '2026-09-22',
    nights: 6,
    guests: 4,
    total: 1740,
    status: 'Checked-In',
  },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    name: 'Oliver Thorne',
    email: 'oliver.t@coastalvoyage.com',
    subject: 'Late check-in query for Oceanfront Terrace',
    message: 'Hello Marea House team, we will be arriving around 9:30 PM this Friday due to flight schedules. Is late key pickup available?',
    date: '2026-09-17 14:20',
    status: 'Unread',
  },
  {
    id: 2,
    name: 'Jessica Vance',
    email: 'jess.vance@example.com',
    subject: 'Surfing equipment rental recommendations',
    message: 'Hi there! We have booked Unit 201 for next weekend. Could you recommend the best local board hire near the motel?',
    date: '2026-09-16 09:45',
    status: 'Unread',
  },
  {
    id: 3,
    name: 'Captain Robert Hayes',
    email: 'rhayes@marinaservices.com.au',
    subject: 'Group booking query for November weekend',
    message: 'Looking to reserve 4 rooms for a family reunion weekend in early November. Do you offer corporate or group packages?',
    date: '2026-09-15 17:10',
    status: 'Unread',
  },
  {
    id: 4,
    name: 'Chloe Bennett',
    email: 'chloe.b@designstudio.io',
    subject: 'Photography session request',
    message: 'We loved the imagery of your courtyard. Is it possible to host a small quiet editorial photo session during our stay?',
    date: '2026-09-14 11:30',
    status: 'Read',
  },
];

const INITIAL_JOURNAL = [
  {
    id: 1,
    slug: 'morning-tide',
    title: 'Morning tide & ocean air',
    category: 'Coastal Living',
    date: 'September 2026',
    status: 'Published',
    intro: 'How early light and salt water shape our daily routine at Marea House.',
  },
  {
    id: 2,
    slug: 'coastal-flavours',
    title: 'Local flavours & seaside dining',
    category: 'Food & Drink',
    date: 'August 2026',
    status: 'Published',
    intro: 'Our guide to fresh seafood, beachside coffee and slow dining.',
  },
  {
    id: 3,
    slug: 'scenic-trails',
    title: 'Scenic coastal walks from Marea House',
    category: 'Guide',
    date: 'July 2026',
    status: 'Published',
    intro: 'Four headland trails for morning walks and sunset views.',
  },
];

const INITIAL_SUBSCRIBERS = [
  { email: 'coastal.wanderer@gmail.com', date: '2026-09-17', status: 'Active' },
  { email: 'clara.design@studio.co', date: '2026-09-16', status: 'Active' },
  { email: 'steven.m@oceanfront.io', date: '2026-09-14', status: 'Active' },
  { email: 'hannah.travels@lifestyle.com', date: '2026-09-12', status: 'Active' },
  { email: 'markus.b@surfnet.com.au', date: '2026-09-10', status: 'Active' },
  { email: 'info@australiancoasts.org', date: '2026-09-08', status: 'Active' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'rooms' | 'messages' | 'cms' | 'subscribers' | 'settings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState<typeof INITIAL_BOOKINGS[0] | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<typeof INITIAL_MESSAGES[0] | null>(null);
  const [replyText, setReplyText] = useState('');
  const [editRateModal, setEditRateModal] = useState<{ id: number; unitName: string; type: string; rate: number } | null>(null);
  const [newRateValue, setNewRateValue] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filtered Bookings
  const filteredBookings = INITIAL_BOOKINGS.filter((b) => {
    const matchesSearch =
      b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="admin-app-layout">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <Link href="/" className="monogram admin-monogram">
            M<span>H</span>
          </Link>
          <div className="brand-text">
            <span className="brand-title">Marea House</span>
            <span className="brand-sub">Admin CMS v1.0</span>
          </div>
        </div>

        <nav className="admin-nav" aria-label="CMS Navigation">
          <button
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <CalendarCheck size={18} />
            <span>Bookings & Stays</span>
            <span className="nav-badge">6</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'rooms' ? 'active' : ''}`}
            onClick={() => setActiveTab('rooms')}
          >
            <BedDouble size={18} />
            <span>Room Inventory</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <Mail size={18} />
            <span>Guest Messages</span>
            <span className="nav-badge coral">3</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'cms' ? 'active' : ''}`}
            onClick={() => setActiveTab('cms')}
          >
            <Newspaper size={18} />
            <span>Journal & Content</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'subscribers' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscribers')}
          >
            <Users size={18} />
            <span>Subscribers</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} />
            <span>Property Settings</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="user-avatar">MH</div>
            <div>
              <p className="user-name">Manager</p>
              <p className="user-role">Property Administrator</p>
            </div>
          </div>
          <Link href="/admin/login" className="admin-logout-btn" title="Sign out">
            <LogOut size={16} />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Top Header Chrome */}
        <header className="admin-topbar">
          <div className="topbar-search">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search reservations, guest names, or reference codes…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="topbar-actions">
            <button
              className="topbar-icon-btn"
              onClick={() => showToast('No new system alerts.')}
              title="Notifications"
            >
              <Bell size={18} />
              <span className="dot-badge" />
            </button>

            <Link href="/" target="_blank" className="button small admin-view-site-btn">
              View Guest Site <ExternalLink size={14} />
            </Link>
          </div>
        </header>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="admin-tab-content">
            <div className="tab-header">
              <div>
                <h2>Property Overview</h2>
                <p>Real-time metrics and occupancy status for Marea House.</p>
              </div>
              <button
                className="button small"
                onClick={() => {
                  setActiveTab('bookings');
                  showToast('Opened Bookings manager');
                }}
              >
                <Plus size={15} /> New Reservation
              </button>
            </div>

            {/* KPI Cards Grid */}
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-title">Occupancy Rate</span>
                  <div className="kpi-icon navy">
                    <UserCheck size={20} />
                  </div>
                </div>
                <div className="kpi-value">{MOCK_STATS.occupancyRate}</div>
                <div className="kpi-trend positive">
                  <TrendingUp size={14} /> +4.2% from last month
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-title">Monthly Revenue</span>
                  <div className="kpi-icon coral">
                    <DollarSign size={20} />
                  </div>
                </div>
                <div className="kpi-value">{MOCK_STATS.monthlyRevenue} <small>AUD</small></div>
                <div className="kpi-trend positive">
                  <TrendingUp size={14} /> +12% target pace
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-title">Active Stays</span>
                  <div className="kpi-icon ink">
                    <BedDouble size={20} />
                  </div>
                </div>
                <div className="kpi-value">{MOCK_STATS.activeStays} / {MOCK_STATS.totalUnits} <small>units</small></div>
                <div className="kpi-trend">
                  Avg length of stay: {MOCK_STATS.avgStayNights} nights
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-title">Unread Messages</span>
                  <div className="kpi-icon alert">
                    <Inbox size={20} />
                  </div>
                </div>
                <div className="kpi-value">{MOCK_STATS.unreadMessages}</div>
                <button className="kpi-action-link" onClick={() => setActiveTab('messages')}>
                  Open Inbox &rarr;
                </button>
              </div>
            </div>

            {/* Room Units Occupancy Grid */}
            <div className="admin-section-box">
              <div className="section-box-header">
                <div>
                  <h3>Live Unit Occupancy Matrix</h3>
                  <p>9 physical room units across 4 room categories.</p>
                </div>
                <div className="matrix-legend">
                  <span className="legend-item"><span className="dot occupied" /> Occupied (8)</span>
                  <span className="legend-item"><span className="dot available" /> Available (1)</span>
                  <span className="legend-item"><span className="dot maintenance" /> Maintenance (1)</span>
                </div>
              </div>

              <div className="units-grid">
                {MOCK_ROOM_UNITS.map((unit) => (
                  <div
                    key={unit.id}
                    className={`unit-card ${unit.status.toLowerCase()}`}
                    onClick={() => {
                      if (unit.status === 'Occupied') {
                        const b = INITIAL_BOOKINGS.find((x) => x.guestName === unit.guest);
                        if (b) setSelectedBooking(b);
                      }
                    }}
                  >
                    <div className="unit-card-top">
                      <span className="unit-number">{unit.unitName}</span>
                      <span className={`status-pill ${unit.status.toLowerCase()}`}>{unit.status}</span>
                    </div>
                    <p className="unit-type">{unit.type}</p>
                    <div className="unit-card-bottom">
                      <span className="unit-guest">{unit.guest !== '—' ? unit.guest : 'Vacant'}</span>
                      <span className="unit-rate">${unit.rate}/n</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Stays Table */}
            <div className="admin-section-box">
              <div className="section-box-header">
                <h3>Recent Guest Reservations</h3>
                <button className="text-link" onClick={() => setActiveTab('bookings')}>
                  View all bookings &rarr;
                </button>
              </div>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Reference</th>
                      <th>Guest</th>
                      <th>Room Unit</th>
                      <th>Dates</th>
                      <th>Total (AUD)</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INITIAL_BOOKINGS.slice(0, 5).map((b) => (
                      <tr key={b.reference}>
                        <td className="font-mono">{b.reference}</td>
                        <td>
                          <strong>{b.guestName}</strong>
                          <br />
                          <small>{b.email}</small>
                        </td>
                        <td>{b.roomName}</td>
                        <td>
                          {b.checkIn} to {b.checkOut}
                          <br />
                          <small>{b.nights} nights · {b.guests} guests</small>
                        </td>
                        <td><strong>${b.total}</strong></td>
                        <td>
                          <span className={`status-pill ${b.status.toLowerCase().replace(' ', '-')}`}>
                            {b.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="admin-table-action"
                            onClick={() => setSelectedBooking(b)}
                          >
                            <Eye size={16} /> Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="admin-tab-content">
            <div className="tab-header">
              <div>
                <h2>Reservations & Guest Stays</h2>
                <p>Manage, inspect, and confirm guest bookings.</p>
              </div>
              <button
                className="button small"
                onClick={() => showToast('Simulated reservation created.')}
              >
                <Plus size={15} /> Add Manual Booking
              </button>
            </div>

            {/* Filters Bar */}
            <div className="admin-filters-bar">
              <div className="filter-group">
                <Filter size={16} />
                <span>Filter by Status:</span>
                {['All', 'Checked-In', 'Confirmed'].map((st) => (
                  <button
                    key={st}
                    className={`filter-btn ${statusFilter === st ? 'active' : ''}`}
                    onClick={() => setStatusFilter(st)}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button className="filter-reset-btn" onClick={() => { setStatusFilter('All'); setSearchQuery(''); }}>
                <RefreshCw size={14} /> Reset
              </button>
            </div>

            {/* Main Bookings Table */}
            <div className="admin-section-box">
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Ref Code</th>
                      <th>Guest Details</th>
                      <th>Room & Unit</th>
                      <th>Check-In / Out</th>
                      <th>Nights</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((b) => (
                      <tr key={b.reference}>
                        <td className="font-mono"><strong>{b.reference}</strong></td>
                        <td>
                          <span className="table-guest-name">{b.guestName}</span>
                          <span className="table-guest-sub">{b.email}</span>
                          <span className="table-guest-sub">{b.phone}</span>
                        </td>
                        <td>{b.roomName}</td>
                        <td>
                          {b.checkIn} &rarr; {b.checkOut}
                        </td>
                        <td>{b.nights} n</td>
                        <td><strong>${b.total} AUD</strong></td>
                        <td>
                          <span className={`status-pill ${b.status.toLowerCase().replace(' ', '-')}`}>
                            {b.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="admin-table-action"
                            onClick={() => setSelectedBooking(b)}
                          >
                            <Eye size={15} /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ROOM INVENTORY */}
        {activeTab === 'rooms' && (
          <div className="admin-tab-content">
            <div className="tab-header">
              <div>
                <h2>Room Inventory & Rate Management</h2>
                <p>Configure room types, physical units, capacities and nightly AUD rates.</p>
              </div>
            </div>

            <div className="room-types-grid">
              {[
                { name: 'Oceanfront Terrace', unitsCount: 2, capacity: 2, price: 420, slug: 'oceanfront-terrace' },
                { name: 'King Bedroom', unitsCount: 3, capacity: 2, price: 310, slug: 'king-bedroom' },
                { name: 'Twin Room', unitsCount: 2, capacity: 4, price: 290, slug: 'twin-room' },
                { name: 'Garden Suite', unitsCount: 2, capacity: 2, price: 260, slug: 'garden-suite' },
              ].map((rt) => (
                <div key={rt.slug} className="room-type-admin-card">
                  <div className="card-top">
                    <h3>{rt.name}</h3>
                    <span className="rate-badge">${rt.price} AUD / night</span>
                  </div>
                  <p className="card-meta">
                    {rt.unitsCount} physical units · Max {rt.capacity} guests per unit
                  </p>
                  <div className="card-actions">
                    <button
                      className="button small outline"
                      onClick={() => {
                        setEditRateModal({ id: 1, unitName: rt.name, type: rt.name, rate: rt.price });
                        setNewRateValue(rt.price);
                      }}
                    >
                      <Edit size={14} /> Edit Nightly Rate
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="admin-section-box" style={{ marginTop: 24 }}>
              <h3>Physical Units Status List</h3>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Unit</th>
                      <th>Room Category</th>
                      <th>Current Status</th>
                      <th>Nightly Rate</th>
                      <th>Quick Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ROOM_UNITS.map((u) => (
                      <tr key={u.id}>
                        <td><strong>{u.unitName}</strong></td>
                        <td>{u.type}</td>
                        <td>
                          <span className={`status-pill ${u.status.toLowerCase()}`}>
                            {u.status}
                          </span>
                        </td>
                        <td>${u.rate} AUD</td>
                        <td>
                          <button
                            className="admin-table-action"
                            onClick={() => showToast(`Status toggled for ${u.unitName}`)}
                          >
                            Toggle Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GUEST MESSAGES */}
        {activeTab === 'messages' && (
          <div className="admin-tab-content">
            <div className="tab-header">
              <div>
                <h2>Guest Enquiries & Messages</h2>
                <p>Inbound enquiries submitted through the Marea House contact form.</p>
              </div>
            </div>

            <div className="messages-layout">
              <div className="messages-list-panel">
                {INITIAL_MESSAGES.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message-item ${selectedMessage?.id === msg.id ? 'active' : ''} ${
                      msg.status === 'Unread' ? 'unread' : ''
                    }`}
                    onClick={() => {
                      setSelectedMessage(msg);
                      msg.status = 'Read';
                    }}
                  >
                    <div className="msg-header">
                      <strong>{msg.name}</strong>
                      <span className="msg-date">{msg.date}</span>
                    </div>
                    <p className="msg-subject">{msg.subject}</p>
                    <p className="msg-snippet">{msg.message.slice(0, 70)}…</p>
                  </div>
                ))}
              </div>

              <div className="message-detail-panel">
                {selectedMessage ? (
                  <div className="message-reader">
                    <div className="reader-header">
                      <div>
                        <h3>{selectedMessage.subject}</h3>
                        <p className="reader-sender">
                          From: <strong>{selectedMessage.name}</strong> &lt;{selectedMessage.email}&gt;
                        </p>
                      </div>
                      <span className="reader-date">{selectedMessage.date}</span>
                    </div>

                    <div className="reader-body">
                      <p>{selectedMessage.message}</p>
                    </div>

                    <div className="reader-reply-box">
                      <h4>Compose Reply</h4>
                      <textarea
                        rows={4}
                        placeholder="Type your response to the guest…"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div className="reply-actions">
                        <button
                          className="button small"
                          onClick={() => {
                            if (!replyText.trim()) return showToast('Please enter a reply message.');
                            showToast(`Reply sent to ${selectedMessage.email}`);
                            setReplyText('');
                          }}
                        >
                          Send Response Email
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="reader-empty">
                    <Inbox size={40} />
                    <p>Select a message from the list to view details and send a response.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CMS & JOURNAL */}
        {activeTab === 'cms' && (
          <div className="admin-tab-content">
            <div className="tab-header">
              <div>
                <h2>Journal & Website Content CMS</h2>
                <p>Manage stories, articles, and marketing imagery for the guest portal.</p>
              </div>
              <button
                className="button small"
                onClick={() => showToast('New story editor initialized.')}
              >
                <Plus size={15} /> Write New Story
              </button>
            </div>

            <div className="admin-section-box">
              <h3>Published Journal Stories</h3>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Publish Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INITIAL_JOURNAL.map((j) => (
                      <tr key={j.id}>
                        <td><strong>{j.title}</strong></td>
                        <td>{j.category}</td>
                        <td>{j.date}</td>
                        <td>
                          <span className="status-pill confirmed">{j.status}</span>
                        </td>
                        <td>
                          <button
                            className="admin-table-action"
                            onClick={() => showToast(`Editing "${j.title}"`)}
                          >
                            <Edit size={14} /> Edit Story
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SUBSCRIBERS */}
        {activeTab === 'subscribers' && (
          <div className="admin-tab-content">
            <div className="tab-header">
              <div>
                <h2>Newsletter Subscribers</h2>
                <p>Guests and subscribers subscribed to coastal news and offers.</p>
              </div>
              <button
                className="button small"
                onClick={() => showToast('Exporting subscribers CSV…')}
              >
                <Download size={15} /> Export CSV List
              </button>
            </div>

            <div className="admin-section-box">
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Subscriber Email</th>
                      <th>Subscription Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INITIAL_SUBSCRIBERS.map((sub) => (
                      <tr key={sub.email}>
                        <td><strong>{sub.email}</strong></td>
                        <td>{sub.date}</td>
                        <td>
                          <span className="status-pill confirmed">{sub.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="admin-tab-content">
            <div className="tab-header">
              <div>
                <h2>Property & CMS Settings</h2>
                <p>Manage motel contact info, timezone, and operational policies.</p>
              </div>
              <button
                className="button small"
                onClick={() => showToast('Property settings saved successfully.')}
              >
                Save Settings
              </button>
            </div>

            <div className="settings-form-panel">
              <div className="form-grid">
                <div>
                  <label>Property Name</label>
                  <input type="text" defaultValue="Marea House — Coastal Motel" />
                </div>
                <div>
                  <label>Timezone</label>
                  <input type="text" defaultValue="Australia/Sydney" />
                </div>
                <div>
                  <label>Contact Phone</label>
                  <input type="text" defaultValue="+61 2 4900 1122" />
                </div>
                <div>
                  <label>Contact Email</label>
                  <input type="email" defaultValue="stay@mareahouse.com" />
                </div>
                <div>
                  <label>Standard Check-In Time</label>
                  <input type="text" defaultValue="3:00 PM" />
                </div>
                <div>
                  <label>Standard Check-Out Time</label>
                  <input type="text" defaultValue="11:00 AM" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Booking Details Drawer Modal */}
      {selectedBooking && (
        <div className="admin-modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reservation Details</h3>
              <button className="close-btn" onClick={() => setSelectedBooking(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="label">Reference Code</span>
                <span className="val font-mono"><strong>{selectedBooking.reference}</strong></span>
              </div>
              <div className="detail-row">
                <span className="label">Guest Name</span>
                <span className="val">{selectedBooking.guestName}</span>
              </div>
              <div className="detail-row">
                <span className="label">Email & Phone</span>
                <span className="val">{selectedBooking.email} <br /> {selectedBooking.phone}</span>
              </div>
              <div className="detail-row">
                <span className="label">Room Unit</span>
                <span className="val">{selectedBooking.roomName}</span>
              </div>
              <div className="detail-row">
                <span className="label">Check-In / Out</span>
                <span className="val">{selectedBooking.checkIn} to {selectedBooking.checkOut} ({selectedBooking.nights} nights)</span>
              </div>
              <div className="detail-row">
                <span className="label">Total Amount</span>
                <span className="val"><strong>${selectedBooking.total} AUD</strong></span>
              </div>
              <div className="detail-row">
                <span className="label">Status</span>
                <span className={`status-pill ${selectedBooking.status.toLowerCase().replace(' ', '-')}`}>
                  {selectedBooking.status}
                </span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="button small" onClick={() => { showToast('Printed booking voucher.'); setSelectedBooking(null); }}>
                Print Voucher
              </button>
              <button className="button small outline" onClick={() => setSelectedBooking(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Nightly Rate Modal */}
      {editRateModal && (
        <div className="admin-modal-overlay" onClick={() => setEditRateModal(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Update Nightly Rate</h3>
              <button className="close-btn" onClick={() => setEditRateModal(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p>Adjust base nightly AUD rate for <strong>{editRateModal.type}</strong>.</p>
              <div className="admin-input-group" style={{ marginTop: 15 }}>
                <label>Nightly Rate (AUD $)</label>
                <input
                  type="number"
                  value={newRateValue}
                  onChange={(e) => setNewRateValue(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="button small"
                onClick={() => {
                  showToast(`Nightly rate updated to $${newRateValue} AUD.`);
                  setEditRateModal(null);
                }}
              >
                Save Rate
              </button>
              <button className="button small outline" onClick={() => setEditRateModal(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
