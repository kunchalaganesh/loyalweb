import React, { useEffect, useRef, useState } from "react";
import "../../PagesStyles/Heading.css";
import wideLogo from "../../../Images/loyalStringLogoWide.png";
import smallLogo from "../../../Images/loyalStringLogoSmall.png";
import { FiCircle } from "react-icons/fi";
import {
  AiOutlineDown,
  AiOutlineAppstore,
  AiOutlineArrowRight,
  AiOutlineSchedule,
} from "react-icons/ai";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsFillPersonPlusFill } from "react-icons/bs";
import {
  BiUserCircle,
  BiWallet,
  BiLock,
  BiLogOut,
  BiBookBookmark,
} from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { TfiMenuAlt } from "react-icons/tfi";
import { AiOutlineSearch, AiOutlineSetting } from "react-icons/ai";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";

import india from "../../../Images/CountriesFlags/india.png";
import usa from "../../../Images/CountriesFlags/usa.png";
import uk from "../../../Images/CountriesFlags/uk.png";
import japan from "../../../Images/CountriesFlags/japan.png";
import china from "../../../Images/CountriesFlags/china.png";
import addProduct from "../../../Images/AppList/addProduct.png";
import inventory from "../../../Images/AppList/inventory.png";
import orders from "../../../Images/AppList/orders.png";
import unLabelledList from "../../../Images/AppList/labelList.png";
import invoice from "../../../Images/AppList/invoice.png";
import rates from "../../../Images/AppList/rates.png";
import makePayment from "../../../Images/AppList/makePayment.png";
import reports from "../../../Images/AppList/reports.png";
import user1 from "../../../Images/ProfileList/user1.jpg";
import user2 from "../../../Images/ProfileList/user2.jpg";
import user3 from "../../../Images/ProfileList/user3.jpg";
// import adminProfilePic from "../../../Images/AdminProfile/adminProfilePic.jpg";
import adminProfilePic from "../../../Images/AdminProfile/loyalStringLogoSmall.png";
import { useNavigate } from "react-router-dom";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { useDispatch } from "react-redux";
import { adminLoggedOut } from "../../../../redux/action/Actions";

