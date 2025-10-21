import { useState, useEffect, useRef } from 'react';
// import '../../src/HomePage.css';
import './Homepage.css';

// Import images
import Banner1 from '../../src/assets/images/Banner_1.png';
import Banner2 from '../../src/assets/images/Banner_2.png';
import Banner3 from '../../src/assets/images/Banner_3.png';
import Banner4 from '../../src/assets/images/Banner_4.jpg';
import LogoGroup from '../../src/assets/images/Logo_Group.png';

// Import tutor images
import TutorMinh from '../../src/assets/tutors/tutorMinh.png';
import TutorHa from '../../src/assets/tutors/tutorHa.png';
import TutorAnh from '../../src/assets/tutors/tutorAnh.png';
import TutorPhuong from '../../src/assets/tutors/tutorPhuong.png';
import TutorDuy from '../../src/assets/tutors/tutorDuy.png';
import TutorLinh from '../../src/assets/tutors/tutorLinh.jpg';

const Homepage = () => {
  // Banner carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Course catalog state
  const [activeCategory, setActiveCategory] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  
  // Trial form state
  const [trialForm, setTrialForm] = useState({
    name: '',
    phone: '',
    subject: '',
    grade: '',
    mode: '',
    scheduleDate: '',
    scheduleSlot: '',
    note: ''
  });
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  
  // Request form state
  const [requestForm, setRequestForm] = useState({
    name: '',
    phone: '',
    subject: '',
    grade: '',
    location: '',
    budget: '',
    time_preference: '',
    note: ''
  });
  const [requestTimePickerOpen, setRequestTimePickerOpen] = useState(false);
  const [requestDate, setRequestDate] = useState('');
  const [requestTime, setRequestTime] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const banners = [Banner1, Banner2, Banner3, Banner4];
  const hideTimerRef = useRef(null);
  const autoPlayTimerRef = useRef(null);

  // Banner auto-play effect
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % banners.length);
      }, 5000);
    }
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying, banners.length]);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerOpen && !e.target.closest('.picker')) {
        setPickerOpen(false);
      }
      if (requestTimePickerOpen && !e.target.closest('.picker')) {
        setRequestTimePickerOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [pickerOpen, requestTimePickerOpen]);

  // Course categories
  const categories = [
    { id: 'daihoc', label: 'Đại học - Cao đẳng' },
    { id: 'hsgioi', label: 'Bồi dưỡng học sinh giỏi' },
    { id: 'ltdh', label: 'Luyện thi đại học' },
    { id: 'thpt', label: 'THPT (Lớp 10 - 11 - 12)' },
    { id: 'vao10', label: 'Luyện thi vào 10' },
    { id: 'thcs', label: 'THCS (Lớp 6 - 7 - 8 - 9)' },
    { id: 'tieu-hoc', label: 'Tiểu học (Lớp 1 - 2 - 3 - 4 - 5)' },
    { id: 'ngoaingu', label: 'Ngoại ngữ' }
  ];

  // Generate next 7 days
  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit' });
  };

  const toISO = (date) => {
    return date.toISOString().slice(0, 10);
  };

  const timeSlots = ['07–09h', '09–11h', '13–15h', '15–17h', '19–21h'];

  const handleCategoryHover = (categoryId) => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    setActiveCategory(categoryId);
    setShowPanel(true);
  };

  const handleCategoryLeave = () => {
    hideTimerRef.current = setTimeout(() => {
      setShowPanel(false);
      setActiveCategory(null);
    }, 120);
  };

  const handlePanelEnter = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
  };

  const handleTrialFormSubmit = (e) => {
    e.preventDefault();
    if (!trialForm.scheduleDate || !trialForm.scheduleSlot) {
      alert('Bạn chưa chọn ngày & khung giờ học thử.');
      return;
    }
    alert('Đăng ký thành công! Chúng tôi sẽ liên hệ sớm để sắp lịch.');
    setTrialForm({
      name: '',
      phone: '',
      subject: '',
      grade: '',
      mode: '',
      scheduleDate: '',
      scheduleSlot: '',
      note: ''
    });
    setSelectedDate('');
    setSelectedSlot('');
  };

  const handleRequestFormSubmit = (e) => {
    e.preventDefault();
    console.log('Yêu cầu gia sư:', requestForm);
    setRequestForm({
      name: '',
      phone: '',
      subject: '',
      grade: '',
      location: '',
      budget: '',
      time_preference: '',
      note: ''
    });
    setRequestDate('');
    setRequestTime('');
    setToastMessage('Đã nhận yêu cầu. Chúng tôi sẽ liên hệ sớm!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const applySchedule = () => {
    if (!selectedDate || !selectedSlot) {
      alert('Vui lòng chọn ngày và khung giờ.');
      return;
    }
    setTrialForm(prev => ({
      ...prev,
      scheduleDate: selectedDate,
      scheduleSlot: selectedSlot
    }));
    setPickerOpen(false);
  };

  const applyRequestTime = () => {
    if (!requestDate || !requestTime) {
      setToastMessage('Chọn ngày & khung giờ trước nhé!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2200);
      return;
    }
    const formatVN = (isoStr) => {
      const d = new Date(isoStr);
      return d.toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' });
    };
    setRequestForm(prev => ({
      ...prev,
      time_preference: `${requestDate} • ${requestTime}`
    }));
    setRequestTimePickerOpen(false);
  };

  const getTodayMin = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#">
            <img className="brand-logo" src={LogoGroup} alt="G&3N Logo" />
            <span>GIASUNO.1</span>
          </a>
          <nav>
            <div className="nav">
              <a href="#khoahoc">Giới thiệu</a>
              <a href="#giaovien">Giáo viên</a>
              <a href="#luyenthi">Luyện thi</a>
              <a href="#tuyendung">Tuyển dụng</a>
              <a href="#blog">Hỗ trợ</a>
              <a className="btn btn-ghost" href="#dangnhap">Đăng nhập</a>
              <a className="btn btn-primary" href="#dangky">Đăng ký</a>
            </div>
          </nav>
          <button className="menu-btn" aria-label="Mở menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </header>

      <main>
        {/* Course Catalog Section */}
        <section className="section" id="catalog">
          <div className="catalog-layout" id="catalogRoot">
            {/* Sidebar */}
            <aside 
              className="course-sidebar" 
              id="sidebar"
              onMouseLeave={handleCategoryLeave}
            >
              <div className="sidebar-head">
                <button className="sidebar-toggle" aria-label="Mở danh mục">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <strong>Các khóa học</strong>
              </div>

              <nav className="course-list">
                {categories.map(cat => (
                  <a 
                    key={cat.id}
                    className={`course-item ${activeCategory === cat.id ? 'is-active' : ''}`}
                    data-cat={cat.id}
                    onMouseEnter={() => handleCategoryHover(cat.id)}
                    onFocus={() => handleCategoryHover(cat.id)}
                  >
                    <span className="icon-cap"></span>{cat.label}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Right Column */}
            <div className={`catalog-right ${showPanel ? 'show-panel' : ''}`} id="rightCol">
              {/* Banner */}
              <div className="promo-banner card">
                <div 
                  className="banner"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <div className="banner-main" id="bannerMain">
                    {banners.map((banner, idx) => (
                      <img 
                        key={idx}
                        src={banner} 
                        alt={`Banner ${idx + 1}`}
                        className={currentSlide === idx ? 'active' : ''}
                      />
                    ))}
                  </div>

                  <div className="banner-thumbs" id="bannerThumbs">
                    {banners.map((banner, idx) => (
                      <button 
                        key={idx}
                        className={`thumb ${currentSlide === idx ? 'active' : ''}`}
                        data-idx={idx}
                        onClick={() => {
                          setCurrentSlide(idx);
                          setIsAutoPlaying(true);
                        }}
                      >
                        <img src={banner} alt={`Banner ${idx + 1}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Course Panel */}
              <section 
                className="course-panel card" 
                id="panel"
                onMouseEnter={handlePanelEnter}
                onMouseLeave={handleCategoryLeave}
              >
                <div className="panel-head"><span>KHÓA HỌC</span></div>

                {/* Đại học */}
                <div className={`panel-body ${activeCategory === 'daihoc' ? 'is-show' : ''}`} id="daihoc">
                  <ul className="panel-list">
                    <li><a className="subject" href="#"><span className="ico">π</span>Toán cao cấp</a></li>
                    <li><a className="subject" href="#"><span className="ico">🧲</span>Vật lý đại cương</a></li>
                  </ul>
                </div>

                {/* Học sinh giỏi */}
                <div className={`panel-body ${activeCategory === 'hsgioi' ? 'is-show' : ''}`} id="hsgioi">
                  <div className="panel-groups">
                    <details className="panel-group" open>
                      <summary>THCS</summary>
                      <ul className="panel-list">
                        <li><a className="subject" href="#"><span className="ico">π</span> Toán chuyên</a></li>
                        <li><a className="subject" href="#"><span className="ico">📚</span> Ngữ văn chuyên</a></li>
                        <li><a className="subject" href="#"><span className="ico">📘</span> Tiếng Anh chuyên</a></li>
                      </ul>
                    </details>
                    <details className="panel-group" open>
                      <summary>THPT</summary>
                      <ul className="panel-list">
                        <li><a className="subject" href="#"><span className="ico">⚡</span> Vật lý chuyên</a></li>
                        <li><a className="subject" href="#"><span className="ico">🧪</span> Hóa học chuyên</a></li>
                        <li><a className="subject" href="#"><span className="ico">🧬</span> Sinh học chuyên</a></li>
                      </ul>
                    </details>
                  </div>
                </div>

                {/* Luyện thi đại học */}
                <div className={`panel-body ${activeCategory === 'ltdh' ? 'is-show' : ''}`} id="ltdh">
                  <details className="panel-group" open>
                    <summary>Thi THPTQG</summary>
                    <ul className="panel-list">
                      <li><a className="subject" href="#"><span className="ico">π</span> Toán</a></li>
                      <li><a className="subject" href="#"><span className="ico">📚</span> Ngữ văn</a></li>
                      <li><a className="subject" href="#"><span className="ico">📘</span> Tiếng Anh</a></li>
                      <li><a className="subject" href="#"><span className="ico">⚡</span> Vật lý</a></li>
                      <li><a className="subject" href="#"><span className="ico">🧪</span> Hóa học</a></li>
                      <li><a className="subject" href="#"><span className="ico">🧬</span> Sinh học</a></li>
                      <li><a className="subject" href="#"><span className="ico">🏺</span> Lịch sử</a></li>
                      <li><a className="subject" href="#"><span className="ico">🗺️</span> Địa lý</a></li>
                      <li><a className="subject" href="#"><span className="ico">⚖️</span> Giáo dục KT & PL</a></li>
                      <li><a className="subject" href="#"><span className="ico">💻</span> Tin học</a></li>
                      <li><a className="subject" href="#"><span className="ico">⚙️</span> Công nghệ</a></li>
                    </ul>
                  </details>

                  <details className="panel-group" open>
                    <summary>LUYỆN THI ĐGTD ĐHBKHN (TSA)</summary>
                    <ul className="panel-list">
                      <li><a className="subject" href="#"><span className="ico">📘</span> Tư duy Toán học</a></li>
                      <li><a className="subject" href="#"><span className="ico">📖</span> Tư duy Đọc hiểu</a></li>
                      <li><a className="subject" href="#"><span className="ico">⚗️</span> Tư duy Khoa học</a></li>
                      <li><a className="subject" href="#"><span className="ico">🎯</span> Tổ hợp môn</a></li>
                    </ul>
                  </details>

                  <details className="panel-group" open>
                    <summary>LUYỆN THI ĐGNL ĐHQGHN (HSA)</summary>
                    <ul className="panel-list">
                      <li><a className="subject" href="#"><span className="ico">📏</span> Định tính</a></li>
                      <li><a className="subject" href="#"><span className="ico">🧮</span> Định lượng</a></li>
                      <li><a className="subject" href="#"><span className="ico">🔬</span> Khoa học</a></li>
                      <li><a className="subject" href="#"><span className="ico">🗂️</span> Tổ hợp môn</a></li>
                      <li><a className="subject" href="#"><span className="ico">💬</span> Tiếng Anh</a></li>
                    </ul>
                  </details>

                  <details className="panel-group" open>
                    <summary>LUYỆN THI ĐGNL ĐHQG-HCM (V-ACT)</summary>
                    <ul className="panel-list">
                      <li><a className="subject" href="#"><span className="ico">📗</span> Toán học</a></li>
                      <li><a className="subject" href="#"><span className="ico">🗣️</span> Sử dụng Ngôn ngữ</a></li>
                      <li><a className="subject" href="#"><span className="ico">⚙️</span> Tư duy Khoa học</a></li>
                      <li><a className="subject" href="#"><span className="ico">🧩</span> Tổ hợp môn</a></li>
                    </ul>
                  </details>
                </div>

                {/* THPT */}
                <div className={`panel-body ${activeCategory === 'thpt' ? 'is-show' : ''}`} id="thpt">
                  <div className="panel-groups">
                    {['Lớp 10', 'Lớp 11', 'Lớp 12'].map(grade => (
                      <details key={grade} className="panel-group" open>
                        <summary>{grade}</summary>
                        <ul className="panel-list">
                          <li><a className="subject" href="#"><span className="ico">π</span> Toán</a></li>
                          <li><a className="subject" href="#"><span className="ico">📚</span> Ngữ văn</a></li>
                          <li><a className="subject" href="#"><span className="ico">📘</span> Tiếng Anh</a></li>
                          <li><a className="subject" href="#"><span className="ico">⚡</span> Vật lý</a></li>
                          <li><a className="subject" href="#"><span className="ico">🧪</span> Hóa học</a></li>
                          <li><a className="subject" href="#"><span className="ico">🧬</span> Sinh học</a></li>
                          <li><a className="subject" href="#"><span className="ico">🏺</span> Lịch sử</a></li>
                          <li><a className="subject" href="#"><span className="ico">🗺️</span> Địa lý</a></li>
                          <li><a className="subject" href="#"><span className="ico">⚖️</span> Giáo dục KT & PL</a></li>
                          <li><a className="subject" href="#"><span className="ico">💻</span> Tin học</a></li>
                          <li><a className="subject" href="#"><span className="ico">⚙️</span> Công nghệ</a></li>
                        </ul>
                      </details>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* Tutors Section */}
        <section className="section" id="giasu">
          <h2>Đội ngũ gia sư tiêu biểu</h2>

          <div className="courses">
            {/* Tutor 1 */}
            <article className="card course tutor-card">
              <div className="thumb">
                <img src={TutorMinh} alt="Thầy Nguyễn Văn Minh" />
              </div>
              <div className="tutor-info">
                <strong>Nguyễn Văn Minh</strong>
                <div className="sub">Giáo viên môn Toán</div>
                <ul className="notes">
                  <li>10 năm kinh nghiệm</li>
                  <li>Chuyên ôn thi THPTQG</li>
                  <li>Hơn 1000 học sinh đạt 9+ môn Toán</li>
                </ul>
                <div className="meta">
                  <span>TP.HCM</span>
                  <a className="btn btn-ghost" href="#">Xem hồ sơ</a>
                </div>
              </div>
            </article>

            {/* Tutor 2 */}
            <article className="card course tutor-card">
              <div className="thumb">
                <img src={TutorHa} alt="Cô Trần Thu Hà" />
              </div>
              <div className="tutor-info">
                <strong>Trần Thu Hà</strong>
                <div className="sub">Giáo viên Hóa học THCS</div>
                <ul className="notes">
                  <li>8 năm giảng dạy</li>
                  <li>Học sinh tiến bộ sau 4 tuần</li>
                  <li>Phương pháp dễ hiểu</li>
                </ul>
                <div className="meta">
                  <span>Hà Nội</span>
                  <a className="btn btn-ghost" href="#">Xem hồ sơ</a>
                </div>
              </div>
            </article>

            {/* Tutor 3 */}
            <article className="card course tutor-card">
              <div className="thumb">
                <img src={TutorAnh} alt="Thầy Lê Quang Anh" />
              </div>
              <div className="tutor-info">
                <strong>Lê Quang Anh</strong>
                <div className="sub">Tiếng Anh · IELTS</div>
                <ul className="notes">
                  <li>IELTS 8.0</li>
                  <li>Lộ trình cá nhân hóa</li>
                  <li>Speaking/Listening focus</li>
                </ul>
                <div className="meta">
                  <span>Online</span>
                  <a className="btn btn-ghost" href="#">Xem hồ sơ</a>
                </div>
              </div>
            </article>

            {/* Tutor 4 */}
            <article className="card course tutor-card">
              <div className="thumb">
                <img src={TutorPhuong} alt="Cô Phạm Thu Phương" />
              </div>
              <div className="tutor-info">
                <strong>Phạm Thu Phương</strong>
                <div className="sub">Ngữ văn THPT</div>
                <ul className="notes">
                  <li>Hơn 10 năm kinh nghiệm</li>
                  <li>Giảng viên tiêu biểu TP</li>
                  <li>Giọng nói truyền cảm</li>
                </ul>
                <div className="meta">
                  <span>Hải Phòng</span>
                  <a className="btn btn-ghost" href="#">Xem hồ sơ</a>
                </div>
              </div>
            </article>

            {/* Tutor 5 */}
            <article className="card course tutor-card">
              <div className="thumb">
                <img src={TutorDuy} alt="Thầy Nguyễn Hữu Duy" />
              </div>
              <div className="tutor-info">
                <strong>Nguyễn Hữu Duy</strong>
                <div className="sub">Vật lý · Chuyên đề</div>
                <ul className="notes">
                  <li>Ôn thi HSG/ĐGNL</li>
                  <li>Giải Nhất HSGQG môn Vật lý 2022</li>
                  <li>Thi ĐGNL ĐHQGHCM đạt 1700đ</li>
                </ul>
                <div className="meta">
                  <span>Đà Nẵng</span>
                  <a className="btn btn-ghost" href="#">Xem hồ sơ</a>
                </div>
              </div>
            </article>

            {/* Tutor 6 */}
            <article className="card course tutor-card">
              <div className="thumb">
                <img src={TutorLinh} alt="Cô Nguyễn Ngọc Linh" />
              </div>
              <div className="tutor-info">
                <strong>Nguyễn Ngọc Linh</strong>
                <div className="sub">Sinh học THPT</div>
                <ul className="notes">
                  <li>Sơ đồ tư duy súc tích</li>
                  <li>Lý thuyết – bài tập cân bằng</li>
                  <li>Ôn thi khối B hiệu quả</li>
                </ul>
                <div className="meta">
                  <span>Cần Thơ</span>
                  <a className="btn btn-ghost" href="#">Xem hồ sơ</a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Recruitment CTA */}
        <section className="section" id="tuyendung">
          <div className="band band--purple">
            <div>
              <h3 style={{margin:'0 0 6px'}}>👩‍🏫 Đồng hành cùng chúng tôi</h3>
              <p className="muted" style={{margin:0, color:'#f6f6f6'}}>
                Trở thành một phần của đội ngũ gia sư chuyên nghiệp, tận tâm và sáng tạo.
              </p>
            </div>
            <div className="hero-cta">
              <a className="btn btn-light" href="#formTuyenDung">Ứng tuyển ngay</a>
            </div>
          </div>
        </section>

        {/* Hero Section with Trial Form */}
        <section className="hero">
          <div className="banner">
            <div className="banner-main" id="bannerMain">
              {banners.map((banner, idx) => (
                <img 
                  key={idx}
                  src={banner} 
                  alt={`Banner ${idx + 1}`}
                  className={currentSlide === idx ? 'active' : ''}
                />
              ))}
            </div>

            <div className="banner-thumbs">
              {banners.map((banner, idx) => (
                <button 
                  key={idx}
                  className={`thumb ${currentSlide === idx ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentSlide(idx);
                    setIsAutoPlaying(true);
                  }}
                >
                  <img src={banner} alt={`Banner ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Trial Form */}
          <div className="hero-illustration">
            <div className="trial-wrap card">
              <div className="trial-head">
                <strong>Đăng ký học thử</strong>
                <span className="pill">Miễn phí</span>
              </div>

              <form className="trial-body" onSubmit={handleTrialFormSubmit}>
                <div className="form-grid">
                  <label className="field">
                    <span>Họ và tên</span>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Nguyễn Văn A" 
                      value={trialForm.name}
                      onChange={(e) => setTrialForm({...trialForm, name: e.target.value})}
                      required 
                    />
                  </label>

                  <label className="field">
                    <span>Số điện thoại</span>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="09xx xxx xxx" 
                      pattern="^[0-9+\s()-]{8,}$"
                      value={trialForm.phone}
                      onChange={(e) => setTrialForm({...trialForm, phone: e.target.value})}
                      required 
                    />
                  </label>

                  <label className="field">
                    <span>Môn học</span>
                    <select 
                      name="subject" 
                      value={trialForm.subject}
                      onChange={(e) => setTrialForm({...trialForm, subject: e.target.value})}
                      required
                    >
                      <option value="">Chọn môn</option>
                      <option>Toán</option>
                      <option>Vật lý</option>
                      <option>Hóa học</option>
                      <option>Ngữ văn</option>
                      <option>Tiếng Anh</option>
                      <option>Sinh học</option>
                    </select>
                  </label>

                  <label className="field">
                    <span>Lớp</span>
                    <select 
                      name="grade"
                      value={trialForm.grade}
                      onChange={(e) => setTrialForm({...trialForm, grade: e.target.value})}
                      required
                    >
                      <option value="">Chọn lớp</option>
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                  </label>

                  <div className="field field--full">
                    <span>Hình thức</span>
                    <div className="inline-options">
                      <label className="radio">
                        <input 
                          type="radio" 
                          name="mode" 
                          value="Online"
                          checked={trialForm.mode === 'Online'}
                          onChange={(e) => setTrialForm({...trialForm, mode: e.target.value})}
                          required 
                        />
                        <span className="mark"></span>
                        <span>Online</span>
                      </label>
                      <label className="radio">
                        <input 
                          type="radio" 
                          name="mode" 
                          value="Offline"
                          checked={trialForm.mode === 'Offline'}
                          onChange={(e) => setTrialForm({...trialForm, mode: e.target.value})}
                          required 
                        />
                        <span className="mark"></span>
                        <span>Offline</span>
                      </label>
                    </div>
                  </div>

                  <div className="field field--full">
                    <span>Khung giờ ưa thích</span>
                    <div className={`picker ${pickerOpen ? 'is-open' : ''}`} id="schedulePicker">
                      <button 
                        type="button" 
                        className="picker-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setPickerOpen(!pickerOpen);
                        }}
                      >
                        <span className="picker-text">
                          {trialForm.scheduleDate && trialForm.scheduleSlot 
                            ? `${trialForm.scheduleDate.split('-').reverse().join('/')} • ${trialForm.scheduleSlot}`
                            : 'Chọn ngày & giờ'}
                        </span>
                      </button>

                      <div className="picker-pop">
                        <div className="picker-sec">
                          <div className="picker-title">Chọn ngày (7 ngày tới)</div>
                          <div className="picker-days">
                            {getNext7Days().map((date, idx) => (
                              <button 
                                key={idx}
                                type="button"
                                className="day-btn"
                                aria-pressed={selectedDate === toISO(date)}
                                onClick={() => setSelectedDate(toISO(date))}
                              >
                                {formatDate(date)}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="picker-sec">
                          <div className="picker-title">Chọn khung giờ</div>
                          <div className="picker-slots">
                            {timeSlots.map((slot, idx) => (
                              <button 
                                key={idx}
                                type="button"
                                className="slot-btn"
                                aria-pressed={selectedSlot === slot}
                                onClick={() => setSelectedSlot(slot)}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="picker-actions">
                          <button 
                            type="button" 
                            className="btn btn-ghost" 
                            onClick={() => setPickerOpen(false)}
                          >
                            Huỷ
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={applySchedule}
                          >
                            Áp dụng
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <label className="field field--full">
                    <span>Ghi chú (tuỳ chọn)</span>
                    <textarea 
                      name="note" 
                      rows="3" 
                      placeholder="..."
                      value={trialForm.note}
                      onChange={(e) => setTrialForm({...trialForm, note: e.target.value})}
                    ></textarea>
                  </label>
                </div>

                <label className="agree">
                  <input type="checkbox" required />
                  <span>Tôi đồng ý để trung tâm liên hệ tư vấn.</span>
                </label>

                <button className="btn btn-primary btn-block" type="submit">
                  Đăng ký học thử ngay
                </button>
                <p className="muted" style={{margin: '8px 0 0', fontSize: '13px'}}>
                  Chúng tôi sẽ liên hệ sớm để xác nhận lịch phù hợp. Đối với hình thức học thử offline, 
                  bạn vui lòng di chuyển đến trung tâm để có trải nghiệm học tập thuận tiện và tốt nhất.
                </p>
              </form>
            </div>
          </div>
        </section>


        {/* Recruitment CTA
        <section className="section" id="tuyendung">
          <div className="band band--purple">
            <div>
              <h3 style={{margin:'0 0 6px'}}>👩‍🏫 Đồng hành cùng chúng tôi</h3>
              <p className="muted" style={{margin:0, color:'#f6f6f6'}}>
                Trở thành một phần của đội ngũ gia sư chuyên nghiệp, tận tâm và sáng tạo.
              </p>
            </div>
            <div className="hero-cta">
              <a className="btn btn-light" href="#formTuyenDung">Ứng tuyển ngay</a>
            </div>
          </div>
        </section> */}

        {/* Features Section */}
        <section className="section" id="tinh-nang">
          <h2>Vì sao phụ huynh & học viên chọn chúng tôi?</h2>
          <div className="grid">
            <article className="card">
              <div className="icon" aria-hidden="true">🎯</div>
              <h3>Kèm 1–1 theo mục tiêu</h3>
              <p>Lộ trình cá nhân hoá theo năng lực, bù lỗ hổng và luyện đề để đạt mục tiêu điểm số.</p>
            </article>

            <article className="card">
              <div className="icon" aria-hidden="true">🏅</div>
              <h3>Gia sư chất lượng – đã kiểm duyệt</h3>
              <p>Giáo viên/sinh viên xuất sắc, có kinh nghiệm; phỏng vấn & dạy thử trước khi nhận lớp.</p>
            </article>

            <article className="card">
              <div className="icon" aria-hidden="true">📈</div>
              <h3>Theo dõi tiến độ & báo cáo</h3>
              <p>Nhật ký buổi học, bài tập và nhận xét sau mỗi buổi; báo cáo gửi phụ huynh hằng tuần.</p>
            </article>

            <article className="card">
              <div className="icon" aria-hidden="true">🗓️</div>
              <h3>Lịch học linh hoạt</h3>
              <p>Học online/offline, đổi lịch dễ dàng và có buổi dạy bù khi bận.</p>
            </article>

            <article className="card">
              <div className="icon" aria-hidden="true">📚</div>
              <h3>Bám sát chương trình & luyện thi</h3>
              <p>Giáo án bám sát SGK, nâng cao theo chuyên đề; luyện thi giữa kỳ, cuối kỳ, THPTQG.</p>
            </article>

            <article className="card">
              <div className="icon" aria-hidden="true">🤝</div>
              <h3>Cam kết phù hợp</h3>
              <p>Miễn phí đổi gia sư nếu chưa phù hợp trong 1–2 buổi đầu tiên.</p>
            </article>
          </div>
        </section>

        {/* Request Section */}
        <section className="section" id="yeu-cau-gia-su">
          <div className="request-grid">
            <div className="card request-copy">
              <h2>HỌC PHÍ - LỆ PHÍ THAM KHẢO</h2>
              <div className="cta-inline">
                <a href="#requestForm" className="btn btn-primary">Thông tin chi tiết</a>
              </div>
            </div>

            <form className="card request-form" id="requestForm" onSubmit={handleRequestFormSubmit}>
              <h2>Không tìm được gia sư phù hợp?</h2>
              <p className="muted">
                Để lại yêu cầu của bạn tại đây. Chúng tôi sẽ phản hồi sớm nhất có thể.
              </p>

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="rqName">Họ và tên</label>
                  <input 
                    id="rqName" 
                    name="name" 
                    type="text" 
                    placeholder="Nguyễn Văn A"
                    value={requestForm.name}
                    onChange={(e) => setRequestForm({...requestForm, name: e.target.value})}
                    required 
                  />
                </div>
                <div className="field">
                  <label htmlFor="rqPhone">Số điện thoại</label>
                  <input 
                    id="rqPhone" 
                    name="phone" 
                    type="tel" 
                    placeholder="09xx xxx xxx"
                    value={requestForm.phone}
                    onChange={(e) => setRequestForm({...requestForm, phone: e.target.value})}
                    required 
                  />
                </div>

                <div className="field">
                  <label htmlFor="rqSubject">Môn học</label>
                  <select 
                    id="rqSubject" 
                    name="subject"
                    value={requestForm.subject}
                    onChange={(e) => setRequestForm({...requestForm, subject: e.target.value})}
                    required
                  >
                    <option value="">Chọn môn</option>
                    <option>Toán</option>
                    <option>Ngữ văn</option>
                    <option>Tiếng Anh</option>
                    <option>Vật lý</option>
                    <option>Hóa học</option>
                    <option>Sinh học</option>
                    <option>Lịch sử</option>
                    <option>Địa lý</option>
                    <option>Tin học</option>
                    <option>Công nghệ</option>
                    <option>Khác</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="rqGrade">Khối/Lớp</label>
                  <select 
                    id="rqGrade" 
                    name="grade"
                    value={requestForm.grade}
                    onChange={(e) => setRequestForm({...requestForm, grade: e.target.value})}
                    required
                  >
                    <option value="">Chọn khối/lớp</option>
                    <option>Tiểu học</option>
                    <option>THCS</option>
                    <option>THPT</option>
                    <option>Đại học/Cao đẳng</option>
                    <option>Khác</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="rqLocation">Khu vực</label>
                  <input 
                    id="rqLocation" 
                    name="location" 
                    type="text" 
                    placeholder="Tỉnh/TP hoặc Online"
                    value={requestForm.location}
                    onChange={(e) => setRequestForm({...requestForm, location: e.target.value})}
                  />
                </div>
                <div className="field">
                  <label htmlFor="rqBudget">Ngân sách dự kiến</label>
                  <input 
                    id="rqBudget" 
                    name="budget" 
                    type="text" 
                    placeholder="VD: 200–300k/buổi"
                    value={requestForm.budget}
                    onChange={(e) => setRequestForm({...requestForm, budget: e.target.value})}
                  />
                </div>

                <div className="field field--full">
                  <label>Lịch học</label>
                  <div className={`picker slim ${requestTimePickerOpen ? 'is-open' : ''}`}>
                    <button 
                      type="button" 
                      className="picker-btn" 
                      onClick={() => setRequestTimePickerOpen(!requestTimePickerOpen)}
                    >
                      {requestForm.time_preference || 'Khung giờ'}
                    </button>
                    <div className="picker-pop">
                      <div className="picker-sec">
                        <div className="picker-title">Ngày bắt đầu</div>
                        <input 
                          type="date" 
                          value={requestDate}
                          onChange={(e) => setRequestDate(e.target.value)}
                          min={getTodayMin()}
                          style={{padding:'8px 10px', border:'1px solid var(--border)', borderRadius:'10px'}}
                        />
                      </div>
                      <div className="picker-sec" style={{marginTop:'12px'}}>
                        <div className="picker-title">Khung giờ</div>
                        <input 
                          type="time" 
                          value={requestTime}
                          onChange={(e) => setRequestTime(e.target.value)}
                          min="01:00"
                          max="23:00"
                          required
                          style={{padding:'8px 10px', border:'1px solid var(--border)', borderRadius:'10px', width:'100%'}}
                        />
                      </div>

                      <div className="picker-actions">
                        <button 
                          type="button" 
                          className="btn" 
                          onClick={() => setRequestTimePickerOpen(false)}
                        >
                          Hủy
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-primary" 
                          onClick={applyRequestTime}
                        >
                          Áp dụng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field field--full">
                  <label htmlFor="rqNote">Ghi chú (tuỳ chọn)</label>
                  <textarea 
                    id="rqNote" 
                    name="note" 
                    rows="3" 
                    placeholder="Mục tiêu, nội dung cần kèm, số buổi/tuần…"
                    value={requestForm.note}
                    onChange={(e) => setRequestForm({...requestForm, note: e.target.value})}
                  ></textarea>
                </div>

                <label className="agree field--full">
                  <input type="checkbox" id="rqAgree" required />
                  <span>Tôi đồng ý để trung tâm liên hệ tư vấn.</span>
                </label>

                <button className="btn btn-primary btn-block field--full" type="submit">
                  Gửi yêu cầu ngay
                </button>
              </div>
            </form>
          </div>
        </section>



        {/* Sign Up CTA */}
        <section className="section" id="dangky">
          <div className="band">
            <div>
              <h3 style={{margin:'0 0 6px'}}>Bắt đầu miễn phí</h3>
              <p className="muted" style={{margin:0}}>Tạo tài khoản, học thử bài đầu tiên của mọi khoá học.</p>
            </div>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#dangky">Tạo tài khoản</a>
              <a className="btn btn-ghost" href="#dangnhap">Tôi đã có tài khoản</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          Copyright © 2025 Online Tutor. Developed by
          <button className="invisible-btn"> Group 09, TDTU</button>.<br />
          Reproduction or distribution without permission is prohibited.
        </p>
      </footer>

      {/* Toast */}
      <div className={`toast ${showToast ? 'show' : ''}`} role="status" aria-live="polite">
        {toastMessage}
      </div>
    </div>
  );
};

export default Homepage;