export default function AdminTopNavbar() {
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);
  const [dropdown4, setDropdown4] = useState(false);
  const [dropdown5, setDropdown5] = useState(false);
  const [dropdown6, setDropdown6] = useState(false);

  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [drawerSection, setDrawerSection] = useState("Settings");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleChange = () => {
    setIsDarkMode(!isDarkMode);
    // Call a function to switch the entire app's theme to light/dark mode here
  };
  const toggleDrawer = () => {
    setSettingsPanelOpen(!settingsPanelOpen);
  };

  const [isFullScreen, setIsFullScreen] = useState(false);

  const dropdownRef = useRef(null);
  const dropdown2Ref = useRef(null);
  const dropdown3Ref = useRef(null);
  const dropdown4Ref = useRef(null);
  const dropdown5Ref = useRef(null);
  const dropdown6Ref = useRef(null);
  const handleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        dropdown2Ref.current &&
        !dropdown2Ref.current.contains(event.target) &&
        dropdown3Ref.current &&
        !dropdown3Ref.current.contains(event.target) &&
        dropdown4Ref.current &&
        !dropdown4Ref.current.contains(event.target) &&
        dropdown5Ref.current &&
        !dropdown5Ref.current.contains(event.target) &&
        dropdown6Ref.current &&
        !dropdown6Ref.current.contains(event.target)
      ) {
        setDropdown(false);
        setDropdown2(false);
        setDropdown3(false);
        setDropdown4(false);
        setDropdown5(false);
        setDropdown6(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  const countries = [
    {
      id: 1,
      countryName: "India",
      flag: india,
    },
    {
      id: 2,
      countryName: "USA",
      flag: usa,
    },
    {
      id: 3,
      countryName: "UK",
      flag: uk,
    },
    {
      id: 4,
      countryName: "Japan",
      flag: japan,
    },
    {
      id: 5,
      countryName: "China",
      flag: china,
    },
  ];
  const appList = [
    {
      id: 1,
      appName: "Add Stock",
      icon: addProduct,
      appAddress: "/add_bulk_product",
    },
    {
      id: 2,
      appName: "Inventory",
      icon: inventory,
      appAddress: "/inventory",
    },
    {
      id: 3,
      appName: "Orders",
      icon: orders,
      appAddress: "/admin_orders",
    },
    {
      id: 4,
      appName: "Unlabelled",
      icon: unLabelledList,
      appAddress: "/unlabelled_list",
    },
    {
      id: 5,
      appName: "Rates",
      icon: rates,
      appAddress: "/add_rates",
    },
    {
      id: 6,
      appName: "Make Payment",
      icon: makePayment,
      appAddress: "/purchase_payments",
    },
  ];
  const notificationList = [
    {
      id: 1,
      userName: "Profile 1",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, praesentium voluptatum illo obcaecati voluptate vero vel quis. Corporis, minima et.",
      image: user1,
    },

    {
      id: 2,
      userName: "Profile 2",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, praesentium voluptatum illo obcaecati voluptate vero vel quis. Corporis, minima et.",
      image: user2,
    },

    {
      id: 3,
      userName: "Profile 3",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, praesentium voluptatum illo obcaecati voluptate vero vel quis. Corporis, minima et.",
      image: user3,
    },
  ];
  const categories = [
    {
      id: 1,
      name: "User Master",
      items: [
        { id: 1, name: "Company", linkto: "/add_company" },
        { id: 2, name: "Branch", linkto: "/add_branch" },
        { id: 3, name: "Counter", linkto: "/add_counter" },
        { id: 4, name: "Department", linkto: "/add_department" },
        { id: 5, name: "Roles", linkto: "/add_roles" },
        { id: 6, name: "Employees", linkto: "/add_employees" },
        { id: 7, name: "Bank", linkto: "/add_banks" },
        { id: 8, name: "Devices", linkto: "/add_devices" },
        { id: 9, name: "Tax", linkto: "/add_tax" },
        { id: 10, name: "Rate Conversion", linkto: "/add_rate" },
        // { id: 9, name: "ActivityLog", linkto: "/add_rates" },
        // { id: 10, name: "UserLog", linkto: "/add_rates" },
        // { id: 11, name: "Access Request Log", linkto: "/add_rates" },
        // //{ id: 12, name: "Making", linkto: "/adminhome" },
        // { id: 16, name: "Bank", linkto: "/adminhome" },
      ],
    },
    {
      id: 2,
      name: "Products Master",
      items: [
        { id: 1, name: "Category", linkto: "/add_category" },
        { id: 2, name: "Product", linkto: "/add_product" },
        { id: 3, name: "Design", linkto: "/add_design" },
        { id: 4, name: "Purity", linkto: "/add_purity" },
        { id: 5, name: "Packet", linkto: "/add_packet" },
        { id: 6, name: "Box", linkto: "/add_box" },
        { id: 7, name: "Stone", linkto: "/add_stone" },
        // { id: 7, name: "Diamond", linkto: "/add_diamond" },
        {
          id: 8,
          name: "Diamond Size/Weight/Rate ",
          linkto: "/add_diamond_size_weight_rate",
        },
        { id: 9, name: "SKU", linkto: "/add_sku" },
        { id: 10, name: "Rates", linkto: "/add_rates" },
        { id: 11, name: "Collection", linkto: "/add_collection" },
        { id: 12, name: "Occassion", linkto: "/add_occassion" },

        // { id: 11, name: "Party", linkto: "/add_vendor" },
        // //{ id: 12, name: "Making", linkto: "/adminhome" },
        // { id: 16, name: "Bank", linkto: "/adminhome" },
      ],
    },
    {
      id: 3,
      name: "Trading",
      items: [
        { id: 1, name: "Purchase Entry", linkto: "/purchase_entry" },
        { id: 9, name: "Create Packet", linkto: "/create_packet" },
        { id: 2, name: "Add Bulk Stock New", linkto: "/add_bulk_stock_new" },
        { id: 0, name: "Add Single Stock", linkto: "/add_single_stock" },
        // { id: 3, name: "Add Bulk Stock", linkto: "/add_bulk_product" },
        { id: 4, name: "Invoice", linkto: "/admin_invoice" },
        { id: 5, name: "Make Payments", linkto: "/purchase_payments" },
        { id: 6, name: "Recieve Payments", linkto: "/receive_payments" },
        { id: 7, name: "Credit Note / Sale Return", linkto: "/credit_note" },
        { id: 8, name: "Debit Note / Purchase Return", linkto: "/debit_note" },
        // { id: 14, name: "Customize Order", linkto: "/adminhome" },
        //{ id: 15, name: "Stock Transfer", linkto: "/adminhome" },
        //{ id: 16, name: "Stock Verification", linkto: "/adminhome" },
      ],
    },
    {
      id: 4,
      name: "Reports",
      items: [
        { id: 1, name: "Stock", linkto: "/stock_report" },
        { id: 0, name: "SKU Report", linkto: "/admin_sku_report" },
        {
          id: 10,
          name: "Sku / Karigar Report",
          linkto: "/admin_sku_karigar_wise_report",
        },
        { id: 2, name: "Inventory", linkto: "/inventory" },
        { id: 3, name: "Sale", linkto: "/admin_sale_report" },
        { id: 4, name: "Order List", linkto: "/admin_orders" },
        { id: 5, name: "Purchase", linkto: "/purchase" },
        { id: 6, name: "Customer Ledger", linkto: "/admin_customer_ledger" },
        { id: 7, name: "Supplier Ledger", linkto: "/admin_vendor_ledger" },
        { id: 8, name: "Old Metal", linkto: "/purchase" },
        { id: 9, name: "Cash", linkto: "/cash_report" },

        // {
        //   id: 10,
        //   name: "Invoice Customisaton",
        //   linkto: "/invoice_customisation",
        // },
        // { id: 29, name: "Old Metal", linkto: "/adminhome" },
        // { id: 30, name: "GST", linkto: "/adminhome" },
      ],
    },
    // {
    //   id: 4,
    //   name: "E-Commerce",
    //   icon: "<AiOutlineShoppingCart/>",
    //   items: [
    //     { id: 3, name: "Customer", linkto: "/add_customer" },
    //     { id: 7, name: "Category New", linkto: "/category_new" },

    //     // { id: 5, name: "Refresh Products", linkto: "/reloadproducts" },
    //     // { id: 5, name: "New List", linkto: "/admin-newlist" },
    //     // { id: 2, name: "Add Product", linkto: "/admin-addproduct" },
    //   ],
    // },

    // {
    //   id: 3,
    //   name: "Master",
    //   items: [
    //     // { id: 6, name: "Category", linkto: "/add_category" },
    //     // { id: 7, name: "Product", linkto: "/add_product_type" },
    //     // { id: 8, name: "Collection", linkto: "/add_collection" },
    //     // { id: 9, name: "Purity", linkto: "/add_purity" },
    //     // { id: 45, name: "Rates", linkto: "/add_rates" },
    //     { id: 10, name: "Stone", linkto: "/add_stone" },
    //     { id: 11, name: "SKU", linkto: "/add_sku" },
    //     //{ id: 12, name: "Making", linkto: "/adminhome" },
    //     { id: 13, name: "Box", linkto: "/add_box" },
    //     { id: 14, name: "Supplier", linkto: "/add_supplier" },
    //     { id: 15, name: "Employee", linkto: "/add_employee" },
    //     // { id: 16, name: "Bank", linkto: "/adminhome" },
    //   ],
    // },

    // {
    //   id: 4,
    //   name: "Accounts",
    //   items: [
    //     { id: 17, name: "Ledger", linkto: "/ledger_main" },
    //     { id: 18, name: "Voucher", linkto: "/adminhome" },
    //     { id: 19, name: "Statement", linkto: "/adminhome" },
    //     { id: 20, name: "Day Book", linkto: "/adminhome" },
    //     { id: 21, name: "Trial Balance", linkto: "/adminhome" },
    //     { id: 22, name: "Profit & Loss", linkto: "/adminhome" },
    //     { id: 23, name: "Balance Sheet", linkto: "/adminhome" },
    //   ],
    // },

    // {
    //   id: 6,
    //   name: "Gold Scheme",
    //   items: [
    //     { id: 31, name: "Create", linkto: "/adminhome" },
    //     { id: 32, name: "Enroll", linkto: "/adminhome" },
    //     { id: 33, name: "Installment", linkto: "/adminhome" },
    //     { id: 34, name: "Collection", linkto: "/adminhome" },
    //     { id: 35, name: "Pending", linkto: "/adminhome" },
    //     { id: 36, name: "Maturity", linkto: "/adminhome" },
    //   ],
    // },
    // {
    //   id: 7,
    //   name: "Loan",
    //   items: [
    //     { id: 37, name: "Issue", linkto: "/adminhome" },
    //     { id: 38, name: "Receipt", linkto: "/adminhome" },
    //     { id: 39, name: "Capital", linkto: "/adminhome" },
    //   ],
    // },
    // {
    //   id: 8,
    //   name: "CRM",
    //   items: [
    //     { id: 40, name: "Dashbord", linkto: "/adminhome" },
    //     { id: 41, name: "Contacts", linkto: "/adminhome" },
    //     { id: 42, name: "Opportunities", linkto: "/adminhome" },
    //     { id: 43, name: "Leads", linkto: "/adminhome" },
    //     { id: 44, name: "Customers", linkto: "/adminhome" },
    //   ],
    // },
    {
      id: 9,
      name: "Settings",
      items: [
        { id: 45, name: "Vendor Tounche", linkto: "/vendor_tounche" },
        { id: 46, name: "Customer Tounche", linkto: "/customer_tounche" },
        {
          id: 47,
          name: "Diamond Attributes",
          linkto: "/add_diamond_attributes",
        },
        {
          id: 48,
          name: "Pair Customer Vendor",
          linkto: "/pair_customer_vendor",
        },
        { id: 49, name: "Customer Slab", linkto: "/customer_slab" },
        {
          id: 50,
          name: "Customer Rate Of Interest",
          linkto: "/customer_rate_of_interest",
        },
        {
          id: 51,
          name: "Customer Credit Period",
          linkto: "/customer_credit_period",
        },
        // { id: 45, name: "Rates", linkto: "/add_rates" },
        // { id: 46, name: "Offers", linkto: "/adminhome" },
        // { id: 47, name: "Discount", linkto: "/adminhome" },
        // { id: 48, name: "Points", linkto: "/adminhome" },
        // { id: 49, name: "Company", linkto: "/adminhome" },
        // { id: 50, name: "Branch", linkto: "/adminhome" },
        // { id: 51, name: "Year", linkto: "/adminhome" },
        // { id: 52, name: "User", linkto: "/adminhome" },
      ],
    },
    // Add more categories as needed
  ];
  const userProfile = {
    id: 1,
    name: "Loyal String",
    profilePic: adminProfilePic,
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Perform any additional logout actions if needed
    // ...
    // Dispatch the logout action
    dispatch(adminLoggedOut());
    navigate("/adminpanellogin");
  };

  const mobileDrawer = [
    {
      id: 0,
      name: "Create New",
      items: [
        { id: 1, name: "Add Customer", linkto: "/add_customer" },
        { id: 2, name: "Add Vendor", linkto: "/add_vendor" },
        { id: 2, name: "Add Employee", linkto: "/add_employees" },
      ],
    },
    ...categories,
  ];
  return (
    <nav className="navbarDesktopMainOuterBox">
      <div className="navbarDesktopMainInnerBox">
        <div className="navbarDesktopMainLeftBox">
          <img
            className="companyLogoLarge"
            // src={wideLogo}
            onClick={() => navigate("/adminhome")}
            style={{ width: "50px", marginRight: "5px", cursor: "pointer" }}
            src={smallLogo}
            alt="companyLogoWide"
          />
          <h3
            style={{ whiteSpace: "nowrap" }}
            className="comapanysNameHeading"
            onClick={() => navigate("/adminhome")}
          >
            LOYAL STRING
          </h3>
          <div className="adminPanelCompanyLogoMobile">
            <img
              onClick={() => navigate("/adminhome")}
              className="companyLogoSmall"
              src={smallLogo}
              alt="companyLogoSmall"
            />
            <h3
              style={{ whiteSpace: "nowrap" }}
              className="comapanysNameHeading adminPanelCompanyLogoMobile"
              onClick={() => navigate("/adminhome")}
            >
              LOYAL STRING
            </h3>
          </div>

          <div className="mobileDrawerMainBox">
            <ResponsiveDrawer categories={mobileDrawer} />
          </div>
          {/* Create New Below */}
          <div className="navbarDesktopDropdownBoxesMain">
            <div className="createNewDropdownMain" ref={dropdownRef}>
              <div
                className={
                  !dropdown
                    ? "createNewDropdownButton"
                    : "createNewDropdownButton createNewDropdownButtonActive"
                }
                onClick={() => {
                  setDropdown(!dropdown),
                    setDropdown2(false),
                    setDropdown3(false),
                    setDropdown4(false),
                    setDropdown5(false),
                    setDropdown6(false);
                }}
              >
                Create New
                <AiOutlineDown style={{ padding: "10px 5px" }} size={"12px"} />
              </div>

              <div
                className={`createNewDropdownItems ${
                  dropdown ? "createDropdownItemsActive" : ""
                }`}
              >
                <ul className="createNewDropdownMainList">
                  <li onClick={() => navigate("/add_customer")}>
                    <RiTeamLine size={"17px"} />
                    <p>Customer</p>
                  </li>
                  <li onClick={() => navigate("/add_vendor")}>
                    <MdOutlinePersonAddAlt size={"17px"} />
                    <p>Supplier</p>
                  </li>
                  {/* <li onClick={() => navigate("/add_employee")}> */}
                  <li onClick={() => navigate("/add_employees")}>
                    <BsFillPersonPlusFill size={"17px"} />
                    <p>Employee</p>
                  </li>

                  {/* <li>
                    <AiOutlineSchedule size={"17px"} />
                    <p>Scheme</p>
                  </li> */}
                </ul>
              </div>
            </div>
            {/* Mega Menu Below */}
            <div
              className="createNewDropdownMain createNewDropdownMain2"
              ref={dropdown2Ref}
            >
              <div
                className={
                  !dropdown2
                    ? "createNewDropdownButton"
                    : "createNewDropdownButton createNewDropdownButtonActive"
                }
                onClick={() => {
                  setDropdown2(!dropdown2),
                    setDropdown(false),
                    setDropdown3(false),
                    setDropdown4(false),
                    setDropdown5(false),
                    setDropdown6(false);
                }}
              >
                Mega Menu
                <AiOutlineDown style={{ padding: "10px 5px" }} size={"12px"} />
              </div>
              <div
                className={`createNewDropdownItems fullWidth ${
                  dropdown2 ? "createDropdownItemsActive" : ""
                }`}
              >
                {categories.map((category) => (
                  <div key={category.id} className="createNewDropdownMain">
                    <div className="createNewDropdownItemsHead2">
                      <h5>{category.name}</h5>
                    </div>
                    <div className="createNewDropdownItems2">
                      <ul>
                        {category.items.map((item) => (
                          <li key={item.id}>
                            <p onClick={() => navigate(item.linkto)}>
                              {" "}
                              <FiCircle
                                size={"8px"}
                                style={{
                                  strokeWidth: "1px",
                                }}
                              />{" "}
                              {item.name}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Searchbar Below */}
        <div className="navbarDesktopMainRightBox">
          <div className="navbarDesktopSearchbarMainBox">
            <input placeholder="Search..." />
            <div className="navbarDesktopSearchbarIcon">
              <HiMagnifyingGlass />
            </div>
          </div>
          {/* Full screen Below */}
          <div className="navbarDesktopIconBox">
            {isFullScreen ? (
              <RxExitFullScreen size="25px" onClick={handleFullScreen} />
            ) : (
              <RxEnterFullScreen size="25px" onClick={handleFullScreen} />
            )}
          </div>
          {/* Appstore Below */}
          <div className="navbarDesktopIconBox">
            <div style={{ fontSize: "15px" }} className="navbarDesktopIconBox">
              <div
                className="createNewDropdownMain"
                style={{ width: "auto" }}
                ref={dropdown3Ref}
              >
                <div
                  style={{ padding: "0 10px" }}
                  className={
                    !dropdown3
                      ? "createNewDropdownButton"
                      : "createNewDropdownButton createNewDropdownButtonActive"
                  }
                  onClick={() => {
                    setDropdown3(!dropdown3),
                      setDropdown(false),
                      setDropdown2(false),
                      setDropdown4(false),
                      setDropdown5(false),
                      setDropdown6(false);
                  }}
                >
                  <AiOutlineAppstore size={"25px"} />
                </div>

                <div
                  className={`createNewDropdownItems appListDropdown ${
                    dropdown3 ? "createDropdownItemsActive" : ""
                  }`}
                >
                  <div className="navbarDesktopAppsListDropdownOuterBox">
                    {appList.map((x) => (
                      <div
                        onClick={() => navigate(`${x.appAddress}`)}
                        className="navbarDesktopAppsListDropdownBox"
                      >
                        <img style={{ height: "30px" }} src={x.icon} />
                        <p style={{ whiteSpace: "nowrap" }}>{x.appName}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Countries Option Below */}
          <div style={{ fontSize: "15px" }} className="navbarDesktopIconBox">
            <div
              className="createNewDropdownMain"
              style={{ width: "auto" }}
              ref={dropdown4Ref}
            >
              <div
                style={{ padding: "0 10px" }}
                className={
                  !dropdown4
                    ? "createNewDropdownButton"
                    : "createNewDropdownButton createNewDropdownButtonActive"
                }
                onClick={() => {
                  setDropdown4(!dropdown4),
                    setDropdown(false),
                    setDropdown2(false),
                    setDropdown3(false),
                    setDropdown5(false),
                    setDropdown6(false);
                }}
              >
                <img
                  style={{ width: "30px" }}
                  // src={`${countries[0].flag}`}
                  src={`${india}`}
                  alt="selectedCountry"
                />
                {/* <AiOutlineDown style={{ padding: "10px 5px" }} size={"12px"} /> */}
              </div>

              <div
                className={`createNewDropdownItems countriesDropdown ${
                  dropdown4 ? "createDropdownItemsActive" : ""
                }`}
              >
                <div className="navbarDesktopCountriesDropdownOuterBox">
                  {countries.map((x) => (
                    <div className="navbarDesktopCountriesDropdownBox">
                      <p>{x.countryName}</p>
                      <img style={{ height: "30px" }} src={x.flag} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Notification Below */}
          <div style={{ fontSize: "15px" }} className="navbarDesktopIconBox">
            <div
              className="createNewDropdownMain"
              style={{ width: "auto" }}
              ref={dropdown5Ref}
            >
              <div
                style={{ padding: "0 10px" }}
                className={
                  !dropdown5
                    ? "createNewDropdownButton"
                    : "createNewDropdownButton createNewDropdownButtonActive"
                }
                onClick={() => {
                  setDropdown5(!dropdown5),
                    setDropdown(false),
                    setDropdown2(false),
                    setDropdown3(false),
                    setDropdown4(false),
                    setDropdown6(false);
                }}
              >
                <IoMdNotificationsOutline
                  className="navbarDesktopNotificationIcon"
                  style={{ padding: "10px 5px" }}
                  size={"25px"}
                />
                {notificationList.length > 0 ? (
                  <div className="navbarDesktopNotificationIconAlert">
                    <p>{notificationList.length}</p>
                  </div>
                ) : null}
              </div>

              <div
                className={`createNewDropdownItems notificationsDropdown ${
                  dropdown5 ? "createDropdownItemsActive" : ""
                }`}
              >
                <div className="navbarDesktopNotificationsDropdownOuterBox">
                  <div className="navbarDesktopNotificationsDropdownClearBox">
                    <p>Notification</p>
                    <p>ClearAll</p>
                  </div>
                  {notificationList.map((x) => (
                    <div className="navbarDesktopNotificationDropdownBox">
                      <div className="navbarDesktopNotificationDropdownUserBox">
                        <div className="navbarDesktopNotificationDropdownImageBox">
                          <img
                            className="navbarDesktopNotificationDropdownImage"
                            src={x.image}
                          />
                        </div>
                        <div className="navbarDesktopNotificationDropdownParaBox">
                          <p>{x.userName}</p>
                          <p>{x.comment.substring(0, 100)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="navbarDesktopNotificationDropdownShowAllBox">
                    <h4>View All</h4>
                    <AiOutlineArrowRight style={{ marginLeft: "10px" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Admin Profile Box Below */}
          <div style={{ fontSize: "15px" }} className="navbarDesktopIconBox">
            <div
              className="createNewDropdownMain"
              style={{ width: "auto" }}
              ref={dropdown6Ref}
            >
              <div
                style={{ padding: "0 10px" }}
                className={
                  !dropdown6
                    ? "createNewDropdownButton"
                    : "createNewDropdownButton createNewDropdownButtonActive"
                }
                onClick={() => {
                  setDropdown6(!dropdown6),
                    setDropdown(false),
                    setDropdown2(false),
                    setDropdown3(false),
                    setDropdown5(false),
                    setDropdown4(false);
                }}
              >
                <img
                  className="navbarDesktopDropdownProfilePic"
                  // src={`${countries[0].flag}`}
                  src={userProfile.profilePic}
                  alt="selectedProfile"
                />
                <p style={{ whiteSpace: "nowrap" }}>{userProfile.name}</p>
                <AiOutlineDown style={{ padding: "10px 5px" }} size={"12px"} />
              </div>

              <div
                className={`createNewDropdownItems adminProfileDropdown ${
                  dropdown6 ? "createDropdownItemsActive" : ""
                }`}
              >
                <div className="navbarDesktopDropdownOuterBox">
                  <p
                    style={{
                      fontSize: "12px",
                      textAlign: "left",
                      marginLeft: "20px",
                    }}
                  >
                    Welcome
                  </p>

                  <div className="navbarDesktopAdminProfileDropdownBox">
                    <div className="navbarDesktopAdminProfileDropdownItemsBox">
                      <div className="navbarDesktopAdminProfileDropdownIconBox">
                        <BiUserCircle size={"16px"} />
                      </div>
                      <p>My Account</p>
                    </div>
                    <div className="navbarDesktopAdminProfileDropdownItemsBox">
                      <div className="navbarDesktopAdminProfileDropdownIconBox">
                        <FiSettings size={"16px"} />
                      </div>
                      <p>Settings</p>
                    </div>
                    <div className="navbarDesktopAdminProfileDropdownItemsBox">
                      <div className="navbarDesktopAdminProfileDropdownIconBox">
                        <BiWallet size={"16px"} />
                      </div>
                      <p>Wallet</p>
                    </div>
                    <div className="navbarDesktopAdminProfileDropdownItemsBox">
                      <div className="navbarDesktopAdminProfileDropdownIconBox">
                        <BiLock size={"16px"} />
                      </div>
                      <p>Lock Screen</p>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="navbarDesktopAdminProfileDropdownBox">
                    <div
                      onClick={handleLogout}
                      className="navbarDesktopAdminProfileDropdownItemsBox"
                    >
                      <div className="navbarDesktopAdminProfileDropdownIconBox">
                        <BiLogOut size={"16px"} />
                      </div>
                      <p>Logout</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <h1>hello</h1> */}
          <div style={{ fontSize: "15px" }} className="navbarDesktopIconBox">
            <FiSettings size={"20px"} onClick={toggleDrawer} />
          </div>
          {settingsPanelOpen && (
            <div
              className="adminDrawerOverlay"
              onClick={() => setSettingsPanelOpen(false)}
            />
          )}

          <div
            className={`adminSettingsDrawer ${
              settingsPanelOpen ? "adminDrawerOpen" : ""
            }`}
          >
            {/* Drawer content here */}
            <div>
              <div className="adminDrawerMainIconsBox">
                <BsFillChatLeftTextFill
                  className="adminDrawerIcons"
                  size={"1.25rem"}
                  onClick={() => setDrawerSection("Chats")}
                />
                <TfiMenuAlt
                  onClick={() => setDrawerSection("Tasks")}
                  className="adminDrawerIcons"
                  size={"1.25rem"}
                />
                <AiOutlineSetting
                  onClick={() => setDrawerSection("Settings")}
                  className="adminDrawerIcons"
                  size={"1.25rem"}
                />
              </div>
              {drawerSection === "Chats" ? (
                <div className="adminDrawerChatsMainBox">
                  <div className="adminDrawerChatsInput">
                    <AiOutlineSearch color="grey" size={"1.25rem"} />
                    <input type="text" placeholder="Search..." />
                  </div>
                  <div className="adminDrawerAllChatsBox">
                    <p className="adminDrawerAllChatsBoxHeading">GROUP CHATS</p>
                    <li className="adminDrawerAllChatsBoxContent">
                      App Development
                    </li>
                    <li className="adminDrawerAllChatsBoxContent">
                      App Development
                    </li>
                    <li className="adminDrawerAllChatsBoxContent">
                      App Development
                    </li>
                    <p
                      style={{ marginTop: "2rem" }}
                      className="adminDrawerAllChatsBoxHeading"
                    >
                      FAVOURITES
                    </p>
                    <p className="adminDrawerAllChatsBoxContent">Customer 1</p>
                    <p className="adminDrawerAllChatsBoxContent">Customer 2</p>
                    <p className="adminDrawerAllChatsBoxContent">Customer 3</p>
                    <p className="adminDrawerAllChatsBoxContent">Customer 4</p>
                    <p className="adminDrawerAllChatsBoxContent">Customer 5</p>
                    <p
                      style={{ marginTop: "2rem" }}
                      className="adminDrawerAllChatsBoxHeading"
                    >
                      OTHER CHATS
                    </p>
                    <p className="adminDrawerAllChatsBoxContent">Customer 1</p>
                    <p className="adminDrawerAllChatsBoxContent">Customer 2</p>
                    <p className="adminDrawerAllChatsBoxContent">Customer 3</p>
                    <p className="adminDrawerAllChatsBoxContent">Customer 4</p>
                    <p className="adminDrawerAllChatsBoxContent">Customer 5</p>
                  </div>
                  <button>Load More</button>
                </div>
              ) : drawerSection === "Tasks" ? (
                <div className="adminDrawerTasksMainBox">
                  <p
                    style={{ marginTop: "0rem", marginBottom: "2rem" }}
                    className="adminDrawerAllChatsBoxHeading"
                  >
                    WORKING TASKS
                  </p>
                  <p
                    style={{ margin: "1rem 0" }}
                    className="adminDrawerAllChatsBoxContent"
                  >
                    App Development
                  </p>

                  <p
                    style={{ margin: "1rem 0" }}
                    className="adminDrawerAllChatsBoxContent"
                  >
                    Database Repair
                  </p>
                  <p
                    style={{ margin: "1rem 0" }}
                    className="adminDrawerAllChatsBoxContent"
                  >
                    Backup Create
                  </p>
                  <p
                    style={{ marginTop: "2rem", marginBottom: "2rem" }}
                    className="adminDrawerAllChatsBoxHeading"
                  >
                    UPCOMING TASKS
                  </p>
                  <p
                    style={{ margin: "1rem 0" }}
                    className="adminDrawerAllChatsBoxContent"
                  >
                    Sales Reporting
                  </p>

                  <p
                    style={{ margin: "1rem 0" }}
                    className="adminDrawerAllChatsBoxContent"
                  >
                    Redesign Website
                  </p>
                  <p
                    style={{ margin: "1rem 0" }}
                    className="adminDrawerAllChatsBoxContent"
                  >
                    New Admin Design
                  </p>
                  <div className="adminDrawerTasksButtonBox">
                    <button>Create Task</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p
                    style={{
                      padding: "1rem",
                      fontSize: "12px",
                      fontWeight: "bolder",
                      backgroundColor: "rgb(186, 245, 236)",
                    }}
                  >
                    THEME SETTINGS
                  </p>
                  <div className="adminDrawerNoteBox">
                    <p>
                      <strong>Customize </strong>the overall color scheme,
                      sidebar menu, etc.
                    </p>
                  </div>
                  <div className="adminDrawerAllChatsBox">
                    <p className="adminDrawerAllChatsBoxHeading">
                      Topbar Color
                    </p>
                    <li className="adminDrawerAllChatsBoxContent radioBtns">
                      <div
                        className={`switch ${isDarkMode ? "dark" : "light"}`}
                        onClick={handleChange}
                      >
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={isDarkMode}
                          onChange={handleChange}
                        />
                        <div className="slider" />
                      </div>
                      <label style={{ marginRight: "0.5rem" }}>Dark</label>
                    </li>
                    <li className="adminDrawerAllChatsBoxContent radioBtns">
                      <div
                        className={`switch ${isDarkMode ? "dark" : "light"}`}
                        onClick={handleChange}
                      >
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={isDarkMode}
                          onChange={handleChange}
                        />
                        <div className="slider" />
                      </div>
                      <label style={{ marginRight: "0.5rem" }}>Light</label>
                    </li>
                    <li className="adminDrawerAllChatsBoxContent radioBtns">
                      <div
                        className={`switch ${isDarkMode ? "dark" : "light"}`}
                        onClick={handleChange}
                      >
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={isDarkMode}
                          onChange={handleChange}
                        />
                        <div className="slider" />
                      </div>
                      <label style={{ marginRight: "0.5rem" }}>Brand</label>
                    </li>

                    <p
                      style={{ marginTop: "2rem" }}
                      className="adminDrawerAllChatsBoxHeading"
                    >
                      Menu Color
                    </p>

                    <li className="adminDrawerAllChatsBoxContent radioBtns">
                      <div
                        className={`switch ${isDarkMode ? "dark" : "light"}`}
                        onClick={handleChange}
                      >
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={isDarkMode}
                          onChange={handleChange}
                        />
                        <div className="slider" />
                      </div>
                      <label style={{ marginRight: "0.5rem" }}>Dark</label>
                    </li>
                    <li className="adminDrawerAllChatsBoxContent radioBtns">
                      <div
                        className={`switch ${isDarkMode ? "dark" : "light"}`}
                        onClick={handleChange}
                      >
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={isDarkMode}
                          onChange={handleChange}
                        />
                        <div className="slider" />
                      </div>
                      <label style={{ marginRight: "0.5rem" }}>Light</label>
                    </li>
                    <li className="adminDrawerAllChatsBoxContent radioBtns">
                      <div
                        className={`switch ${isDarkMode ? "dark" : "light"}`}
                        onClick={handleChange}
                      >
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={isDarkMode}
                          onChange={handleChange}
                        />
                        <div className="slider" />
                      </div>
                      <label style={{ marginRight: "0.5rem" }}>Brand</label>
                    </li>

                    <p
                      style={{ marginTop: "2rem" }}
                      className="adminDrawerAllChatsBoxHeading"
                    >
                      Sidebar Size
                    </p>
                    <li className="adminDrawerAllChatsBoxContent radioBtns">
                      <div
                        className={`switch ${isDarkMode ? "dark" : "light"}`}
                        onClick={handleChange}
                      >
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={isDarkMode}
                          onChange={handleChange}
                        />
                        <div className="slider" />
                      </div>
                      <label style={{ marginRight: "0.5rem" }}>Default</label>
                    </li>
                    <li className="adminDrawerAllChatsBoxContent radioBtns">
                      <div
                        className={`switch ${isDarkMode ? "dark" : "light"}`}
                        onClick={handleChange}
                      >
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={isDarkMode}
                          onChange={handleChange}
                        />
                        <div className="slider" />
                      </div>
                      <label style={{ marginRight: "0.5rem" }}>Icon View</label>
                    </li>
                    <li className="adminDrawerAllChatsBoxContent radioBtns">
                      <div
                        className={`switch ${isDarkMode ? "dark" : "light"}`}
                        onClick={handleChange}
                      >
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={isDarkMode}
                          onChange={handleChange}
                        />
                        <div className="slider" />
                      </div>
                      <label style={{ marginRight: "0.5rem" }}>
                        Full Layout
                      </label>
                    </li>
                    <p
                      style={{ marginTop: "2rem" }}
                      className="adminDrawerAllChatsBoxHeading"
                    >
                      Sidebar User Info
                    </p>
                    <li className="adminDrawerAllChatsBoxContent radioBtns">
                      <div
                        className={`switch ${isDarkMode ? "dark" : "light"}`}
                        onClick={handleChange}
                      >
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={isDarkMode}
                          onChange={handleChange}
                        />
                        <div className="slider" />
                      </div>
                      <label style={{ marginRight: "0.5rem" }}>Enable</label>
                    </li>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <h1>hello</h1> */}
        </div>
      </div>
    </nav>
  );
}
