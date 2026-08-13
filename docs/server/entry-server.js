import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Link, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowUp, Award, Bookmark, Calendar, Check, ChevronDown, ChevronLeft, ChevronRight, Clock, ExternalLink, Heart, ImageIcon, Link2, Menu, Play, Quote, Send, Share2, Sparkles, Star, Users, X } from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/components/Navbar.tsx
var navCategories$1 = [
	{
		label: "Trends",
		items: [
			"Color",
			"Technique",
			"Cut & Style",
			"Texture"
		]
	},
	{
		label: "Inspiration",
		items: ["Tips", "Business"]
	},
	{
		label: "Hair Care",
		items: [
			"Products",
			"Hair Thinning",
			"At-Home Tips"
		]
	}
];
function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState(null);
	return /* @__PURE__ */ jsxs("header", {
		className: "relative z-50 bg-black border-b border-white/10",
		children: [/* @__PURE__ */ jsx("div", {
			className: "max-w-7xl mx-auto px-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between h-16 md:h-20 relative",
				children: [
					/* @__PURE__ */ jsx("button", {
						className: "md:hidden text-charcoal-300 hover:text-white p-1 z-10",
						onClick: () => setMenuOpen(!menuOpen),
						"aria-label": "Toggle menu",
						children: menuOpen ? /* @__PURE__ */ jsx(X, { size: 22 }) : /* @__PURE__ */ jsx(Menu, { size: 22 })
					}),
					/* @__PURE__ */ jsxs(Link, {
						to: "/",
						className: "absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex flex-col items-center md:items-start",
						children: [/* @__PURE__ */ jsx("img", {
							src: "/image/site-logo.svg",
							alt: "HairProVoices",
							className: "h-8 md:h-12 object-contain"
						}), /* @__PURE__ */ jsx("span", {
							className: "text-[8px] tracking-[0.35em] uppercase text-charcoal-400 hidden md:block mt-0.5",
							children: "Your Guide to Great Hair"
						})]
					}),
					/* @__PURE__ */ jsxs("nav", {
						className: "hidden md:flex items-center gap-1",
						children: [
							navCategories$1.map((cat) => /* @__PURE__ */ jsxs("div", {
								className: "relative group",
								onMouseEnter: () => setActiveDropdown(cat.label),
								onMouseLeave: () => setActiveDropdown(null),
								children: [/* @__PURE__ */ jsxs("button", {
									className: "flex items-center gap-1 px-3 py-2 text-[11px] tracking-widest uppercase font-medium text-charcoal-300 hover:text-white transition-colors",
									children: [cat.label, /* @__PURE__ */ jsx(ChevronDown, {
										size: 10,
										className: "opacity-60"
									})]
								}), activeDropdown === cat.label && /* @__PURE__ */ jsx("div", {
									className: "absolute top-full left-0 bg-black border border-white/10 py-2 min-w-[180px] shadow-2xl",
									children: cat.items.map((item) => /* @__PURE__ */ jsx(Link, {
										to: `/articles/?category=${encodeURIComponent(item)}`,
										className: "block px-4 py-2 text-[11px] tracking-wider uppercase text-charcoal-400 hover:text-gold-500 hover:bg-white/5 transition-colors",
										onClick: () => setActiveDropdown(null),
										children: item
									}, item))
								})]
							}, cat.label)),
							/* @__PURE__ */ jsx(Link, {
								to: "/gallery/",
								className: "px-3 py-2 text-[11px] tracking-widest uppercase font-medium text-charcoal-300 hover:text-white transition-colors",
								children: "Gallery"
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "/articles/",
								className: "px-3 py-2 text-[11px] tracking-widest uppercase font-medium text-charcoal-300 hover:text-white transition-colors",
								children: "All Articles"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative group",
								onMouseEnter: () => setActiveDropdown("Community"),
								onMouseLeave: () => setActiveDropdown(null),
								children: [/* @__PURE__ */ jsxs("button", {
									className: "flex items-center gap-1 px-3 py-2 text-[11px] tracking-widest uppercase font-medium text-charcoal-300 hover:text-white transition-colors",
									children: ["Community", /* @__PURE__ */ jsx(ChevronDown, {
										size: 10,
										className: "opacity-60"
									})]
								}), activeDropdown === "Community" && /* @__PURE__ */ jsxs("div", {
									className: "absolute top-full left-0 bg-black border border-white/10 py-2 min-w-[180px] shadow-2xl",
									children: [/* @__PURE__ */ jsx(Link, {
										to: "/contributors/",
										className: "block px-4 py-2 text-[11px] tracking-wider uppercase text-charcoal-400 hover:text-gold-500 hover:bg-white/5 transition-colors",
										onClick: () => setActiveDropdown(null),
										children: "Contributors"
									}), /* @__PURE__ */ jsx(Link, {
										to: "/about/",
										className: "block px-4 py-2 text-[11px] tracking-wider uppercase text-charcoal-400 hover:text-gold-500 hover:bg-white/5 transition-colors",
										onClick: () => setActiveDropdown(null),
										children: "About Us"
									})]
								})]
							})
						]
					})
				]
			})
		}), menuOpen && /* @__PURE__ */ jsxs("div", {
			className: "md:hidden bg-black border-t border-white/10 pb-4",
			children: [
				navCategories$1.map((cat) => /* @__PURE__ */ jsxs("div", {
					className: "border-b border-white/5",
					children: [/* @__PURE__ */ jsxs("button", {
						onClick: () => setActiveDropdown(activeDropdown === cat.label ? null : cat.label),
						className: "flex justify-between items-center w-full px-4 py-3 text-[11px] tracking-widest uppercase font-medium text-charcoal-300",
						children: [cat.label, /* @__PURE__ */ jsx(ChevronDown, {
							size: 12,
							className: `transition-transform ${activeDropdown === cat.label ? "rotate-180" : ""}`
						})]
					}), activeDropdown === cat.label && /* @__PURE__ */ jsx("div", {
						className: "px-4 pb-3 flex flex-col gap-2",
						children: cat.items.map((item) => /* @__PURE__ */ jsx(Link, {
							to: `/articles/?category=${encodeURIComponent(item)}`,
							className: "text-[11px] tracking-wider uppercase text-charcoal-400 hover:text-gold-500",
							onClick: () => {
								setMenuOpen(false);
								setActiveDropdown(null);
							},
							children: item
						}, item))
					})]
				}, cat.label)),
				/* @__PURE__ */ jsx("div", {
					className: "border-b border-white/5",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/gallery/",
						className: "block px-4 py-3 text-[11px] tracking-widest uppercase font-medium text-charcoal-300 hover:text-gold-500",
						onClick: () => setMenuOpen(false),
						children: "Gallery"
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "border-b border-white/5",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/articles/",
						className: "block px-4 py-3 text-[11px] tracking-widest uppercase font-medium text-charcoal-300 hover:text-gold-500",
						onClick: () => setMenuOpen(false),
						children: "All Articles"
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "border-b border-white/5",
					children: [/* @__PURE__ */ jsxs("button", {
						onClick: () => setActiveDropdown(activeDropdown === "Community" ? null : "Community"),
						className: "flex justify-between items-center w-full px-4 py-3 text-[11px] tracking-widest uppercase font-medium text-charcoal-300",
						children: ["Community", /* @__PURE__ */ jsx(ChevronDown, {
							size: 12,
							className: `transition-transform ${activeDropdown === "Community" ? "rotate-180" : ""}`
						})]
					}), activeDropdown === "Community" && /* @__PURE__ */ jsxs("div", {
						className: "px-4 pb-3 flex flex-col gap-2",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/contributors/",
							className: "text-[11px] tracking-wider uppercase text-charcoal-400 hover:text-gold-500",
							onClick: () => {
								setMenuOpen(false);
								setActiveDropdown(null);
							},
							children: "Contributors"
						}), /* @__PURE__ */ jsx(Link, {
							to: "/about/",
							className: "text-[11px] tracking-wider uppercase text-charcoal-400 hover:text-gold-500",
							onClick: () => {
								setMenuOpen(false);
								setActiveDropdown(null);
							},
							children: "About Us"
						})]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/FloatingNav.tsx
var navCategories = [
	{
		label: "Trends",
		items: [
			"Color",
			"Technique",
			"Cut & Style",
			"Texture"
		]
	},
	{
		label: "Inspiration",
		items: ["Tips", "Business"]
	},
	{
		label: "Hair Care",
		items: [
			"Products",
			"Hair Thinning",
			"At-Home Tips"
		]
	},
	{
		label: "Community",
		items: ["Contributors", "About Us"]
	}
];
var communityLinks = {
	"Contributors": "/contributors/",
	"About Us": "/about/"
};
function FloatingNav() {
	const [visible, setVisible] = useState(false);
	const [open, setOpen] = useState(false);
	const [activeCategory, setActiveCategory] = useState(null);
	useEffect(() => {
		const onScroll = () => {
			setVisible(window.scrollY > 80);
			if (window.scrollY <= 80) setOpen(false);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const close = () => {
		setOpen(false);
		setActiveCategory(null);
	};
	if (!visible) return null;
	return /* @__PURE__ */ jsxs(Fragment, { children: [open && /* @__PURE__ */ jsx("div", {
		className: "fixed inset-0 z-40",
		onClick: close
	}), /* @__PURE__ */ jsxs("div", {
		className: "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2",
		children: [open && /* @__PURE__ */ jsxs("div", {
			className: "bg-black border border-white/10 shadow-2xl py-2 w-56",
			children: [
				/* @__PURE__ */ jsxs("button", {
					onClick: () => {
						window.scrollTo({
							top: 0,
							behavior: "smooth"
						});
						close();
					},
					className: "flex items-center gap-3 w-full px-4 py-2.5 text-[11px] tracking-widest uppercase text-charcoal-400 hover:text-gold-500 hover:bg-white/5 transition-colors",
					children: [/* @__PURE__ */ jsx(ArrowUp, { size: 11 }), " Back to Top"]
				}),
				/* @__PURE__ */ jsx("div", { className: "h-px bg-white/5 my-1" }),
				navCategories.map((cat) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("button", {
					onClick: () => setActiveCategory(activeCategory === cat.label ? null : cat.label),
					className: "flex items-center justify-between w-full px-4 py-2.5 text-[11px] tracking-widest uppercase text-charcoal-300 hover:text-white hover:bg-white/5 transition-colors",
					children: [cat.label, /* @__PURE__ */ jsx(ChevronDown, {
						size: 10,
						className: `opacity-60 transition-transform ${activeCategory === cat.label ? "rotate-180" : ""}`
					})]
				}), activeCategory === cat.label && /* @__PURE__ */ jsx("div", {
					className: "bg-white/[0.03] border-t border-b border-white/5 py-1",
					children: cat.items.map((item) => /* @__PURE__ */ jsx(Link, {
						to: communityLinks[item] ?? `/articles/?category=${encodeURIComponent(item)}`,
						onClick: close,
						className: "block pl-7 pr-4 py-2 text-[11px] tracking-wider uppercase text-charcoal-500 hover:text-gold-500 transition-colors",
						children: item
					}, item))
				})] }, cat.label)),
				/* @__PURE__ */ jsx("div", { className: "h-px bg-white/5 my-1" }),
				[{
					label: "Gallery",
					to: "/gallery/"
				}, {
					label: "All Articles",
					to: "/articles/"
				}].map(({ label, to }) => /* @__PURE__ */ jsx(Link, {
					to,
					onClick: close,
					className: "block px-4 py-2.5 text-[11px] tracking-widest uppercase text-charcoal-400 hover:text-gold-500 hover:bg-white/5 transition-colors",
					children: label
				}, to))
			]
		}), /* @__PURE__ */ jsx("button", {
			onClick: () => setOpen((o) => !o),
			className: "w-10 h-10 bg-gold-500 hover:bg-gold-400 text-black flex items-center justify-center shadow-lg transition-colors",
			"aria-label": "Toggle navigation",
			children: open ? /* @__PURE__ */ jsx(X, { size: 16 }) : /* @__PURE__ */ jsx(Menu, { size: 16 })
		})]
	})] });
}
//#endregion
//#region src/data/articles.ts
var authors = {
	"Leila Fernandez": {
		name: "Leila Fernandez",
		title: "Senior Color Editor",
		bio: "Leila has been covering professional hair color for over a decade. A former colorist herself, she splits her time between salon visits, brand labs, and competitions to bring color professionals the most actionable, accurate coverage in the industry. She is based in Miami, FL.",
		image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/b7/57/10/75/fe/v1_E10/E10IFLPC.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=fb2875a42a0637430bcf64ce271045fd74eb5ecbec5a836b387f8581ab12cf25"
	},
	"Tom Harley": {
		name: "Tom Harley",
		title: "Technique Editor",
		bio: "Tom spent 12 years behind the chair in London and New York before turning to editorial. He specializes in cutting technique, men's grooming, and the science of layering. His work has appeared in trade publications across Europe and North America.",
		image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/43/9d/d8/e5/b2/v1_E10/E104D2JB.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=be0bdede456b2492c1b2c830d2cb8c359ce5b64f97a4fd6f6e219626a489cf41"
	},
	"Alex Nguyen": {
		name: "Alex Nguyen",
		title: "Vivid Color Specialist",
		bio: "Alex is a vivid color educator and session stylist based in Los Angeles. With a background in fashion editorial and a cult following for bold, saturated work, Alex writes about color formulation, creative technique, and building a specialty service menu.",
		image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop&facepad=3"
	},
	"Imani Okafor": {
		name: "Imani Okafor",
		title: "Texture & Curl Editor",
		bio: "Imani is a curl specialist and educator with over eight years of experience working exclusively with textured hair. Based in Atlanta, she consults for salons transitioning to curl-forward service menus and writes about curl science, client communication, and product formulation.",
		image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80&auto=format&fit=crop&facepad=3"
	},
	"Dana Reeves": {
		name: "Dana Reeves",
		title: "Salon Business Coach",
		bio: "Dana runs a six-figure solo suite in Nashville and coaches stylists on pricing, retention, and building specialty service menus. She writes about the business side of the industry, from rebooking strategy to retail systems, with a focus on what actually works in the real world.",
		image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/bd92db6c-4bf9-45fc-83a9-60eadde7f7e7/5086e550-4ef9-4fab-9093-6fa52c0c349a.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=a0f1c62eb426d2746b0289820d5b3f26441673747d02470dc54c95d46a358570"
	},
	"Michelle Torres": {
		name: "Michelle Torres",
		title: "Color Technique Contributor",
		bio: "Michelle is a balayage specialist and color educator based in Chicago. She has trained stylists across the Midwest on freehand techniques and tone correction, and writes about color placement, client consultations, and the art of the seamless grow-out.",
		image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/37/70/8f/6b/b1/v1_E10/E109UG8A.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=9bef22b3e1b7e4a05829dfd77d8ad1b16179898b2b3d2ab02db876e21625c424"
	},
	"Maria Chen": {
		name: "Maria Chen",
		title: "Client Experience Editor",
		bio: "Maria covers the client side of the salon experience, from booking and consultation to aftercare and retention. A former salon manager turned writer, she brings an operational perspective to topics like stylist-client communication, service design, and building long-term loyalty.",
		image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/bc/bf/04/9b/f9/v1_E10/E101AL0Z.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=9feb1f05368c7935079e43aa4ada5128981ac46c3b32722bc6cbc70f60c767e7"
	},
	"James Olivier": {
		name: "James Olivier",
		title: "Hair Care & Science Writer",
		bio: "James writes about the chemistry and biology behind healthy hair, from bond structure and porosity to scalp health and ingredient science. With a background in cosmetic chemistry, he translates complex formulation topics into practical guidance for stylists and clients alike.",
		image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/33/88/9e/b2/60/v1_E10/E1052XSF.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=3d7e80ec154f9b1d851388991a4828e886eb4bf5f02dbb3bba565579131d4ef5"
	},
	"Dr. Sarah Kline": {
		name: "Dr. Sarah Kline",
		title: "Trichology Advisor",
		bio: "Dr. Kline is a board-certified trichologist and dermatology consultant who advises on scalp health, hair loss, and the clinical side of hair care. She contributes expert commentary on topics where science and salon practice intersect, including bond builders, porosity, and treatment protocols.",
		image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80&auto=format&fit=crop&facepad=3"
	},
	"Lauren Chavez": {
		name: "Lauren Chavez",
		title: "Hair Health & Thinning Specialist",
		bio: "Lauren is a senior stylist and hair health educator based in Miami with over 14 years behind the chair. She specializes in thinning hair, scalp care, and early-stage hair loss, and works closely with trichologists to bridge the gap between clinical advice and everyday salon practice. She writes about what stylists see, and what clients often miss.",
		image: "/image/lauren.jpeg"
	},
	"Marissa Chen": {
		name: "Marissa Chen",
		title: "Scalp Health & Wellness Editor",
		bio: "Marissa is a scalp-focused stylist and wellness writer based in Los Angeles. With a background in trichology and holistic hair care, she specializes in scalp treatments, hair loss prevention, and the intersection of wellness rituals and professional hair care. She writes about what actually works, and what the science says.",
		image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/39/94/23/3e/90/v1_E10/E109INAW.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=9fdddee103b45b4f269091ec5c9b9fe9996232df6a60874ae79d81d9020baae4"
	},
	"Sophie Marchand": {
		name: "Sophie Marchand",
		title: "Color & Client Experience Writer",
		bio: "Sophie spent years as a salon client before training as a colorist in her late twenties. That dual perspective, knowing what it feels like to sit in the chair and not understand what is happening, shapes everything she writes. She covers color, consultations, and the client side of professional hair care from a place of genuine experience.",
		image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/0b/a4/2f/25/66/v1_E10/E10APXJJ.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=dc073b9de49c052fd6591ccc8b5e1978273c968e62eb9e8cdb363e98f3c1fe2e"
	},
	"Priya Allison": {
		name: "Priya Allison",
		title: "At-Home Hair Care Editor",
		bio: "Priya is a beauty writer and certified trichologist based in London who specializes in translating professional hair care advice into practical at-home routines. She has spent years interviewing stylists, testing products, and building guides that help people get better results between salon visits. She writes about scalp health, product selection, and the habits that actually move the needle.",
		image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/81/4e/42/a7/5b/v1_E10/E10Z9RG.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=7030a09d7ab3fa388f9a03d14111fd50d5b91d1f4a30e4e831bf1012447ee904"
	},
	"Cleo Hartley": {
		name: "Cleo Hartley",
		title: "Salon Culture & Client Experience Writer",
		bio: "Cleo is a writer and former salon receptionist who spent years watching consultations from the front desk before moving into editorial. She covers the human side of the salon experience, what stylists see, what clients miss, and the unspoken language that happens in the first five minutes of every appointment. Based in New York.",
		image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/79/0d/79/25/50/v1_E11/E118GL6Q.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=f07cd042417aba19eee7d5e82c34e18742b8a6cebe8c9aa5b8e1d6bdff2710b7"
	},
	"Kasia Nowak": {
		name: "Kasia Nowak",
		title: "Hair Health & Technique Specialist",
		bio: "Kasia is a licensed cosmetologist with 12 years behind the chair, specializing in hair health diagnostics, damage prevention, and client education. She works with stylists across the country to improve consultation techniques and help clients understand the difference between cosmetic fixes and structural solutions. Based in Portland.",
		image: "/image/kasia-nowak.jpg"
	},
	"Ji-Woo Park": {
		name: "Ji-Woo Park",
		title: "K-Style & Editorial Hair Writer",
		bio: "Ji-Woo is a Seoul-based hair writer and former assistant at one of Korea's top editorial agencies. She covers K-pop and K-drama hair trends, the stylists behind them, and how Korean hair culture influences global salon work. She writes about technique, color, and the cultural context that makes Korean hair aesthetics so widely referenced.",
		image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/07/fd/41/e8/3f/v1_E10/E10AGBRO.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=05fffed1db341fa09475a871261fb3369c2051016f8bdb14d8c73c682303d500"
	},
	"Charlotte Conaway": {
		name: "Charlotte Moss",
		title: "Red Carpet & Editorial Hair Writer",
		bio: "Charlotte is a beauty journalist and former session stylist assistant who has covered red carpet hair for over eight years. She has been on the ground at fashion weeks in New York, Paris, and Milan, and writes about the craft behind high-profile looks, the technique, the intention, and what stylists are actually saying about them. Based in Los Angeles.",
		image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80&auto=format&fit=crop&facepad=3"
	},
	"Nora Bell": {
		name: "Nora Bell",
		title: "Cut & Styling Contributor",
		bio: "Nora is a salon stylist and beauty writer based in Charleston. She specializes in soft occasion styling, wearable updos, and low-effort finishing techniques that help clients feel polished without looking overdone.",
		image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop&facepad=3"
	},
	"Yuna Seo": {
		name: "Yuna Seo",
		title: "Cut & Style Editor",
		bio: "Yuna is a Seoul-trained stylist and beauty writer based in Los Angeles. With over ten years behind the chair across Korean and American salons, she specializes in Asian hair texture, face-framing cuts, and the cultural crossover between K-beauty aesthetics and Western editorial styling. She writes about haircuts, texture work, and the technique behind looks that travel well from the salon to real life.",
		image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/b8/81/3d/7c/d2/v1_E10/E1069JVC.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=009a37938da8a6f623bf541c1b9fe132452dcf5df30e54b91a7f3c67f5bc0079"
	},
	"Bianca Russo": {
		name: "Bianca Russo",
		title: "Extensions Specialist",
		bio: "Bianca Russo is an extensions specialist with more than a decade behind the chair. She has installed, removed, and rescued more extensions than she can count, and still thinks they are worth it for the right client.",
		image: "/image/Bianca.jpg"
	},
	"Dr. Elena Marsh": {
		name: "Dr. Elena Marsh",
		title: "Science Editor",
		bio: "Dr. Elena Marsh covers the science behind hair growth and hair loss for HairProVoices. With a background in molecular biology and cosmetic science, she reads the studies stylists do not have time to and translates them into what actually matters at the chair.",
		image: "/image/Elena.jpg"
	},
	"Gemma Vaughn": {
		name: "Gemma Vaughn",
		title: "Stylist & Salon Owner",
		bio: "Gemma Vaughn is a stylist and salon owner who has spent more than a decade rescuing summer hair every autumn. She still swims every chance she gets, and rinses first every single time.",
		image: "/image/Gamma.jpg"
	},
	"Vivienne Marsh": {
		name: "Vivienne Marsh",
		title: "Colorist & Silver Transition Specialist",
		bio: "Vivienne Marsh is a colorist who specializes in gray blending and silver transitions. She has walked hundreds of clients through the grow-out, and considers it some of the most rewarding work she does.",
		image: "/image/vivienne-marsh.jpg"
	},
	"Tessa Lindqvist": {
		name: "Tessa Lindqvist",
		title: "Stylist & Salon Owner",
		bio: "Tessa Lindqvist is a stylist and salon owner who has worked in both soft and hard water regions, and now asks every new client about their water before anything else.",
		image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop&facepad=3"
	},
	"Marisol Reyes": {
		name: "Marisol Reyes",
		title: "Stylist & Salon Owner",
		bio: "Marisol Reyes is a stylist and salon owner who has spent two decades answering this exact question, and has never once given the same number twice.",
		image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80&auto=format&fit=crop&facepad=3"
	},
	"Delaney Cross": {
		name: "Delaney Cross",
		title: "Stylist & Salon Owner",
		bio: "Delaney Cross is a stylist and salon owner who has talked more clients into and out of trims than she can count, and has never once made anyone's hair grow faster by cutting it.",
		image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80&auto=format&fit=crop&facepad=3"
	},
	"Simone Ellery": {
		name: "Simone Ellery",
		title: "Colorist & Salon Educator",
		bio: "Simone Ellery is a colorist and salon educator with sixteen years behind the chair. She can read a client's styling habits from a single section of hair, and writes about hair health and heat styling for HairProVoices from a place of daily, hands-on experience.",
		image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop&facepad=3"
	},
	"Renata Voss": {
		name: "Renata Voss",
		title: "Stylist & Salon Educator",
		bio: "Renata Voss is a stylist and salon educator with fifteen years behind the chair. She has a soft spot for the old techniques that keep coming back as trends, and writes about technique and the reality behind viral hair videos for HairProVoices.",
		image: "/image/renata-voss.png"
	},
	"Talia Brenner": {
		name: "Talia Brenner",
		title: "Texture Specialist & Salon Educator",
		bio: "Talia Brenner is a texture specialist and salon educator with thirteen years behind the chair. She spends her days building the soft, lived-in waves clients ask for, and writes about texture and trends for HairProVoices, including the modern services hiding behind old, scary names.",
		image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80&auto=format&fit=crop&facepad=3"
	},
	"Devika Rao": {
		name: "Devika Rao",
		title: "Treatment Review Editor",
		bio: "Devika leads HairProVoices' product and treatment review process, working with a rotating panel of stylists, colorists, and trichology consultants to test and score hair-loss and thinning treatments on real clients. A former clinical research coordinator turned salon educator, she specializes in translating trial data and brand claims into practical, chairside-ready guidance.",
		image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&auto=format&fit=crop&facepad=3"
	}
};
var articles = [
	{
		id: 1,
		slug: "copper-renaissance-2026",
		tag: "Color",
		title: "The Copper Renaissance: Why This Shade Rules 2026",
		excerpt: "From warm cognacs to deep auburn, copper-family tones are reclaiming editorial dominance. We spoke with 10 top colorists about how they're mixing, applying, and retailing this season's must-have hue.",
		author: "Leila Fernandez",
		date: "Apr 8, 2026",
		readTime: "8 min",
		image: "/image/copper.avif",
		category: "Color",
		section: "Trends",
		body: ``,
		metaTitle: "The Copper Renaissance: Why This Shade Rules 2026",
		metaDescription: "Copper hair is dominating 2026. Learn why top colorists love it and how to ask for it at your next appointment."
	},
	{
		id: 2,
		slug: "brunette-glazing",
		tag: "Color",
		title: "Brunette Glazing: The Salon Treatment Everyone's Asking For",
		excerpt: "Your colorist's secret weapon for mirror-shine brunettes is now the most-requested treatment of the year. Here's what it is and how to ask for it.",
		author: "Leila Fernandez",
		date: "Apr 5, 2026",
		readTime: "4 min",
		image: "/image/brunette-glazing.jpg",
		category: "Color",
		section: "Trends",
		body: `## Brunette Glazing salon treatment: what it is + who it’s for

If your brunette looks fine in the mirror but dull in daylight, you’re not imagining it. Over time, brunette color can lose its “reflective” quality,especially when it’s been colored, highlighted, or even just sun-exposed. That’s where a **Brunette Glazing salon treatment** comes in.

In salon terms, glazing (sometimes called glossing) is typically a **demi-permanent, deposit-only** color service designed to enhance shine and refine tone rather than lift your hair dramatically. Wella describes color glossing as a **demi-permanent treatment that deposits color while adding shine**. They also note that glazing is often a **clear (non-pigmented) or demi-/semi-permanent color** that creates a **translucent, reflective finish**. In other words: it’s about making your existing brunette look more dimensional and “alive,” not changing your hair’s base to a totally new shade.

This service is especially helpful if you’re dealing with:

- **Dullness** (your color looks flat or chalky)
- **Fading** (warmth or depth disappears faster than you expect)
- **Brassiness or uneven tone** (especially around the face, ends, or previously lightened pieces)

What to expect in a typical appointment? Your stylist will start with a quick consultation,looking at your current color, porosity, and where you tend to fade first. Then they’ll apply the glaze (or a clear glaze plus a veil of tint, depending on the plan) and allow it to develop. Some services are designed to build in layers; for example, Wella’s **Golden Glass** process includes adding a top glaze layer after the base layer develops, with options for a **clear glaze** (tint-free surface) or a **translucent veil of color** . The goal is that when you rinse, your hair looks smoother, shinier, and more evenly toned.

If you want a polished brunette without a high-maintenance color commitment, glazing is often a sweet spot.

## How brunette glazing works (the science of shine + tone)

You might be wondering: if glazing doesn’t “lift” like highlights, how does it make hair look so much better?

Here’s the key idea: **shine is not just about gloss products,it’s about how light reflects off the hair surface and how evenly tone sits within the hair.** Glazing works by depositing a **small amount of color** (or none, if clear) that coats the hair with a more uniform, reflective finish. Because most glossing/glazing is **demi-/semi-permanent**, it tends to sit on top or within the hair’s outer layers rather than drastically changing your natural or previously colored base.

Wella positions their **Shinefinity** as a demi-permanent color glaze with **“zero lift, zero damage”** and claims of increased shine and smoother hair compared to untreated bleached hair. While everyone’s results vary, the positioning is consistent with the service purpose: enhance the surface and refine tone without the heavy lift process.

So how does your stylist choose what to apply?

- **Translucent vs. tinted glazes:** A **clear glaze** can boost shine and make hair look freshly finished without changing the shade. A **tinted glaze** adds or corrects warmth,like neutralizing brass or reintroducing depth.
- **Shade depth matching:** Even within brunette families, the “right” glaze depends on whether your hair is more cool, neutral, or warm, and how porous your ends are. Stylists consider where the color fades first and how your hair catches light.

It’s also why glazing can be a great companion to cutting. A great cut gives shape, but glazing can improve how that shape reads. When the tone is even and reflective, layers look more intentional,and less like they’re sitting flat.

## Why your haircut feels flat: the real causes of “flat layers”

Flat layers can happen even when you *love* your hair in the salon chair. Then, a week later, you notice the movement isn’t there,or your hair looks thicker in the wrong places, with ends that don’t separate.

The most common reason? **Hair doesn’t fall the way a stylist assumes unless the cut matches your natural movement and your styling routine.** Layers are about creating shape and weight distribution, not just adding “shorter pieces.” When the geometry or weight placement is off, the result can look heavy, lifeless, or oddly uniform.

Here are the real culprits behind “flat layers,” and what to do about each:

### 1) Cut geometry doesn’t match your natural fall

If your hair naturally parts a certain way or falls in a specific direction, but your layers were cut without taking that into account, they may collapse when you’re at home. For example, layers that look great when held at one angle can fall flat when your hair dries in its usual pattern.

**Practical fix:** Ask for shape mapping and a cut that reflects how your hair actually dries,especially around the crown and mid-lengths.

### 2) Weight distribution is off (too much bulk or too little support)

Layers can feel flat when they’re either too heavy (they don’t lift) or over-thinned (they can’t hold shape). Over-thinning,sometimes from aggressive point cutting or razor use,can make ends look wispy but also “stuck together,” because there’s not enough internal structure to separate.

**Practical fix:** Request controlled removal of bulk. You want movement, not emptiness.

### 3) The ends are doing all the work

If the bulk wasn’t redistributed upward, the ends can become the only “moving” part. That often leads to a look that’s smooth but not dimensional, especially when hair dries straight.

**Practical fix:** Have your stylist preserve lift at the roots while shaping mid-lengths and ends so the hair separates naturally.

### 4) Your styling routine doesn’t match the cut

A layered cut can be “dry-shape friendly” or “blowout-dependent.” If your hair was cut with one styling expectation but you mostly air-dry, the layers may not activate.

**Practical fix:** Clarify whether you want a blowout look or an air-dry movement look,and build the cut around that.

### 5) Tone and shine issues make layers look flatter

Even if the cut is good, dullness makes hair look less dimensional. When color fades or looks uneven, light reflects less clearly,so the layers appear less defined.

**Practical fix:** Combine the haircut with a **Brunette Glazing salon treatment** to restore reflective tone. A translucent finish can help layers “read” better in real life.

## What to ask your stylist if your layers collapse

If you’ve been to the salon and still feel like your layers fall flat at home, you don’t need to guess,you can ask for specifics. Here’s a client-friendly script you can use.

“Can we shape my layers based on how my hair naturally dries? I want movement, but I don’t want my ends to be too thin. I’m noticing my layers collapse,especially around the crown/mid-lengths. Could you map the shape on me while it’s dry so you can see the fall and adjust the geometry?

Also, I want to keep root lift, but control bulk at my mid-lengths and ends. Do you recommend a dry-cutting approach for that? And can you tell me exactly how to style it at home,should I blow-dry with a direction, or can we get movement with air-dry styling?”

If you want to be extra clear, add: “I’d like my brunette color to look more dimensional and reflective again. Would a glazing or gloss service help with shine and tone between appointments?” Glazing can be a smart follow-up when tone fading makes layers look less defined.

## Vivid color: what your stylist wants you to know (so it lasts)

Vivid color is breathtaking when it’s fresh,but it has a reputation for fading faster than people expect. The reason is simple: vivid shades tend to be more sensitive to the factors that strip or dull color.

Even the most skilled application can’t fully override everyday variables like water temperature, wash habits, heat exposure, and sun. Plus, hair porosity matters,some hair grabs and releases color quickly.

Wella notes that glazing is often a **clear or demi-/semi-permanent** finish that adds a **translucent, reflective** surface, which is exactly why stylists often recommend it to help vivid tones look smoother and more vibrant over time.

But vivid color fading can still happen due to:

- **Frequent washing** (especially with harsh cleansers)
- **Hot water** (opens the hair cuticle more)
- **Heat styling** without protection
- **UV exposure** (sun can shift tone)
- **Porosity changes** (over-processed ends often fade first)

Safety matters too,especially if you’re going for a major shift or using dye at home. The FDA advises people who dye their hair to follow safety precautions, including doing a **patch test before using dye on hair**. If you’re working with a salon, your stylist will typically follow proper procedures, but it’s still worth understanding why patch testing exists: it helps reduce the risk of adverse reactions.

One more thing your stylist wants you to know: vivid color isn’t just “the dye.” It’s also the aftercare. If you want it to stay vibrant, you need a maintenance routine that supports the hair rather than stripping it.

## A vivid-color maintenance plan (between appointments)

You don’t need a complicated routine to keep vivid color looking fresh. You need consistency and the right kind of gentleness.

Start with cleansing. Use a **color-safe, sulfate-free shampoo** when possible, and focus on scalp health rather than scrubbing the lengths aggressively. If your hair gets oily quickly, try washing on a schedule that still protects your color,many people do best with fewer washes per week and a gentle approach.

Next, rinse smart. A **cooler water rinse** helps reduce cuticle lift and can make color look smoother and more reflective. Then, protect from heat. If you blow-dry or use hot tools, use a **heat protectant** every time. Heat accelerates fading, especially for bright shades.

Finally, consider timing your refresh services. Many people think the only solution is re-dyeing, but a salon can often refresh tone and shine with services like glossing/glazing/toning. Since glazing is often **demi-permanent** and designed to deposit color while adding shine, it can be a strategic way to keep vivid tones from turning dull or uneven.

If you’re noticing your vivid shade drifting,like it’s becoming too warm, too muted, or uneven,talk to your stylist about a glaze refresh before it gets to the “start over” stage. And if you’re also dealing with flat layers, combining better tone with better shape can be the double-win: more shine helps define movement, and a more reflective finish makes layers look intentional.

## Conclusion

A **Brunette Glazing salon treatment** can be one of the easiest ways to revive dullness, smooth tone, and bring back that reflective, dimensional look,without the commitment of major lift. And if you’ve been asking yourself, “Why does my haircut feel flat layers?” the answer is usually cut geometry, weight distribution, and styling mismatch,not that your hair “changed.”

When you pair a cut that matches your natural fall with a tone-refresh service that restores shine, your layers start reading the way you meant them to. And if you’re working with vivid color, remember: fade resistance is a partnership between chemistry and aftercare,so follow safety guidance, wash gently, protect from heat, and refresh tone before it slips too far.`,
		metaTitle: "Why Flat Layers Happen,and How Glazing Helps",
		metaDescription: "Learn why brunette layers look flat and how glazing restores shine and tone for a more dimensional, reflective finish."
	},
	{
		id: 3,
		slug: "haircut-layers",
		tag: "Cut & Style",
		title: "Why a Good Haircut Is More Than Just \"Taking Length Off\"",
		excerpt: "Stylists are thinking about shape, weight, and grow-out, not just length. Here is what is actually happening when you sit in the chair.",
		author: "Tom Harley",
		date: "Apr 4, 2026",
		readTime: "6 min",
		image: "/image/haircut-layers.avif",
		category: "Cut & Style",
		section: "Trends",
		body: `## Why a Good Haircut Is More Than Just "Taking Length Off"

Most clients still walk into the salon thinking a haircut is maintenance.

"Just a trim."
"Take an inch off."
"Clean it up."

From a stylist's perspective, that's rarely what's actually happening.

A haircut is structure. It decides how your hair moves, how it sits when you do nothing to it, and whether your styling routine works or constantly fights you.

> "The haircut is the foundation. If that's off, no amount of styling is going to fix it."
> — Nina Patel, Salon Educator, Chicago

## Cutting Is About Shape, Not Length

Length is the most visible change, but it's not the most important one.

Stylists are thinking about:

- Where the weight sits
- How the hair collapses or expands
- How it frames your face
- How it grows out over time

Two people can leave with the same "length," and one will feel full and polished while the other feels flat or uneven.

That difference is shape.

This is why a blunt cut can make thin ends look thicker, while soft layering can add movement to heavier hair. It's not about trends. It's about what the hair needs.

## The Balance Between Movement and Density

This is where most haircuts go wrong.

Clients ask for layers because they want volume. But if the hair is already fine or low density, too many layers can remove the very thing they need, which is weight.

On the other hand, leaving everything one length can make thick hair feel heavy and unmanageable.

Stylists are constantly balancing:

- **Movement** (so the hair doesn't sit flat)
- **Density** (so the hair still looks full)

> "You're either building shape or removing it. There's no neutral when you're cutting."
> — Marcus Bell, London

## Why Your Hair Doesn't Look the Same at Home

One of the most common frustrations: it looked amazing at the salon, but you can't get it to do that at home.

Part of that is styling, but a lot of it comes back to the haircut.

A good haircut should:

- Fall into place without heavy styling
- Work with your natural texture
- Still look intentional air-dried

If your hair only looks good after a full blowout with multiple products, something in the cut is doing too little or too much.

## Texture Changes Everything

Curly, wavy, and straight hair all respond differently to cutting.

- Straight hair shows every line, so precision matters
- Wavy hair needs balance so it doesn't puff or collapse
- Curly hair requires cutting for shape when dry or in its natural pattern

This is why the same reference photo can't be applied universally.

A layered haircut on straight hair looks clean and defined. On curly hair, it can either create beautiful shape or unwanted volume depending on how it's done.

> "Texture isn't a detail. It's the whole plan."
> — Dana Reeves, Nashville

## The Role of the Hairline and Face Shape

Stylists don't just cut hair. They design around the face.

That includes:

- Where the shortest pieces hit
- How the front frames the cheekbones or jaw
- Whether the hairline is strong, soft, or uneven

Face-framing is one of the most customized parts of any haircut. A few inches too short or too long can completely change how the haircut feels.

This is why fringe, layers, and front pieces are never one-size-fits-all.

## Why Grow-Out Matters More Than the First Day

A haircut shouldn't only look good when you leave the salon.

Stylists are thinking ahead:

- How will this sit in 3 weeks?
- Will the layers collapse?
- Will the ends start to feel thin?
- Will the shape still make sense as it grows?

This is where experience shows. A good cut grows out softly. A bad one looks off within weeks.

> "I'm not cutting for today. I'm cutting for the next two months."
> — Nina Patel

## The Difference Between a Trim and a Haircut

Clients use "trim" as a safe word. It feels less risky.

But technically:

- A **trim** is removing minimal length, usually for maintenance
- A **haircut** reshapes the hair

Most appointments are actually somewhere in between.

Even taking off half an inch can change the way the hair sits if the ends were uneven or damaged. And sometimes, what a client calls a trim turns into a necessary reshape once the stylist sees the condition.

## When to Cut vs When to Treat

Not every problem is solved with scissors.

If the issue is dryness, frizz, breakage, or damage from color or heat, then a treatment may be just as important as the cut itself.

But if the issue is flat shape, heavy ends, uneven growth, or lack of movement, then cutting is what fixes it.

Good stylists know the difference and will usually combine both when needed.

## What Stylists Wish Clients Would Say Instead

Instead of saying "just a trim," try:

- "My ends feel thin"
- "My hair falls flat here"
- "It doesn't sit right when I style it"
- "I want it to look fuller / softer / lighter"

This gives your stylist something to work with beyond length. Because the goal isn't shorter hair. It's better hair.

## The Bottom Line

A haircut is not just maintenance. It's the structure everything else depends on.

It affects how your hair looks without effort, how long your style lasts, and how often you feel like you need to fix it.

> "A good cut makes styling easier. A great cut makes it almost unnecessary."
> — Marcus Bell`,
		metaTitle: "Why a Good Haircut Is More Than Just Taking Length Off",
		metaDescription: "Stylists are thinking about shape, weight, and grow-out, not just length. Here is what is actually happening when you sit in the chair."
	},
	{
		id: 4,
		slug: "vivid-color-guide",
		tag: "Color",
		title: "Ready for Vivid Color? Here's What Your Stylist Wants You to Know",
		excerpt: "Before you go bold, your colorist has a few things to tell you about the journey, and it's worth the read.",
		author: "Alex Nguyen",
		date: "Apr 3, 2026",
		readTime: "5 min",
		image: "/image/vivid-color-guide.avif",
		category: "Color",
		section: "Trends",
		body: `## Pastel-to-vivid goals (and what your clients actually want)
When clients ask for a “pastel to vivid color formula,” they usually mean two things at once: they want a shade that looks intentional in real life (not flat or muddy), and they want it to last long enough to feel worth the appointment. When clients ask for a “solo stylist business blueprint,” they’re looking for the same clarity,what to offer, what to charge, how to book, and what to do when hair behaves unpredictably.

This post is built for both. You’ll get a practical color framework for moving from pastel softness to vivid saturation, plus a solo-stylist plan for building a repeatable service menu, pricing strategy, marketing system, and operations routine. Throughout, the guardrail is simple: **hair health first**. Vivid results are not worth breakage, patchy fading, or unnecessary lift.

You’ll also learn why the “right” ratios depend on your specific brand line and starting hair condition. Manufacturer instructions matter because different clear bases, developers, and shade families are designed for different outcomes. Use the formulas here as patterns you can adapt,not as a substitute for the exact product directions for your chosen brand.

## Color formulation: the dilute vs. concentrate framework
A pastel-to-vivid transformation is mostly about saturation control. Think of it like this: pastel is typically achieved by increasing dilution (more “softening” base relative to the pigment), while vivid is achieved by reducing dilution (more pigment relative to the base) and ensuring the hair is light enough to carry that pigment.

In practice, you’ll see this show up in two places:

First, **your clear/pastel versus clear/dilute choice**. Many brands offer multiple “clear” options or pigment families that behave differently. For example, PRAVANA notes that you should not mix **Pravana Vivids Clear-Dilute** with **Pravana Vivids Clear-Pastel**, because they are intended for different outcomes: bright/vibrant versus muted tones. That’s a key reminder that “clear” is not always interchangeable,follow the line’s intended use for the look you’re aiming for.

Second, **your ratio of color to developer and the processing plan**. Some vivid workflows are designed to lift and deposit differently than pastel workflows. PRAVANA’s Vivids guidance includes an example where you use a “mix it in a ratio of 1:1 ½” (color to developer) in the context of using Vivids for lighter outcomes . Separately, PRAVANA’s FAQ provides a ratio example for its ChromaSilk Creme Hair Color: **1 part color to 1.5 parts 20 volume developer** processed **45 minutes with no heat**. The takeaway isn’t to memorize numbers,it’s to understand that *developer amount and processing time are part of the formula logic*, not an afterthought.

### Concrete formula patterns you can adapt

Below are three formula patterns based on manufacturer guidance and common pastel-to-vivid logic. Treat them as templates: keep the line-specific rules, then adjust for your client’s starting level and porosity.

**Pattern A: Pastel “muted tone” using a pastel clear base (then increase saturation)**
- Use a brand’s **clear/pastel approach** for the initial pastel result.
- Then, for a vivid version, replace the pastel-softening clear with a vivid/bright-oriented clear (or reduce the dilution effect).
- PRAVANA specifically warns against combining its Clear-Dilute and Clear-Pastel intended outcomes in the same formula, so choose one direction per appointment .

**How to adapt:**
- Start with a pastel formula that matches the client’s inspiration photo.
- If they later want “more pop,” increase pigment relative to the softening base rather than mixing incompatible clears.

**Pattern B: Vivid “lighter outcome” workflow using the brand’s color-to-developer ratio direction**
- When aiming for a vivid look that relies on a lighter end result, follow the manufacturer’s stated mix direction.
- PRAVANA’s Vivids guidance includes the “**1:1 ½** (color to developer)” ratio instruction in the context of using Vivids for lighter outcomes .

**How to adapt:**
- Keep the ratio and timing consistent with the instruction.
- If you need more intensity, don’t “freehand” by changing developer strength,consider increasing pigment within the approved system, or adjust your base-lightness and application density.

**Pattern C: Shade-specific vivid building using the brand’s pastel-to-vivid pairing logic**
PRAVANA’s blog provides example workflows using **VIVIDS Clear–Pastel plus specific VIVIDS shades**, including developer/process details for that workflow. Use this as a model: pick the clear base that matches the vibe (pastel versus vivid), then add the shade(s) the way the manufacturer describes for that family.

**How to adapt:**
- If you’re mixing multiple shades, keep the clear base consistent with the intended outcome.
- If your client wants a vivid result but your hair isn’t ready, prioritize preparation (lightness and condition) rather than forcing pigment.

## Developer and oxidation safety: strand test + timing control
Solo stylists often feel pressured to “make it work” without extra steps. But vivid color is where small timing differences can create big consequences,uneven fade, unexpected banding, or hair that becomes weak after lift.

Wella recommends doing a **strand test each time you color** to determine optimal timing and color results. Wella also provides guidance for hair color safety tests, including mixing **small amounts of colorant and developer** for testing. That’s not just about allergy prevention; it’s about predicting how your client’s hair will respond to your exact formula and timing.

### A simple test-first workflow (solo-stylist friendly)

1. **Confirm readiness:** Check the hair’s condition and elasticity. If it feels gummy, brittle, or unusually fragile, vivid goals may need to be postponed.
2. **Do a strand test:** Mix a small amount using your chosen formula and developer, apply to a hidden section, and monitor timing based on the hair’s response.
3. **Record your results:** Note the start level, the test result, and the time it took to reach the desired tone.
4. **Match the full-head timing:** Use the strand test timing to guide your application schedule.

Because vivid saturation is sensitive to both base lightness and processing time, this workflow helps you deliver consistent results even when your client’s hair isn’t identical to the last one.

## Hair health guardrails: readiness, porosity, and aftercare
A pastel-to-vivid color transformation is not only a chemistry project,it’s a hair-strength project. Vivid pigment can look gorgeous on healthy hair, but when hair is compromised, you’re more likely to see:
- patchy fading (uneven porosity)
- increased breakage (weak cuticle support)
- dullness quickly (loss of deposit and moisture)

### Pre-lightening readiness: assess before you chase saturation

Before attempting vivid results, you need to evaluate whether the hair can handle the preparation required for strong pigment. Ask yourself:
- Does the hair feel strong and springy, or does it feel dry and fragile?
- Is the hair previously colored, bleached, or chemically processed?
- Does the hair show signs of uneven porosity (for example, one section grabs color faster than another)?

If you’re working on hair that’s already fragile, consider a “journey approach.” It’s often safer to build toward vivid over multiple visits rather than forcing high saturation in one session.

### Porosity and application density: reduce patchiness

Patchy fading often comes from uneven porosity and uneven saturation during application. Strand testing helps, but technique matters too: saturate consistently, section carefully, and avoid rushing through contact time. If the hair has variable porosity, your goal is even pigment distribution.

### Aftercare: the real longevity factor

Even the best pastel-to-vivid formula won’t look good if maintenance is neglected. Color longevity depends on how gently the hair is washed, how heat is managed, and how moisture is restored.

To protect vivid vibrancy:
- Use a color-safe routine and avoid harsh cleansing.
- Manage heat and protect the hair when styling.
- Add conditioning support so the hair holds onto softness and shine.

When aftercare is consistent, you reduce the “cycle” of damage → color loss → more aggressive re-coloring. That’s one of the most practical ways solo stylists protect their client relationships and reduce color corrections.

## Conclusion
A “pastel to vivid color formula” isn’t just about pigment,it’s about saturation control, correct product pairing, and timing you can trust. Strand testing and hair safety checks help you deliver vivid results without sacrificing hair health. And a “solo stylist business blueprint” turns that craft into a predictable income system: clear offers, confident pricing, conversion-focused marketing, and solid operations.

When you combine both,smart color formulation and a repeatable business rhythm,you don’t just create beautiful color. You create a client experience people want to return to.`,
		metaTitle: "Pastel to Vivid Color Formulas + Solo Stylist Blueprint",
		metaDescription: "Build vivid color safely with strand tests and ratio logic, then launch a solo stylist business plan for pricing, marketing, and rebooking."
	},
	{
		id: 5,
		slug: "curl-consultation",
		tag: "Texture",
		title: "The Curl Consultation: What to Say to Get Your Best Curls Ever",
		excerpt: "A guide to communicating with your stylist about curl type, hydration, and the products that actually work.",
		author: "Imani Okafor",
		date: "Apr 2, 2026",
		readTime: "8 min",
		image: "/image/curl-consultation.avif",
		category: "Texture",
		section: "Trends",
		body: `A “curl consultation best curls” should feel like more than a friendly chat,it should be a plan. The best consultations start by mapping your curl pattern and understanding your real-life routine, then setting realistic goals based on your hair texture, density, and porosity. You should leave knowing exactly what will happen in the chair, what to expect during styling, and how to maintain results between visits.

If you’ve ever walked out with a cut that looked great wet but fell flat dry (or a color that looked gorgeous for two weeks and then turned brassy or dry), this guide is for you. We’ll cover how to find a stylist for your hair, what to ask in a curl consultation, and what “best curls” truly means,plus how to approach balayage when you have curls.

### How to find a stylist for your hair (step-by-step)

Finding a great stylist for curls is less about chasing a trend and more about matching your hair needs with someone who understands curl behavior. Start with your research: look for portfolios that show multiple curl types,not just one “model hair day.” Search for stylists who post consistent work across different lengths and who demonstrate how they style at home, not only how they style in-salon.

Next, vet experience in a way that’s specific to you. Reviews can be helpful, but the most important clues are in the details: Do their before/after photos look consistent under similar lighting? Do they show how the cut grows out? Do they mention curl mapping, shrinkage, or styling education? A stylist who can explain how curl patterns change with humidity and product choice is usually a safer bet than someone who only talks about the haircut “shape.”

Where to look matters too. Beyond Instagram and Google reviews, curl communities (local groups, meetups, and reputable curl education platforms) can connect you with stylists known for curl-first results. When you contact a salon, ask a simple question upfront: “Do you do curl mapping or a curl consultation before cutting?” Their answer tells you how they work.

Finally, trust your gut during the first interaction. The best curl consultations don’t rush. A good stylist asks about your wash schedule, your go-to products, and what you hate (frizz, flat roots, dryness, uneven curl clumps). They should also ask what you want most,wash-and-go definition, bouncy volume, or a style that can stretch without losing shape. You’re looking for a match, not a gamble.

### The curl consultation checklist (questions to ask)

A great curl consultation should feel structured. If you’re not sure what to ask, use this as your guide. The goal is to learn how your stylist thinks, what techniques they use, and whether they’ll teach you how to maintain the results.

Start with the fundamentals: “Will you map my curls before cutting?” Curl mapping helps ensure the cut respects your natural growth patterns and avoids surprises like weight pulling certain sections flat. Then ask about their approach to shrinkage and styling differences: “How do you account for shrinkage from wet to dry?” Shrinkage isn’t a problem to “fix”,it’s part of your curl identity, and a stylist should build the shape accordingly.

Next, ask what products and techniques they plan to use. For example: “What styling method will you use for my consultation,wet-to-dry, diffusing, or a specific set routine?” If you prefer a wash-and-go, don’t let the consultation be built around a finish you’ll never do at home.

You should also ask about product recommendations that match your hair’s needs, not just what’s trendy. “How will you choose products for my porosity and density?” Porosity affects how curls absorb moisture and hold definition, while density affects how much weight your hair can handle without going flat.

Finally, ask what happens after you leave: “Will you teach me how to style at home?” The best stylists don’t just cut,they coach. You want a plan you can repeat: how much product to use, where to apply it, and how to refresh curls between washes.

If your stylist can answer these questions clearly and confidently, you’re likely in good hands. If they dodge details or say “we’ll figure it out later,” that’s a sign to look elsewhere.

### What “best curls” means (tailoring the cut to your curl pattern)

“Best curls” isn’t one haircut,it’s a customized outcome. A curl-first stylist adjusts for curl pattern, density, and growth direction so your shape looks intentional in your everyday life. That means the cut should support your natural curl architecture, not fight it.

Curl pattern matters because different curl types behave differently. Looser waves may need more structure to hold shape, while tighter curls often need careful layering so they don’t become triangular or overly puffy. Density matters because thick, heavy hair may require targeted thinning or strategic layering to prevent the roots from collapsing. Porosity matters because hair that struggles to retain moisture may need a cut that reduces dryness-looking ends and supports a more consistent styling routine.

Growth direction is another big factor. If your curls grow outward or downward in certain zones, a uniform “all-over” approach can create imbalance. A skilled stylist will observe where your curls naturally fall and then cut to enhance that pattern.

Communication is key. Bring clarity to your preferences so your stylist can tailor the result. Ask yourself what you actually do at home. Do you want a wash-and-go with defined clumps and bounce? Do you like a “set” with finger coils or twists? Do you air-dry, diffuse, or do a combination? Tell your stylist your routine and your constraints: your time, your humidity environment, and what products you already own.

When your stylist understands your goals, they can design a cut that makes styling easier,not harder. The “best curls” outcome should look good even when you don’t spend an hour in the mirror.

### What is balayage stylist explains (and what to ask before booking)

Balayage is commonly described as a freehand highlighting technique where color/lightener is applied in a sweeping motion to create natural-looking dimension that grows out with less obvious regrowth lines [turn0search8]. In simpler terms: instead of placing color in perfectly spaced sections all the way to the roots, balayage is typically applied to mid-lengths and ends for a softer, sun-kissed effect [turn0news12].

If you’re booking a “balayage stylist explains” session, you want them to do more than name the technique. You want them to explain how it will work with your hair’s texture and curl pattern.

For curls, placement is everything. A balayage that’s beautiful on straight hair can look uneven on curls if the lift and placement aren’t adjusted for how your curls clump and dry. Ask: “How will you place color so my curl pattern stays balanced?” A good stylist should talk about lift level and where the lightener will go, considering how your curls frame your face and how your ends behave.

Timing and curl health also matter. The more lift you’re chasing, the more potential stress your hair may experience,especially if your curls are already prone to dryness. Ask: “How will you protect my curl integrity during the process?” You can also ask whether they recommend a pre-color assessment of porosity and elasticity, and what bond-support or conditioning steps they include.

Finally, ask how the service will be finished for your curl goals. “Will you style my hair after coloring in a curl-friendly way so I can see the true result?” You want to leave with a realistic preview of your final look, not just a flat, straightened sample.

### Balayage + curls: common pitfalls and how to avoid them

Balayage can be stunning on curls, but the details determine whether you’ll love it long-term. Common pitfalls include uneven lift, dryness, and brassiness. Uneven lift can happen when color placement doesn’t respect curl clumps, or when processing time isn’t tailored to your hair’s starting level and porosity. Dryness often shows up when lightening is too aggressive or when aftercare hydration isn’t part of the plan.

Brassiness is another concern, especially if you’re going lighter. Even though balayage grows out more naturally than some other highlight methods [turn0search8], the tone still needs maintenance. Your stylist should propose a realistic plan, including glossing or toning cadence based on how quickly your hair shifts.

The key is that the stylist should explain what they’re aiming for and why. Instead of promising a perfect “forever” color, they should talk about the fade-out process,how it will look as it grows, and what you can do to keep it looking fresh without over-processing.

Ask questions that protect your curls: “How will you prevent my ends from getting too porous?” “What toner or gloss will you use, and how often will I need it?” “What should I expect during the first wash after color?” A curl-friendly color plan also includes aftercare guidance: gentle cleansing, moisture support, and heat minimization when possible.

If a stylist can’t discuss maintenance or only sells the service without the follow-through plan, that’s a risk. The best balayage results are the ones that remain wearable for months.

### Wrap-up: your booking script + next steps

Now that you know what to look for, you can book with confidence. Here’s a simple message you can copy and paste when contacting a salon:

“Hi! I’m looking for a curl-first consultation and a cut that works with my natural curl pattern. Can you do curl mapping and explain how you account for shrinkage from wet to dry? I also want balayage guidance,can you explain placement and how you protect curl health during lightening? I’m hoping for a result I can style at home with my routine (wash-and-go / defined sets).”

For your consultation, bring what helps your stylist make the right plan quickly. Bring photos of your current hair in both wet and dry states, plus photos of the inspiration look you love. Include details on your routine: how often you wash, what products you use, whether you diffuse or air-dry, and what your biggest frustrations are (frizz, flat roots, dryness, uneven clumps). If you’ve recently changed products or noticed increased shedding, mention that too.

Good hair days start with the right plan. When you choose a stylist who understands curls, asks the right questions, and explains both the cut and the color process, you’re much more likely to get “best curls” you can actually maintain,without guesswork.`,
		metaTitle: "Curl Cut & Color: Consultation to Aftercare Guide",
		metaDescription: "Learn how to choose a curl specialist, ask the right questions, nail balayage placement, and keep results looking great after your appointment."
	},
	{
		id: 6,
		slug: "find-right-stylist",
		tag: "Tips",
		title: "How to Find a Stylist Who Gets Your Hair (And Keeps It)",
		excerpt: "The difference between a good haircut and a great one often comes down to finding the right match. Here's how.",
		author: "Dana Reeves",
		date: "Apr 1, 2026",
		readTime: "10 min",
		image: "/image/find-right-stylist.avif",
		category: "Tips",
		section: "Inspiration",
		body: `## Quick intro: stylist vs. dermatologist (and why it matters)

Booking a new stylist can feel like a gamble,especially if you’ve had a cut that made your curls look undefined, or a color that didn’t flatter your undertone. The good news is that for most styling and cosmetic needs, a licensed cosmetologist/hairstylist is exactly who you should book. Even better? You can stack the odds in your favor by matching your hair type and goals to the stylist’s specialty.

That said, there’s an important boundary. If your concern is medical,like sudden shedding, scalp itching with scaling, patchy hair loss, or hair loss that feels “out of nowhere”,a dermatologist is the right starting point. Dermatologists treat hair loss and scalp conditions, and they may recommend medications or other medical care depending on what’s causing the issue. A stylist can help you look and feel your best day-to-day, but they can’t diagnose the underlying cause of hair loss.

Think of it this way: the right stylist helps with cut, color, styling, and hair health through education and product guidance. The right dermatologist helps with diagnosis and treatment when symptoms suggest a medical issue. If you’re unsure which route to take, it’s okay to ask your stylist what they see and whether your scalp/hair behavior sounds like something that should be medically evaluated.

## Start with your hair profile (so you book from a position of clarity)

Before you book, take 10 minutes to describe your hair as accurately as you can. This isn’t about labeling yourself perfectly,it’s about giving your stylist the right “map” of what your hair tends to do.

Start with the basics:

- **Texture**: straight, wavy, curly, or coily
- **Density**: fine, medium, or thick strands,and how much hair you have overall
- **Hair diameter / feel**: does your hair feel wispy, sturdy, or coarse?
- **Porosity (how hair responds to moisture)**: does your hair drink products quickly and feel dry again fast, or does it resist moisture?
- **Curl pattern / shape**: if you have curls, how do they form (rings, S-waves, zig-zags)? Where is the pattern most defined?
- **Shrinkage**: do you lose a lot of length when dry?
- **Scalp**: does your scalp feel oily quickly, dry and tight, itchy, sensitive, or flaky?
- **Sensitivity and history**: do you react to certain products, heat, or dyes?

Then add the “what matters” details:

- What has **worked**?
- What has **not** worked (and what exactly happened)?
- What’s your priority: **volume**, **definition**, **less frizz**, **length retention**, **easier styling**, or **a shape that grows out well**?

Bring photos,both of you on your best hair days and of your hair when it’s behaving in a less-than-ideal way (for example, when curls fall flat or the roots get oily fast). Photos help stylists spot patterns quickly, including how your hair clumps, where it gets weighed down, and how your ends behave.

If you’re dealing with hair loss, also track what’s happening: when it began, whether shedding is diffuse or patchy, and whether your scalp symptoms changed. Even if you plan to see a dermatologist, this info helps you advocate for yourself.

## Match the stylist’s specialties to your hair goals

The “right stylist” isn’t just someone who cuts hair,it’s someone whose technique fits your hair type and your outcome.

Start by identifying your goal, then look for a stylist whose specialty aligns. Here are common goals and what to look for:

### Curly, wavy, and coily goals

If you want **curl definition** and **less frizz**, look for stylists who highlight curl mapping, custom layering, and techniques that respect shrinkage and natural movement. A curly-cut is not just a shorter haircut,it’s a plan for how your curl pattern will fall when dry. If you’ve ever left a salon with a cut that looked great wet but turned into a triangle shape when dry, that’s often a sign the cutting method wasn’t tailored.

If your goal is **length retention**, ask how they protect your ends during cutting. For many curl patterns, blunt ends, overly aggressive thinning, or cutting without considering how curls spring can lead to faster tangling and breakage.

### Volume and shape goals

If your hair needs **lift** (especially at the crown) or you want a shape that grows out gracefully, ask about their approach to layering and weight distribution. Fine hair often benefits from strategic layering and lightweight styling methods, while thick hair may need more precise shaping so it doesn’t become bulky.

### Color goals

Color is where “one-size-fits-all” can be especially risky. If you want **natural-looking dimension**, **root blending**, or **color placement** that flatters your face, look for someone who talks about tone, undertones, and how your hair’s base color reacts. If you’re trying to minimize damage, ask about their plan for strand health,how they prep, what they recommend between appointments, and how they tailor your aftercare.

### Protective styles, extensions, and heat-free styling

If you’re booking for **protective styles**, **extensions**, or **low-heat styling**, choose someone who can explain how they protect your scalp and hairline. Extensions should be installed with comfort and long-term maintenance in mind,tight installation can worsen breakage and irritation. If you’re trying to reduce heat, ask what styling method they use to create shape without excessive thermal stress.

When you’re booking, don’t be shy about stating your hair type and goal in one sentence. For example: “I have wavy hair with high frizz and I want defined waves with minimal daily styling.” The stylist’s response tells you whether they understand your hair.

## How to vet a stylist before you book (portfolio + consultation signals)

You can learn a lot before the appointment by reviewing a stylist’s work and how they communicate.

What to check:

- **Portfolio variety that matches your hair type**: Look for clients with similar texture, density, and pattern. If every photo looks like the same hair type and the same result, that’s a clue.
- **Consistency in before/after results**: Great portfolios show repeatable results, not only one dramatic transformation.
- **Product knowledge**: A good stylist can explain why they recommend certain products for your hair’s needs (hydration, slip, hold, frizz control) and how you’ll use them.
- **Consultation quality**: Do they ask detailed questions? Do they pay attention to your scalp comfort? Do they discuss what you want to change and what you want to keep?
- **Realistic expectations**: The best stylists don’t promise a miracle. They explain the steps needed to get there.

Red flags to watch for:

- **No questions** or a rushed “you’ll be fine” vibe
- **One-size-fits-all promises**, like “We can fix any hair in one appointment”
- Ignoring **scalp comfort** (itchiness, flakiness, sensitivity) and focusing only on style
- Avoiding discussion about styling method, maintenance, or what happens when hair behaves differently than expected

A strong sign is when the stylist asks you to describe your hair routine and your goals in detail,because that’s how they’ll build a plan you can actually follow at home.

## The consultation script: questions to ask about your hair type

If you want to feel confident going in, use a question list. You’re not interviewing them for a job,you’re ensuring they understand your hair and your priorities.

Ask:

1. **Cut approach**: “How do you tailor the cut for my texture and density?”
2. **Layering strategy**: “How will you add shape without making my hair triangle or stringy?”
3. **Shrinkage and movement**: “How do you account for shrinkage when cutting curly/wavy hair?”
4. **Curl/wave mapping**: “Do you cut with curl/wave pattern in mind so the shape holds when dry?”
5. **Products and styling method**: “What products will you use for my hair type, and what’s the step-by-step routine at home?”
6. **Frizz plan**: “What’s your strategy for reducing frizz while still keeping volume?”
7. **Color technique** (if applicable): “How do you choose placement and tone for my undertone and hair history?”
8. **Extensions/protective styles** (if applicable): “How do you protect my scalp and hairline, and what maintenance do you recommend?”
9. **If it behaves differently**: “If my hair doesn’t respond the way we expect,what’s the plan to adjust?”

The “plan if it behaves differently” question is especially important. Hair is living, and seasons, hormones, humidity, and product changes can shift how it acts. A good stylist will have a realistic adjustment strategy rather than blaming your hair.

## Booking details that prevent mismatches (service wording, timing, expectations)

Even if you find a stylist who seems like a perfect match, booking the wrong service can cause disappointment.

When you book, be specific about what you’re booking:

- **Cut only** vs. **cut + style**: If you want to see how your hair looks styled (especially for curls or waves), ensure the appointment includes styling time.
- **Curl service** vs. a general cut: If you’re seeking curl definition, ask whether the appointment includes techniques designed for your pattern.
- **Color**: Confirm whether it’s all-over, highlights, balayage, root touch-up, or something else.
- **Extensions/protective styles**: Make sure the service includes consultation time and any necessary prep.

Also request the right appointment length. If a curly cut is scheduled for the same time as a basic trim, you’re likely to miss out on the detailed shaping and styling steps that make curly results last.

Clarify what’s included:

- Will you get a wash?
- Is there a deep conditioning step?
- What styling method will they use (diffuse, air-dry guidance, product layering)?
- Will you receive a take-home routine recommendation?

The goal is alignment: you should leave the salon with a style that matches your hair’s behavior and a plan you can repeat at home.

## When to see a dermatologist instead of relying on a stylist

If you’re experiencing hair loss or scalp symptoms, it’s worth knowing when to switch from “stylist-first” to “doctor-first.” Dermatologists are typically the clinicians who handle hair loss treatment, and they may recommend care based on the cause.

Consider booking with a dermatologist if you notice:

- sudden or heavy shedding
- patchy hair loss
- scalp itching, burning, scaling, or redness that doesn’t improve
- thinning at the part or crown that’s progressing
- hair loss that started alongside other symptoms (fatigue, skin changes, or systemic symptoms)

If you suspect **alopecia areata**, the National Alopecia Areata Foundation offers a **Doctor Finder** designed to help people find board-certified dermatologists (and some other qualified clinicians) experienced in diagnosing and treating alopecia areata.

When you meet a clinician, they’ll typically evaluate the pattern and severity of hair loss as part of care planning . That’s a major reason medical evaluation matters,because the right treatment depends on what’s happening under the surface, not just how the hair looks today.

If you want a reputable way to locate board-certified dermatologists, the American Academy of Dermatology provides a public **Find a Dermatologist** search where you can enter your city/state/zip to find board-certified providers [1,5].

A stylist can still support you with gentle styling, scalp-friendly product recommendations, and confidence-building looks,but for diagnosis and treatment, a dermatologist is the right role.

## Aftercare plan: what to ask for so your style lasts

A great appointment doesn’t end when you leave the salon. Ask for an aftercare plan that matches your hair type and your lifestyle.

Request a personalized routine that includes:

- **Wash frequency**: How often should you wash based on your scalp oiliness or dryness?
- **How to style at home**: For curls/waves, ask about drying method, product order, and whether you should diffuse or air-dry.
- **Product types**: What should you use for hydration, frizz control, hold, and softness?
- **How to maintain shape between appointments**: For example, how to refresh without over-washing or disturbing your pattern.

If your hair is prone to dryness or breakage, ask how to reduce friction and protect your ends. If your scalp is sensitive, ask which ingredients or product categories to avoid.

Most importantly, ask for a routine you can realistically follow. The “right stylist” is the one who can translate salon technique into a home plan that fits your time and budget.

If you’re in a hair-loss journey, aftercare matters even more,comfort and gentleness become non-negotiable. A dermatologist-led plan plus stylist support can help you maintain a healthy scalp environment while you work on treatment.

## FAQ + quick checklist (printable)

### FAQ

**Can I book a curly cut if my hair is transitioning (straight to curly)?**
Yes,just be upfront. Transitioning hair can behave differently across sections, so ask how the stylist will cut and style both textures so the shape stays flattering as your pattern evolves.

**What if my scalp is flaky or itchy,should I still book a cut?**
If symptoms are active, consider seeing a dermatologist first. Hair loss treatment and scalp conditions are typically medical topics, and a clinician can help determine what’s going on. A stylist can help with gentle styling, but they shouldn’t be the only step if your scalp is uncomfortable.

**How do I know if my stylist is right for my hair type?**
You’ll notice it during the consultation: they ask detailed questions, explain their approach, and recommend products and steps that match your texture, density, and goals.

**Do I need a special stylist for color?**
Color results depend heavily on technique and planning. If you want subtle dimension, minimal damage, or precise tone, look for a stylist who demonstrates consistent color work and can explain their process.

### Quick checklist

Before you confirm your appointment, make sure you have:

- A clear description of your hair profile (texture, density, scalp)
- A goal stated in plain language (definition, volume, length retention, frizz reduction)
- A stylist whose portfolio matches your texture and desired outcome
- A consultation that includes questions and a tailored plan
- Service wording that matches what you want (cut vs. cut+style vs. curl service)
- An aftercare routine you understand and can follow

When you match the right stylist to your hair type,and know when to involve a dermatologist,you stop relying on luck. You book with intention, you get results you can maintain, and your hair finally starts cooperating the way you’ve been hoping it would.`,
		metaTitle: "How to Book the Right Hair Stylist for Your Hair Type",
		metaDescription: "Learn how to match your hair type and goals to a stylist’s specialty,plus when to see a dermatologist for hair loss or scalp issues."
	},
	{
		id: 8,
		slug: "book-right-stylist",
		tag: "Tips",
		title: "How to Book the Right Stylist for Your Hair Type",
		excerpt: "Matching your hair type to the right specialist makes all the difference. Here's how to find yours.",
		author: "Maria Chen",
		date: "Mar 28, 2026",
		readTime: "5 min",
		image: "/image/book-the-right.avif",
		category: "Tips",
		section: "Inspiration",
		body: `## Quick intro: stylist vs. dermatologist (and why it matters)

Booking a new stylist can feel like a gamble,especially if you’ve had a cut that made your curls look undefined, or a color that didn’t flatter your undertone. The good news is that for most styling and cosmetic needs, a licensed cosmetologist/hairstylist is exactly who you should book. Even better? You can stack the odds in your favor by matching your hair type and goals to the stylist’s specialty.

That said, there’s an important boundary. If your concern is medical,like sudden shedding, scalp itching with scaling, patchy hair loss, or hair loss that feels “out of nowhere”,a dermatologist is the right starting point. Dermatologists treat hair loss and scalp conditions, and they may recommend medications or other medical care depending on what’s causing the issue. A stylist can help you look and feel your best day-to-day, but they can’t diagnose the underlying cause of hair loss.

Think of it this way: the right stylist helps with cut, color, styling, and hair health through education and product guidance. The right dermatologist helps with diagnosis and treatment when symptoms suggest a medical issue. If you’re unsure which route to take, it’s okay to ask your stylist what they see and whether your scalp/hair behavior sounds like something that should be medically evaluated.

## Start with your hair profile (so you book from a position of clarity)

Before you book, take 10 minutes to describe your hair as accurately as you can. This isn’t about labeling yourself perfectly,it’s about giving your stylist the right “map” of what your hair tends to do.

Start with the basics:

- **Texture**: straight, wavy, curly, or coily
- **Density**: fine, medium, or thick strands,and how much hair you have overall
- **Hair diameter / feel**: does your hair feel wispy, sturdy, or coarse?
- **Porosity (how hair responds to moisture)**: does your hair drink products quickly and feel dry again fast, or does it resist moisture?
- **Curl pattern / shape**: if you have curls, how do they form (rings, S-waves, zig-zags)? Where is the pattern most defined?
- **Shrinkage**: do you lose a lot of length when dry?
- **Scalp**: does your scalp feel oily quickly, dry and tight, itchy, sensitive, or flaky?
- **Sensitivity and history**: do you react to certain products, heat, or dyes?

Then add the “what matters” details:

- What has **worked**?
- What has **not** worked (and what exactly happened)?
- What’s your priority: **volume**, **definition**, **less frizz**, **length retention**, **easier styling**, or **a shape that grows out well**?

Bring photos,both of you on your best hair days and of your hair when it’s behaving in a less-than-ideal way (for example, when curls fall flat or the roots get oily fast). Photos help stylists spot patterns quickly, including how your hair clumps, where it gets weighed down, and how your ends behave.

If you’re dealing with hair loss, also track what’s happening: when it began, whether shedding is diffuse or patchy, and whether your scalp symptoms changed. Even if you plan to see a dermatologist, this info helps you advocate for yourself.

## Match the stylist’s specialties to your hair goals

The “right stylist” isn’t just someone who cuts hair,it’s someone whose technique fits your hair type and your outcome.

Start by identifying your goal, then look for a stylist whose specialty aligns. Here are common goals and what to look for:

### Curly, wavy, and coily goals

If you want **curl definition** and **less frizz**, look for stylists who highlight curl mapping, custom layering, and techniques that respect shrinkage and natural movement. A curly-cut is not just a shorter haircut,it’s a plan for how your curl pattern will fall when dry. If you’ve ever left a salon with a cut that looked great wet but turned into a triangle shape when dry, that’s often a sign the cutting method wasn’t tailored.

If your goal is **length retention**, ask how they protect your ends during cutting. For many curl patterns, blunt ends, overly aggressive thinning, or cutting without considering how curls spring can lead to faster tangling and breakage.

### Volume and shape goals

If your hair needs **lift** (especially at the crown) or you want a shape that grows out gracefully, ask about their approach to layering and weight distribution. Fine hair often benefits from strategic layering and lightweight styling methods, while thick hair may need more precise shaping so it doesn’t become bulky.

### Color goals

Color is where “one-size-fits-all” can be especially risky. If you want **natural-looking dimension**, **root blending**, or **color placement** that flatters your face, look for someone who talks about tone, undertones, and how your hair’s base color reacts. If you’re trying to minimize damage, ask about their plan for strand health,how they prep, what they recommend between appointments, and how they tailor your aftercare.

### Protective styles, extensions, and heat-free styling

If you’re booking for **protective styles**, **extensions**, or **low-heat styling**, choose someone who can explain how they protect your scalp and hairline. Extensions should be installed with comfort and long-term maintenance in mind,tight installation can worsen breakage and irritation. If you’re trying to reduce heat, ask what styling method they use to create shape without excessive thermal stress.

When you’re booking, don’t be shy about stating your hair type and goal in one sentence. For example: “I have wavy hair with high frizz and I want defined waves with minimal daily styling.” The stylist’s response tells you whether they understand your hair.

## How to vet a stylist before you book (portfolio + consultation signals)

You can learn a lot before the appointment by reviewing a stylist’s work and how they communicate.

What to check:

- **Portfolio variety that matches your hair type**: Look for clients with similar texture, density, and pattern. If every photo looks like the same hair type and the same result, that’s a clue.
- **Consistency in before/after results**: Great portfolios show repeatable results, not only one dramatic transformation.
- **Product knowledge**: A good stylist can explain why they recommend certain products for your hair’s needs (hydration, slip, hold, frizz control) and how you’ll use them.
- **Consultation quality**: Do they ask detailed questions? Do they pay attention to your scalp comfort? Do they discuss what you want to change and what you want to keep?
- **Realistic expectations**: The best stylists don’t promise a miracle. They explain the steps needed to get there.

Red flags to watch for:

- **No questions** or a rushed “you’ll be fine” vibe
- **One-size-fits-all promises**, like “We can fix any hair in one appointment”
- Ignoring **scalp comfort** (itchiness, flakiness, sensitivity) and focusing only on style
- Avoiding discussion about styling method, maintenance, or what happens when hair behaves differently than expected

A strong sign is when the stylist asks you to describe your hair routine and your goals in detail,because that’s how they’ll build a plan you can actually follow at home.

## The consultation script: questions to ask about your hair type

If you want to feel confident going in, use a question list. You’re not interviewing them for a job,you’re ensuring they understand your hair and your priorities.

Ask:

1. **Cut approach**: “How do you tailor the cut for my texture and density?”
2. **Layering strategy**: “How will you add shape without making my hair triangle or stringy?”
3. **Shrinkage and movement**: “How do you account for shrinkage when cutting curly/wavy hair?”
4. **Curl/wave mapping**: “Do you cut with curl/wave pattern in mind so the shape holds when dry?”
5. **Products and styling method**: “What products will you use for my hair type, and what’s the step-by-step routine at home?”
6. **Frizz plan**: “What’s your strategy for reducing frizz while still keeping volume?”
7. **Color technique** (if applicable): “How do you choose placement and tone for my undertone and hair history?”
8. **Extensions/protective styles** (if applicable): “How do you protect my scalp and hairline, and what maintenance do you recommend?”
9. **If it behaves differently**: “If my hair doesn’t respond the way we expect,what’s the plan to adjust?”

The “plan if it behaves differently” question is especially important. Hair is living, and seasons, hormones, humidity, and product changes can shift how it acts. A good stylist will have a realistic adjustment strategy rather than blaming your hair.

## Booking details that prevent mismatches (service wording, timing, expectations)

Even if you find a stylist who seems like a perfect match, booking the wrong service can cause disappointment.

When you book, be specific about what you’re booking:

- **Cut only** vs. **cut + style**: If you want to see how your hair looks styled (especially for curls or waves), ensure the appointment includes styling time.
- **Curl service** vs. a general cut: If you’re seeking curl definition, ask whether the appointment includes techniques designed for your pattern.
- **Color**: Confirm whether it’s all-over, highlights, balayage, root touch-up, or something else.
- **Extensions/protective styles**: Make sure the service includes consultation time and any necessary prep.

Also request the right appointment length. If a curly cut is scheduled for the same time as a basic trim, you’re likely to miss out on the detailed shaping and styling steps that make curly results last.

Clarify what’s included:

- Will you get a wash?
- Is there a deep conditioning step?
- What styling method will they use (diffuse, air-dry guidance, product layering)?
- Will you receive a take-home routine recommendation?

The goal is alignment: you should leave the salon with a style that matches your hair’s behavior and a plan you can repeat at home.

## When to see a dermatologist instead of relying on a stylist

If you’re experiencing hair loss or scalp symptoms, it’s worth knowing when to switch from “stylist-first” to “doctor-first.” Dermatologists are typically the clinicians who handle hair loss treatment, and they may recommend care based on the cause.

Consider booking with a dermatologist if you notice:

- sudden or heavy shedding
- patchy hair loss
- scalp itching, burning, scaling, or redness that doesn’t improve
- thinning at the part or crown that’s progressing
- hair loss that started alongside other symptoms (fatigue, skin changes, or systemic symptoms)

If you suspect **alopecia areata**, the National Alopecia Areata Foundation offers a **Doctor Finder** designed to help people find board-certified dermatologists (and some other qualified clinicians) experienced in diagnosing and treating alopecia areata.

When you meet a clinician, they’ll typically evaluate the pattern and severity of hair loss as part of care planning. That’s a major reason medical evaluation matters,because the right treatment depends on what’s happening under the surface, not just how the hair looks today.

If you want a reputable way to locate board-certified dermatologists, the American Academy of Dermatology provides a public **Find a Dermatologist** search where you can enter your city/state/zip to find board-certified providers [1,5].

A stylist can still support you with gentle styling, scalp-friendly product recommendations, and confidence-building looks,but for diagnosis and treatment, a dermatologist is the right role.

## Aftercare plan: what to ask for so your style lasts

A great appointment doesn’t end when you leave the salon. Ask for an aftercare plan that matches your hair type and your lifestyle.

Request a personalized routine that includes:

- **Wash frequency**: How often should you wash based on your scalp oiliness or dryness?
- **How to style at home**: For curls/waves, ask about drying method, product order, and whether you should diffuse or air-dry.
- **Product types**: What should you use for hydration, frizz control, hold, and softness?
- **How to maintain shape between appointments**: For example, how to refresh without over-washing or disturbing your pattern.

If your hair is prone to dryness or breakage, ask how to reduce friction and protect your ends. If your scalp is sensitive, ask which ingredients or product categories to avoid.

Most importantly, ask for a routine you can realistically follow. The “right stylist” is the one who can translate salon technique into a home plan that fits your time and budget.

If you’re in a hair-loss journey, aftercare matters even more,comfort and gentleness become non-negotiable. A dermatologist-led plan plus stylist support can help you maintain a healthy scalp environment while you work on treatment.

## FAQ + quick checklist (printable)

### FAQ

**Can I book a curly cut if my hair is transitioning (straight to curly)?**
Yes,just be upfront. Transitioning hair can behave differently across sections, so ask how the stylist will cut and style both textures so the shape stays flattering as your pattern evolves.

**What if my scalp is flaky or itchy,should I still book a cut?**
If symptoms are active, consider seeing a dermatologist first. Hair loss treatment and scalp conditions are typically medical topics, and a clinician can help determine what’s going on. A stylist can help with gentle styling, but they shouldn’t be the only step if your scalp is uncomfortable.

**How do I know if my stylist is right for my hair type?**
You’ll notice it during the consultation: they ask detailed questions, explain their approach, and recommend products and steps that match your texture, density, and goals.

**Do I need a special stylist for color?**
Color results depend heavily on technique and planning. If you want subtle dimension, minimal damage, or precise tone, look for a stylist who demonstrates consistent color work and can explain their process.

### Quick checklist

Before you confirm your appointment, make sure you have:

- A clear description of your hair profile (texture, density, scalp)
- A goal stated in plain language (definition, volume, length retention, frizz reduction)
- A stylist whose portfolio matches your texture and desired outcome
- A consultation that includes questions and a tailored plan
- Service wording that matches what you want (cut vs. cut+style vs. curl service)
- An aftercare routine you understand and can follow

When you match the right stylist to your hair type,and know when to involve a dermatologist,you stop relying on luck. You book with intention, you get results you can maintain, and your hair finally starts cooperating the way you’ve been hoping it would.`,
		metaTitle: "How to Book the Right Hair Stylist for Your Hair Type",
		metaDescription: "Learn how to match your hair type and goals to a stylist’s specialty,plus when to see a dermatologist for hair loss or scalp issues."
	},
	{
		id: 9,
		slug: "questions-before-color",
		tag: "Tips",
		title: "10 Questions to Ask Before Your Next Color Appointment",
		excerpt: "Walk into your next color appointment prepared. These questions will protect your hair and your results.",
		author: "James Olivier",
		date: "Mar 26, 2026",
		readTime: "7 min",
		image: "/image/questions-before-color.avif",
		category: "Tips",
		section: "Inspiration",
		body: `Color can be transformative,until it isn’t. The best way to protect your results (and your scalp) is to ask smart questions before the dye ever touches your hair. Think of this as your pre-appointment checklist: you’re not being difficult; you’re being informed. A great stylist will welcome these questions, explain their process clearly, and help you feel confident about timing, maintenance, and safety.

Below are 10 questions to ask before your color appointment, with the goal of getting a plan that matches your hair history and your health needs.

### 1. What exactly are we doing to my hair (and why)?

Start by confirming the service type and the “why” behind it. Ask your stylist whether you’re getting highlights, an all-over color, a root touch-up, gloss/toner, or corrective color. Then connect the technique to your goal: Are you aiming for more dimension, better gray coverage, a softer tone, or a specific shade? A helpful follow-up is to request a step-by-step plan,what happens first, what gets applied where, and what gets adjusted if your hair behaves differently than expected.

It’s also okay to ask what products and techniques they’ll use. For example, will they be using a toner to refine warmth, or a gloss to add shine and reduce brassiness? If you’ve had bleach or previous dye, ask how that history affects their approach. The more clearly the plan is communicated, the more likely you are to love the outcome,and feel prepared for aftercare.

### 2. Which shade(s) and formula(s) will you use,and how will you choose the right one?

Color results depend on more than the shade name. Ask how they’ll match your current level (how light or dark your hair already is) and your undertone (warm, cool, or neutral). If you have gray hair, ask how they’ll handle coverage,gray can lift and deposit differently than natural pigment. If you’ve dyed or bleached before, ask what adjustments they’ll make based on your prior formula and condition.

Then ask the most important “real life” question: what if it doesn’t lift or take color the way we expect? A professional plan often includes an if/then approach,such as changing tone density, extending or shortening processing time, or using additional toning to refine warmth. You can also ask what they’ll do if the result is too warm, too cool, or uneven.

This is also where you can discuss expectations. Color usually isn’t “one and done,” especially if bleach is involved or if you’re moving across several shades. A good stylist will explain what’s achievable in a single session versus what may require a second appointment.

### 3. What’s the health risk profile for my scalp and hair?

Safety should be part of the conversation, not an afterthought. Ask what potential irritation or allergy concerns exist for the specific products they’ll use. Then ask what ingredients you should watch for,especially if you have sensitive skin, eczema, or a history of reactions.

One ingredient that deserves special attention is paraphenylenediamine (PPD), which is a common allergen in hair dye contact allergy. The National Eczema Society notes PPD as a trigger for contact dermatitis, and DermNet NZ describes PPD as a key allergen in hair dye contact allergy. If you’ve ever had itching, burning, rash, or swelling after coloring (even years ago), tell your stylist before your appointment.

Also ask how the salon handles product application to reduce risk,like avoiding unnecessary contact with skin, using barrier protection when appropriate, and ensuring the right product is used for the right area. Allergic reactions to cosmetics most often show up as itchy, red rashes (contact dermatitis), so you want a plan that prioritizes scalp comfort and early prevention.

### 4. Do you require (or recommend) a patch test,and when should I do it?

Patch testing is one of the easiest ways to reduce the chance of a bad reaction. The FDA advises people who dye their hair to “do a patch test before using dye on your hair,” and notes that salons should also do patch testing before dyeing hair. Ask whether the salon performs patch testing for new clients or new products, and what timing they use before appointment day.

If they do patch tests, ask which area they test and how they record results. If they don’t, ask whether they can recommend an at-home patch test using the specific product you’ll be using. The key is that you’re testing the actual dye/toner system,not just “something similar.”

You should also ask what to do if you react. Delayed reactions can happen: the NHS notes that symptoms of hair dye reactions can take up to 72 hours to appear. That means you shouldn’t treat patch testing as a quick “same-day” step,watch for delayed signs and follow the guidance from the product instructions and your healthcare provider if needed.

### 5) What developer strength and processing time will you use?

Processing time and developer strength can make or break both your color result and your hair comfort. Ask what developer strength they’ll use and how long the products will be on your scalp and strands. Also ask whether timing differs by section,many stylists adjust based on saturation, porosity, and how hair has responded in the past.

Then ask how they prevent over-processing. For instance, will they check strand progress during processing? Will they monitor porosity so the ends don’t grab color faster than the roots? A good stylist will explain how they reduce risk of dryness, breakage, and uneven tone.

It’s also smart to ask what signs they watch for. If your hair feels overly hot, becomes overly tight, or your scalp becomes uncomfortable, ask what their immediate response protocol is,because your comfort matters.

Finally, confirm whether they plan to use toning at the end (common with highlights, bleach, and many gray-coverage goals). Toning is often what refines warmth, but it can also be where irritation risk comes in if you’re sensitive,so connect this question to the patch test and scalp comfort plan.

### 6. How will you protect my hair from damage (especially if there’s bleach involved)?

If bleach is part of your service, ask about strand integrity checks and protective steps. A stylist can often evaluate your hair’s current condition,how porous it is, how elastic it feels, and how it’s likely to respond to lightener. Ask whether they’ll do a strand test (or at least a progress check) before full processing.

You can also ask what bond-building or protective steps they’ll use during the process. Many salons use specialized additives designed to support hair structure during chemical services. While results vary depending on your hair history, the question itself matters: it shows you’re looking for a damage-aware approach, not just a “get it done quickly” one.

Be realistic about texture after color. Color can leave hair feeling different,sometimes softer, sometimes drier, especially if there’s bleach or significant lift. Ask what softness or porosity changes they expect for your hair specifically, and what they recommend immediately after the appointment to restore feel and reduce tangling.

### 7. What should I expect for maintenance, fading, and re-color timing?

Maintenance is where most people feel surprised,because “great on day one” doesn’t always translate to “great for months.” Ask how long the result typically lasts for your specific technique and shade. For example, highlights and toners may fade differently than all-over color. Gray coverage timelines also vary based on your natural regrowth pattern and the type of formula used.

Then ask when you should schedule the next appointment. A common mistake is waiting until the color looks noticeably off; a better strategy is often to plan based on when brassiness, fading, or regrowth becomes the main issue.

Also ask what to use at home to reduce brassiness and dryness. Your stylist might recommend a color-safe shampoo, a conditioner designed for chemically treated hair, and possibly a toner-supporting product for at-home maintenance. If you’re prone to dryness, ask for a routine that supports hydration without stripping your color.

If you’ve experienced hair loss in the past, ask whether color timing and scalp comfort could indirectly affect it. While hair dye doesn’t “cause” hair loss in the way some medical conditions do, irritation and inflammation can worsen shedding for some people,so the maintenance plan should include scalp care.

### 8. What are the aftercare rules for sensitive skin and scalp comfort?

Color aftercare isn’t just about shine,it’s also about skin comfort. Ask for specific instructions: how soon you can wash, how often to wash, and what to avoid (like harsh exfoliants or fragranced products) during the first days after coloring.

Also ask what symptoms mean you should stop and contact a professional. Because reactions can be delayed, it’s important to know what’s “normal” versus what’s a warning sign. The NHS notes that symptoms can take up to 72 hours to appear, so you should know what to watch for after you leave the salon.

Your stylist should also encourage you to follow safety precautions and manufacturer directions/labeling for hair dye use. The FDA emphasizes following manufacturer instructions and safety precautions when using hair dye. If you’re using any at-home products to maintain tone, ask which ones are safest for a sensitive scalp.

If you have eczema or a history of contact dermatitis, ask what precautions the salon takes to reduce exposure and irritation. And if you’ve ever had a reaction, share it clearly,what happened, how soon it happened, and what the skin looked like. That information helps them tailor the process.

### 9. What’s the total cost,and what could change the price?

No one wants a surprise at checkout. Ask for a clear quote that includes the service, any toning/corrective work, and the products used. Then ask what triggers additional cost.

Common price changes include extra toning to achieve the desired tone, corrective work if the hair doesn’t lift or deposit as expected, longer processing time, or additional products for protection and aftercare. If the salon offers a consultation or strand test, ask whether those have separate fees.

A helpful question is: “If we need to adjust during the appointment, how will you communicate that and confirm before proceeding?” Great salons will set expectations early and keep you in the loop.

### 10. How will you handle “color correction” if the result isn’t what I expected?

Even with excellent planning, results can vary,especially on previously dyed or bleached hair. Ask about the salon’s policy for remakes or corrections. Clarify the timeline: when they’ll assess the result, what happens if you’re unhappy, and what conditions apply.

Also ask what information they’ll need from you for correction. Photos are usually helpful, but be specific: ask whether they want close-ups of roots, mid-lengths, and ends, and whether they’ll review your product history.

Most importantly, ask how they set expectations before processing begins. The best time to discuss outcomes is before the color is mixed and applied,not after. A good stylist will explain what can be corrected in one session, what may require gradual adjustment, and how they’ll protect your hair while doing it.

### Conclusion

Asking questions before your color appointment isn’t just smart,it’s empowering. It helps you confirm the service and goal, choose the right shade strategy, and protect your hair’s health and your scalp comfort. It also sets you up for realistic maintenance expectations and a clear path forward if you need correction.

If you want one takeaway, make it this: safety and communication matter as much as the final tone. When you ask these 10 questions, you’re more likely to leave the salon feeling confident, comfortable, and excited about your color,not worried about what happens next.`,
		metaTitle: "10 Questions to Ask Before Your Hair Color Appointment",
		metaDescription: "Protect your results and scalp. Ask these 10 questions about shade, processing, patch tests, aftercare, cost, and correction."
	},
	{
		id: 10,
		slug: "bond-builders",
		tag: "Products",
		title: "Bond Builders: What They Are and Why Your Hair Needs One",
		excerpt: "The science behind bond-building treatments and why colorists swear by them.",
		author: "Dr. Sarah Kline",
		date: "Mar 24, 2026",
		readTime: "6 min",
		image: "/image/bond-builders.avif",
		category: "Products",
		section: "Hair Care",
		body: `Everyone says damaged hair needs a bond builder. The tricky part is that "bond builder" is not a tightly regulated term, and different products can work in different ways. Some claims are stronger than the evidence behind them. Some products may help hair behave stronger without literally rebuilding the exact bonds the marketing talks about.

The useful way to think about bond builders is this: they are treatments designed to support the inside of the hair fiber, not just coat the surface. That matters most for hair that has been bleached, colored, permed, relaxed, heat styled often, exposed to UV, or worn down by repeated brushing and washing.

### Start with the hair structure

Hair has a cuticle on the outside and a cortex on the inside. The cuticle is made of overlapping cells that behave a little like roof shingles, while the cortex contains long protein-rich cells that give hair much of its strength, shape, stretch, and resilience.

Inside those structures, hair proteins are held together by different types of bonds. Those bonds act like tiny points of connection between protein chains. When enough of them are disrupted, hair can become weaker, rougher, more porous, and more likely to snap.

There is also a cell membrane complex, often shortened to CMC, that helps hold hair structures together. Think of it as the material between the "bricks" of the hair fiber. Surface care still matters because the cuticle is the part you touch, see, brush, towel-dry, and style. But bond builders are usually positioned around what is happening deeper inside the fiber.

### The three main hair bonds

The bonds people usually mean when they talk about bond repair are:

- **Disulfide bonds:** Strong, relatively permanent bonds that have a major effect on hair strength and shape.
- **Ionic bonds:** Medium-strength salt bonds that can be affected by pH and chemical conditions.
- **Hydrogen bonds:** Weaker bonds that break and reform constantly with water, humidity, washing, and heat styling.

Disulfide and ionic bonds are usually changed most dramatically by chemical services. Hydrogen bonds are much more temporary, but there are a lot of them, so they still have a huge effect on how hair behaves day to day.

### Why damage makes hair weaker

Chemical treatments are the big source of bond damage. Bleach can disrupt many disulfide bonds, and permanent color can create some of the same stress. Perms and many straightening services intentionally break disulfide bonds, then try to reconnect them in a new shape. The problem is that not every bond rejoins neatly.

Heat styling and UV exposure are usually less dramatic than bleach, but their effects build over time. Regular brushing, washing, towel friction, humidity changes, and styling tension also add to the wear.

When bonds break, hair needs less force to stretch, distort, or snap. Tiny protein fragments can also loosen and leave gaps inside the fiber. On the outside, that can show up as breakage, roughness, looser curl pattern, frizz, tangles, and ends that feel weak or "mushy."

### How bond builders probably work

This is where the science gets murky. There is not a lot of independent, high-quality, head-to-head research comparing bond-builder ingredients or finished products. Beauty research is often industry funded, and that does create conflicts of interest. At the same time, large cosmetic companies and specialist labs may have better equipment, more samples, and more experience running hair tests than independent academic groups.

The best current big-picture read is that many bond builders may not work by directly repairing disulfide bonds in the simple way brands sometimes describe. A lot of reliable evidence points toward a more practical mechanism: they help reduce water's ability to disrupt the hair fiber.

Water breaks hydrogen bonds between hair proteins. When water gets in, proteins stop "holding hands" with each other and interact with water instead. Some bond-building ingredients can act like connectors with more than one bonding site. They can form hydrogen bonds, and sometimes ionic interactions, between parts of the hair protein. That creates a different kind of internal support.

That may sound different from repairing disulfide bonds, and it is. But from the hair's point of view, another kind of "glue" can still help. Hydrogen bonding sites are much more common on hair proteins than sulfur sites, so ingredients that can form multiple hydrogen bonds have many more possible places to attach.

### Why blocking water matters

Damaged hair often absorbs more water because it has more gaps and a more compromised structure. More water swelling can make hair more fragile, especially during washing and detangling.

Some bond builders may help by taking up space, attaching to protein sites, and making it harder for water to get in and loosen the structure. If the fiber swells less and holds together better, hair can feel smoother, tangle less, and break less during normal handling.

For coloring and bleaching, some bond builders may also help limit damage in secondary ways. They may reduce swelling so lightener penetrates in a more controlled way, or they may bind metal ions that would otherwise contribute to extra oxidative damage during bleach services.

### Common bond-builder ingredient families

Different brands use different ingredient stories, but many bond-building ingredients have something in common: they contain groups that can form hydrogen bonds, ionic bonds, or both.

Common examples include:

- **Bis-aminopropyl diglycol dimaleate:** The ingredient associated with Olaplex.
- **Maleic acid:** Used in some professional bond-building systems.
- **Citric acid:** Seen in acidic bonding lines from brands like Redken and L'Oreal.
- **Malic acid and succinic acid:** Smaller acids that have appeared in bond-care patents and products.
- **Panthenol:** A classic hair-care ingredient that can hydrogen bond and has newer research around bond-building behavior.
- **Phytic acid and gluconolactone:** Used in some repair-focused formulas.
- **Hydroxypropyl gluconamide and hydroxypropyl ammonium gluconate:** Found in several bond-repair retail products.
- **Arginine:** An amino acid used in some damage-repair lines.
- **Peptides and hydrolyzed proteins:** Protein fragments that can attach to hair and may support the fiber through multiple hydrogen-bonding sites.

The ingredient list alone does not tell the full story. A finished formula matters: pH, solvent system, conditioning agents, concentration, product format, and how well the ingredient can penetrate damaged hair all change the result.

### What about Olaplex-style disulfide repair claims?

Olaplex helped make bond builders famous, and it deserves credit for turning bond repair into a mainstream category. But the original explanation of exactly how its ingredient repaired disulfide bonds has been debated.

The important consumer takeaway is not that Olaplex "does nothing." It is that a product can improve damaged hair while the marketing explanation is incomplete, simplified, or not fully proven. Similar results from ingredients with very different structures suggest that many bond builders may be helping through broader hydrogen-bonding, water-control, ionic, or conditioning effects rather than one neat disulfide-repair pathway.

### Why some bond builders make hair feel worse

If a bond builder makes your hair feel rough, dry, or more breakage-prone, it may not be giving your hair enough surface conditioning. Hair still needs slip. If the surface is not smooth, strands snag on each other, brushes, towels, and clothing. That friction can cause more breakage even if the product is doing something helpful inside the fiber.

Some formulas also include proteins or film-formers that certain hair types find stiff or rough. That does not mean all bond builders are bad for your hair; it means the formula may not match your hair's damage pattern, texture, porosity, or conditioning needs.

### How to choose a bond builder

Look for a product with ingredients that have some evidence behind them, but do not shop by ingredient name alone. Read reviews from people with hair like yours: similar texture, similar damage, similar color history, and similar styling habits.

If you want to test a product properly, try it consistently for a few weeks. The most useful signs are practical ones:

- Less snapping during detangling
- Ends that feel stronger instead of limp or mushy
- Less roughness after washing
- Hair that tangles more slowly
- Curls or waves that hold their shape better
- Color-treated hair that feels less fragile between appointments

For a more controlled experiment, apply the product to one side or one section of your hair and compare it with the untreated side over several washes. Hair is variable, so a side-by-side test can tell you more than one dramatic first impression.

### Bond builders are not a full routine

Bond builders are not a replacement for conditioner, masks, gentle cleansing, heat protection, trims, or lower-tension styling. They are one part of a damage-care routine.

If your hair is bleached, vivid-colored, relaxed, permed, or heat-styled often, pair bond care with:

- A gentle shampoo that does not leave your hair squeaky or stripped
- A conditioner with enough slip for detangling
- A moisturizing mask when hair feels dry or rough
- Heat protectant before hot tools
- Lower heat settings whenever possible
- Careful detangling from ends upward

### Bottom line

Bond builders can be useful, especially for hair that has been chemically processed or repeatedly stressed. But the category is more complicated than "this product rebuilds broken disulfide bonds." Many products may work by forming other helpful connections inside the hair, reducing water-related swelling, improving internal support, or adding enough structure that damaged hair breaks less easily.

Choose based on your hair's actual behavior, not just the boldest claim on the bottle. If the product helps your hair feel stronger, tangle less, and snap less while still staying soft and conditioned, that is the result that matters.

**CTA:** If your hair feels rougher, tangles faster, or keeps snapping after processing or styling, consider adding a bond builder to your wash routine. Start with the product directions, commit for a few weeks, and build a full regimen that includes moisture and protection so your strands can stay strong.`,
		metaTitle: "Bond Builders 101: What They Are & How to Use Them",
		metaDescription: "Learn what bond builders do, how they differ from conditioner, who benefits most, and how to use them correctly to reduce breakage."
	},
	{
		id: 12,
		slug: "solo-stylist-blueprint",
		tag: "Business",
		title: "The $100K Solo Stylist Blueprint",
		excerpt: "The exact milestones that separate growing stylists from stalled ones, from pricing logic and service menus to rebooking systems and the numbers that actually matter.",
		author: "Dana Reeves",
		date: "Mar 20, 2026",
		readTime: "14 min",
		image: "/image/solo-stylist-blueprint.avif",
		category: "Business",
		section: "Inspiration",
		body: `A solo stylist does not reach $100K because every appointment is perfect. They reach it because every appointment connects to a system.

The client knows what to book first. They understand why maintenance matters. They know how pricing works. They leave with a plan, not just a finished style.

That is the difference between being busy and building a business.

For this blueprint, $100K means annual gross service revenue, not take-home pay. A solo stylist still has business expenses: suite rent or booth rent, color, back-bar product, tools, towels, insurance, booking software, card processing fees, education, marketing, and taxes. The U.S. Bureau of Labor Statistics reported the May 2024 median hourly wage for hairdressers, hairstylists, and cosmetologists at $16.95, which shows why a stylist aiming for $100K has to think beyond simply taking more appointments. The path is not just more labor. It is better structure.

Whether your specialty is pastel-to-vivid color, blonding, lived-in brunettes, extensions, curls, smoothing, or precision cutting, the business problem is the same: your craft needs a repeatable client journey.

## The $100K Math

A $100K year breaks down like this:

| Revenue Target | Number |
|---|---|
| Annual gross revenue | $100,000 |
| Monthly gross revenue | $8,333 |
| Weekly gross revenue, assuming 48 working weeks | $2,083 |
| Daily gross revenue, 5 client days per week | $417 |
| Daily gross revenue, 4 client days per week | $521 |
| Daily gross revenue, 3 client days per week | $694 |

This is where the goal becomes less abstract. A solo stylist does not need to guess whether they are “doing well.” The schedule either supports the target or it does not.

Here is what that looks like by average ticket:

| Average Ticket | Clients Needed Per Week to Reach $100K Gross |
|---|---|
| $150 | 14 clients/week |
| $175 | 12 clients/week |
| $200 | 11 clients/week |
| $250 | 9 clients/week |
| $300 | 7 clients/week |
| $350 | 6 clients/week |

The takeaway is simple: a $100K solo stylist is usually not built on random walk-ins and underpriced appointments. It is built on a controlled mix of average ticket, rebooking, maintenance services, and schedule discipline.

If you work 4 client days per week, your daily target is about $521 before expenses. If you have 6 true bookable client hours in a day, your gross hourly target is about $87. If you only have 5 bookable client hours, it is about $104. That does not mean every service needs to be priced hourly, but it does mean every service has to respect the amount of chair time it takes.

## Milestone 1: Choose a Specialty Clients Can Understand

A stylist can be talented at many things, but a solo business grows faster when the client can clearly understand what you are known for.

For example, “I do hair color” is broad. “I specialize in soft blonding and lived-in color” is clearer. “I specialize in pastel-to-vivid creative color with a hair-health-first process” is even more specific.

A strong specialty does three things:

- It tells clients what result you are best at.
- It helps you build a service menu around repeatable appointments.
- It makes your content easier to create because your work has a clear point of view.

For a pastel-to-vivid color specialist, the brand differentiator is not only the final color. It is the process: consultation, hair history, strand testing, realistic timing, color placement, tone maintenance, and aftercare. That is what turns a one-time dramatic appointment into a client relationship.

The milestone is not “I can do the service.” The milestone is: clients know when to choose you.

## Milestone 2: Build a Service Menu That Guides the Next Booking

A stalled stylist often has a menu that lists services. A growing stylist has a menu that guides the client through a path.

Your menu should answer three client questions:

- What do I book first?
- What happens during the appointment?
- When do I come back?

For a color-focused solo stylist, the menu can be built around this structure:

| Service | Purpose | Best For | Rebooking Logic |
|---|---|---|---|
| New Client Consultation | Assess goals, hair history, budget, timing, and maintenance ability | New color clients, corrections, vivid transformations | Leads into full service, prep session, or correction plan |
| Signature Color Service | Main creative or corrective appointment | Pastel, vivid, blonding, major transformations | Follow-up refresh or gloss |
| Maintenance Refresh | Keep tone, brightness, and shape controlled | Existing clients whose color is fading | Every 4 to 8 weeks, depending on formula and home care |
| Gloss or Toning Visit | Adjust warmth, dullness, or fading | Blondes, brunettes, fashion shades | Every 6 to 10 weeks |
| Strength Support or Prep Session | Improve readiness before bigger color work | Fragile, compromised, or high-risk hair | Before transformation or between color sessions |
| Color Correction Roadmap | Multi-step repair and color reset | Box dye, banding, uneven lift, overprocessed hair | Consultation required before booking |

This kind of menu helps clients understand that color is not a single event. It is a process.

Add-ons can include glossing, toning, bond-support care, conditioning treatments, extra product for long or dense hair, haircut reshaping, or take-home aftercare. But the core service should never feel incomplete without add-ons. Add-ons should refine the result, not patch holes in the service.

## Milestone 3: Price With Logic, Not Fear

Pricing is one of the biggest reasons solo stylists stall. They quote too quickly, undercharge complicated work, and then try to make up the difference by squeezing too many clients into the week.

A better pricing system is based on four variables:

- **Time:** how many hours the appointment requires.
- **Complexity:** blonding, correction, vivid placement, density, length, and previous color history.
- **Product cost:** color, lightener, toner, treatment, back-bar usage.
- **Risk and expertise:** the skill required to protect the hair and deliver the result safely.

A practical quote should sound clear, not apologetic.

For example: “Based on your hair history and the result you want, this is a transformation appointment, not a standard color refresh. The starting range is based on time, density, product, and whether we need extra prep. After the consultation and strand test, I can give you the most accurate plan.”

That kind of language helps the client understand that pricing is not random. It is connected to the work.

For creative color, corrections, or major blonding, avoid giving final pricing from a single photo. Photos help, but they do not show porosity, previous layers of color, breakage risk, or how the hair will lift. A consultation protects both the stylist and the client.

> If a service takes half your day, it needs to produce half your daily revenue target or more.

If your daily target is $521 and a transformation takes 5 hours, that appointment cannot be priced like a simple gloss. Otherwise, your calendar looks full but your business still underperforms.

## Milestone 4: Turn Maintenance Into a Normal Part of the Result

A client should never leave wondering, “When do I come back?”

For color clients, especially pastel, vivid, blonde, or corrective color clients, maintenance is not an upsell. It is part of the result. Vivid tones fade. Blondes warm up. Glosses soften. Roots grow. Ends lose polish. If the client does not understand the maintenance rhythm, they may blame the service instead of the natural life cycle of the color.

A strong rebooking script sounds like this: “To keep this tone looking intentional, I’d like to see you in about six weeks for a refresh. That visit is shorter than today, and it keeps the color from fading too far before we correct it.”

This is how a stylist builds predictable income without sounding pushy. You are not selling a random appointment. You are protecting the work the client already invested in.

A simple retention rhythm:

- Before checkout: recommend the next visit.
- After the appointment: send aftercare instructions.
- Two to three weeks later: check in on tone, fading, and home care.
- Four to eight weeks later: bring the client back for maintenance.
- Every few visits: reassess shape, color direction, and long-term goals.

The milestone is not “I got a client to book once.” The milestone is: the client understands their maintenance plan before they leave.

## Milestone 5: Create Content That Converts, Not Just Content That Looks Pretty

Hair content should do more than show the final photo. It should reduce client anxiety.

Clients want to know: Can you get me close to this result? Will my hair survive the process? How long will it take? How much maintenance will it need? What should I book? Is my current hair a good starting point?

A strong solo stylist content system answers those questions every week.

| Content Type | Purpose |
|---|---|
| Before-and-after post | Show transformation and result quality |
| Process reel | Show the steps, not just the finish |
| Hair health education | Build trust around porosity, lightening, fading, and maintenance |
| Formula direction story | Explain the color family or technique without exposing every professional detail |
| Client maintenance reminder | Normalize refresh visits |
| Availability post | Turn attention into bookings |
| Testimonial or client reaction | Add social proof |

For a pastel-to-vivid color specialist, a caption should not only say, “Purple transformation.” It should explain the work: “This client came in with previous warmth through the mids and ends, so our goal was not just vivid color. The first priority was creating an even canvas. We lifted carefully, adjusted tone, then placed the vivid shade in a way that would fade softer over time. Maintenance: refresh in 6 weeks, color-safe wash routine, and lower heat styling.”

That caption tells the client you are not guessing. You are planning.

Every content post should lead somewhere. Use a clear booking link, consultation form, or call to action. A post without a next step is just a portfolio piece. A post with a next step becomes part of your revenue system.

## Milestone 6: Protect the Business With Policies

A solo stylist is not just behind the chair. They are also the front desk, scheduler, service provider, bookkeeper, marketer, and client experience manager.

Policies are not there to make the business feel cold. They protect the quality of the work.

At minimum, a solo stylist should have:

- Deposit policy
- Cancellation and no-show policy
- Late arrival policy
- New client consultation form
- Color history form
- Photo consent form
- Service consent for chemical work
- Correction policy
- Refund or adjustment policy
- Maintenance timing guidance
- Aftercare instructions

The adjustment policy is especially important. Clients need to know the difference between a service issue and normal color fading. A good policy does not need to sound harsh. It can sound professional: “Color adjustments must be requested within 7 days of the appointment. This does not include normal fading, changes caused by home care, hard water, heat styling, or products outside the recommended routine.”

That kind of language sets boundaries before there is a problem.

## Milestone 7: Build the Boring Foundation Before Scaling

Before pushing for bigger color services, more clients, or higher-ticket appointments, the business foundation has to be clean.

In the U.S., the basics usually include choosing a business structure, registering the business where required, getting federal and state tax IDs if applicable, applying for the required licenses and permits, opening a business bank account, and getting business insurance. The SBA notes that registration requirements depend on business structure and location, and that license and permit requirements vary by activity, location, and government rules.

Cosmetology licensing is also state-based. The Bureau of Labor Statistics states that all states require barbers, hairstylists, and cosmetologists to be licensed, typically through a state-approved program and exam. If your business structure requires an EIN, apply through the IRS directly, getting an EIN online is free.

The business foundation should include:

- Cosmetology license in good standing
- Local business license or registration, if required
- Sales tax setup, if applicable to your services or retail
- Professional liability insurance
- Booking and payment system
- Business bank account
- Separate business records
- Formula and client history records
- Signed intake and consent forms

This section is not glamorous, but it matters. A stylist cannot scale cleanly if the foundation is messy.

## Milestone 8: Track the Numbers That Actually Matter

A stalled stylist tracks how full the calendar feels. A growing stylist tracks the numbers that explain the business.

| Metric | Why It Matters |
|---|---|
| Gross revenue | Shows whether you are moving toward the $100K target |
| Average ticket | Shows whether pricing and service mix are working |
| Clients per week | Shows whether demand is strong enough |
| Rebooking rate | Shows whether clients are returning |
| New client inquiries | Shows whether marketing is producing demand |
| Consultation-to-booking conversion | Shows whether your consultation process works |
| No-show or cancellation rate | Shows whether policies need tightening |
| Top revenue service | Shows what should be featured more |
| Lowest-margin service | Shows what may need repricing or removal |
| Maintenance bookings | Shows whether clients understand the long-term plan |

These numbers prevent emotional business decisions. A slow week does not automatically mean the business is failing. A full week does not automatically mean the business is profitable.

## A 30/60/90 Plan for the Solo Stylist

### First 30 Days: Build the Foundation

The first 30 days are about clarity. Set up your menu, policies, consultation form, booking flow, and core content direction. Decide what your specialty is and what kind of client you want to attract. Build a small but strong portfolio around your best work.

By the end of the first 30 days, you should have:

- A clear service menu
- Consultation and intake forms
- Deposit and cancellation policies
- A booking link
- A photo consent process
- 10 to 15 strong portfolio images
- A basic aftercare guide
- A defined specialty statement

Example specialty statement: “I specialize in soft blonding and pastel-to-vivid color with a hair-health-first approach, clear maintenance plans, and realistic transformation timing.”

### Days 31 to 60: Build Demand

Once the foundation is clean, focus on visibility. Post consistently. Explain your work. Show transformations. Show maintenance. Show why a consultation matters. Start building referral relationships with photographers, makeup artists, bridal vendors, local boutiques, gyms, barbershops, or other beauty professionals who serve a similar client base.

By the end of 60 days, you should be tracking how many inquiries you receive each week, which posts lead to booking requests, which services clients ask about most, which questions come up repeatedly, and how many consultations convert into appointments.

This is where content becomes market research. If clients keep asking the same question, turn it into a post. If clients are confused about pricing, create a pricing-explainer story. If clients do not know what to book, simplify your menu language.

### Days 61 to 90: Improve Retention and Pricing

By the third month, you should have enough information to refine. Look at your calendar. Which appointments are profitable? Which ones take too long for the price? Which clients rebook? Which services create the most stress but the least revenue?

By the end of 90 days, you should have a clear average ticket, a weekly revenue target, a rebooking script, a maintenance service or package, a stronger consultation process, a list of services to feature more, and a list of services to reprice, restructure, or remove.

This is the point where the business starts becoming less reactive.

## What Separates a Growing Stylist From a Stalled Stylist

A stalled stylist says: “I just need more clients.” “I don’t know what to charge.” “People keep asking for quotes from photos.” “Clients do not come back consistently.” “My calendar is full, but I still feel broke.”

A growing stylist says: “I know my weekly revenue target.” “I know my average ticket.” “I know which services are profitable.” “My clients know when to come back.” “My pricing is tied to time, complexity, and product use.” “My content tells clients what to book.”

The difference is not talent. The difference is structure.

## Final Stylist Takeaway

A $100K solo stylist business is not built from random busy weeks. It is built from repeatable offers, confident pricing, clear client communication, strong rebooking habits, and clean business operations.

The craft gets the client in the chair. The system brings them back.

When your menu, pricing, content, policies, and maintenance rhythm all work together, your business becomes easier for clients to understand and easier for you to manage.

That is the real blueprint: not just doing beautiful hair, but building a chair that can support the stylist behind it.`,
		metaTitle: "The $100K Solo Stylist Blueprint: 8 Milestones to Six Figures",
		metaDescription: "A practical roadmap for solo stylists to reach $100K gross  --  covering pricing logic, service menus, rebooking systems, content strategy, and the numbers that actually matter."
	},
	{
		id: 13,
		slug: "what-is-balayage",
		tag: "Technique",
		title: "What Is Balayage? Your Stylist Explains",
		excerpt: "Everything you need to know about the freehand coloring technique that changed the industry, and why no two results look the same.",
		author: "Michelle Torres",
		date: "Apr 10, 2026",
		readTime: "7 min",
		image: "/image/what-is-balayage.avif",
		category: "Technique",
		section: "Trends",
		body: `Balayage used to mean one thing to clients. Soft, beachy highlights and a Pinterest reference from ten years ago. What we're seeing in salons now is much more considered. The color sits deeper at the root, the brightness is placed with intention, and the finish reads expensive without looking overworked. In 2026, balayage is not just a look clients ask for. It is a technique stylists build around the person in the chair.

## What Balayage Really Means

At the most basic level, balayage is a hand-painted lightening technique. No strict foil pattern, no uniform sections. Color is applied where the stylist wants light to live. But that definition is only half the story.

> “Balayage is not about painting randomly. It is controlled placement. If you do it right, the client should not see where it starts. They just see better hair.”
> — Nina Patel, Colorist & Educator, Chicago

That is the goal every time. Seamless, grown-in color that looks natural even when it is not.

## Why Clients Keep Coming Back to It

Balayage fits how people actually maintain their hair now. Clients want dimension without feeling locked into a schedule. They want something that grows out softly, especially if they are juggling work, travel, and everything else.

This is why balayage continues to outperform traditional highlights in most salons:

- No harsh regrowth line
- Longer time between appointments
- Works on straight, wavy, and curly hair
- Adapts to different haircuts, from long layers to a pixie cut

It also photographs well, which matters more than ever. The soft blend and brightness around the face translate on camera in a way flat color does not.

## Balayage vs Highlights, Explained Simply

This is where clients get mixed up, so we explain it every day. Traditional highlights are structured. They rely on foils, consistent sectioning, and root-to-end lift. The result is brighter but more uniform.

Balayage is different. It is visual, not mechanical.

- Light is painted where it flatters
- The root stays softer or shadowed
- The ends carry more brightness
- The overall effect is blended, not striped

Most of the best work we see now is actually a combination. A few foils at the hairline, balayage through the lengths, and a toner or gloss to finish.

## Why No Two Balayage Clients Look the Same

If balayage looks identical on every client, something is off. A good stylist is adjusting everything in real time:

- Natural base color
- Hair density and texture
- Previous color history, especially bleach
- Skin tone and undertone
- Overall hair health

> “On curly clients, I am painting for how the hair falls dry, not how it looks wet. You have to respect the pattern or the color disappears.”
> — Alana Brooks, Curl Specialist

That is why balayage on curly hair often looks softer but more dimensional. The placement follows movement, not sections.

## What Happens During a Real Balayage Appointment

From the outside, it can look simple. A brush, some lightener, and a few painted pieces. Behind the chair, it is much more controlled.

**Sectioning based on the haircut**, The color follows layers and shape, not a perfect grid.

**Soft diffusion at the root**, No hard starting lines. Everything is blended upward.

**Controlled saturation**, Too little product leads to patchy lift. Too much creates heavy bands. This is where experience shows.

**Focused brightness**, The face frame and part line get the most attention. That is what clients notice first.

**Toning and finishing**, A gloss or toner refines the result, adds shine, and locks in tone. This step is what makes balayage look polished instead of unfinished.

## Maintenance, According to Stylists

Balayage is lower maintenance, but it is not maintenance-free. Color fades, especially on lighter pieces. Tone can shift warmer over time. And lightened hair needs support.

What we are recommending in salons right now:

- A shampoo for color-treated hair to hold tone
- A lightweight leave-in treatment for shine
- A hair moisturizer or protein treatment if the ends feel dry
- Regular scalp care to keep the foundation healthy

> “You cannot have expensive-looking color sitting on an unhealthy scalp. The finish starts at the root, literally.”
> — Marcus Bell, Colorist, London

## When Balayage Is Not a One-Session Service

This is the part clients do not always expect. If the hair has box dye, heavy previous color, or damage, lifting to a bright balayage in one appointment is not always realistic.

In those cases, stylists are spacing it out and protecting the hair:

- Bond-building or protein treatments during the service
- Hair breakage treatment after
- Sometimes the best decision is to slow down, health first, then brightness

## Why Stylists Prioritize Balayage

There is a reason balayage is on almost every service menu. It allows for customization, which means better results and higher service value. It also creates visible transformation without constant upkeep, which keeps clients loyal.

And from a business standpoint, it opens the door to retail. Haircare products, glosses, and treatments all support the color and extend the result.

## The Bottom Line

Balayage today is not a trend clients bring in on their phone. It is a core skill that defines how modern color is done. Done well, it grows out clean, complements the haircut, and works with the client's natural features instead of fighting them.

> “Good balayage should look like you were born with it. Great balayage makes people ask where you go.”
> — Nina Patel`,
		metaTitle: "What Is Balayage? Your Stylist Explains Everything",
		metaDescription: "A stylist breaks down what balayage really is, how it differs from highlights, what happens during the appointment, and how to maintain it."
	},
	{
		id: 14,
		slug: "stylist-notices-thinning",
		tag: "Hair Thinning",
		title: "What Your Stylist Notices About Thinning Before You Do",
		excerpt: "Hair loss rarely shows up the way clients expect. By the time you notice it, your stylist has usually been tracking it for months.",
		author: "Lauren Chavez",
		date: "Apr 12, 2026",
		readTime: "8 min",
		image: "/image/tylist-notices-thinning.avif",
		category: "Hair Thinning",
		section: "Hair Care",
		body: `Hair loss rarely shows up the way clients expect it to. There is no dramatic moment, no overnight bald spot for most people. What actually happens is slower, quieter, and much easier to catch from behind the chair than in your own mirror.

By the time a client says, “I feel like my hair is thinning,” their stylist has usually been tracking it for months.

## The First Signs Are Not What You Think

Most people look for shedding. Hair on the brush, hair in the shower, more strands on the floor. But that is not what stylists clock first.

It is density.

> “We notice it in the ponytail before anything else. The elastic wraps one extra time. The braid feels smaller. That is the first flag.”
> — Lauren Chavez, Senior Stylist, Miami

Other early signs we see every day:

- A wider part, especially under bright light
- Less fullness around the hairline or temples
- The crown laying flatter than usual
- Ends looking thinner even after a fresh haircut

This is what professionals refer to as **diffuse thinning hair**, and it often shows up long before visible hair loss or bald patches.

## The Hairline Tells the Story First

Clients rarely study their own hairline closely. Stylists do.

Subtle changes around the front can signal early hair thinning patterns or even the beginning of a receding hairline in women, which is more common than most people think.

> “We are looking at baby hairs, density at the temples, and how the hair frames the face. When that starts to shift, it is usually not just breakage. It is something systemic.”
> — Marcus Bell, Colorist, London

This is especially relevant for clients dealing with:

- Hormonal shifts like postpartum hair loss or perimenopause hair loss
- Conditions like PCOS hair thinning or thyroid hair loss
- Stress-related shedding, also known as telogen effluvium

## Texture Changes Before Volume Loss

One of the biggest tells is not less hair. It is different hair.

Clients will say their hair feels dry, frizzy, or harder to style. What stylists often see is a change in strand quality tied to thinning.

- Hair feels finer through the mid-lengths
- Ends tangle more easily
- Styles do not hold the same way

This is where people start reaching for more hair serum or heavier moisturizers, thinking it is a texture issue. Sometimes it is. But sometimes it is early-stage thinning.

## The Scalp Is a Dead Giveaway

Stylists spend more time looking at your scalp than you do. That matters.

A healthy scalp supports growth. A compromised one often shows early warning signs of hair loss.

We are looking for:

- Increased scalp visibility
- Redness or irritation
- Flaking linked to dandruff
- Tightness or dryness from lack of proper scalp care

> “Clients underestimate how much scalp condition affects hair growth. If I see dryness or buildup, I am already thinking about scalp treatment before we even talk color.”
> — Dana Reeves, Salon Owner, Nashville

This is why more salons are recommending in-salon scalp treatments, at-home dry scalp routines, and regular use of scalp oils or targeted treatments.

## Breakage vs Thinning, and Why It Matters

Not all thinning is true hair loss. Sometimes it is breakage, especially in clients using heat tools, bleach, or aggressive styling.

Signs of breakage:

- Short, uneven pieces around the crown
- Frayed ends that do not improve with trimming
- Damage from bleach or repeated chemical services

True thinning, on the other hand, affects the root. The hair simply is not growing back at the same density.

> “Clients confuse damaged hair with thinning hair all the time. They will buy every damaged hair treatment on the shelf when what they actually need is to address growth.”
> — Nina Patel, Colorist & Educator, Chicago

## When Stylists Start Talking About It

Most stylists do not bring up hair loss immediately. It is a sensitive topic, and early changes can be subtle.

But once patterns are consistent, the conversation shifts. That might include:

- Recommending volumizing shampoo and conditioner for fine or thinning hair
- Suggesting products that support the scalp
- Adjusting color placement to create the illusion of density
- Talking through treatments like PRP or topical options like minoxidil

> “Sometimes my job is not to fix it in one appointment. It is to help the client understand what is happening early enough that they have options.”
> — Lauren Chavez, Senior Stylist, Miami

## The Role of Haircare in Early Thinning

What clients use at home matters more than they think. Stylists are increasingly steering clients toward:

- Professional hair care products over harsh formulas
- Lightweight leave-in treatments instead of heavy buildup
- Gentle, scalp-friendly formulas that do not cause irritation
- Targeted solutions like shampoo for hair fall or growth-focused serums

There is also a shift toward routines that support long-term scalp health, not just styling.

## Cutting and Styling for Thinning Hair

A good haircut can make thinning less noticeable immediately. We are seeing stylists lean into:

- Layered haircuts for movement and lift
- Shorter shapes like a pixie cut or soft bob to create density
- Avoiding heavy, one-length cuts that emphasize thin ends

Even styling matters. The right mousse or styling foam can create fullness without weighing the hair down.

## The Bottom Line

Hair thinning does not start when you notice hair falling out. It starts much earlier, in ways that are easy to miss unless you are trained to look for them.

Stylists see it in the part, the ponytail, the scalp, and the subtle changes in how your hair behaves.

> “By the time a client is worried, we have usually already seen it coming. The advantage is, if you catch it early, you can actually do something about it.”
> — Marcus Bell, Colorist, London

Pay attention to small changes. Invest in the right haircare. And listen when your stylist brings it up, because in most cases, they are not guessing. They are noticing what you cannot see yet.`,
		metaTitle: "What Your Stylist Notices About Hair Thinning Before You Do",
		metaDescription: "Stylists track hair thinning long before clients notice it. Here is what they see first, and what you can do about it early."
	},
	{
		id: 15,
		slug: "layers-thin-hair",
		tag: "Cut & Style",
		title: "Why Layers Can Either Help or Ruin Thin Hair",
		excerpt: "Layers are one of the most misunderstood tools for thin hair. Done right, they create volume. Done wrong, they make things worse. Here is the difference.",
		author: "Tom Harley",
		date: "Apr 14, 2026",
		readTime: "7 min",
		image: "/image/layers-thin-hair.avif",
		category: "Cut & Style",
		section: "Trends",
		body: `Layers are one of the most misunderstood tools in a stylist's arsenal, especially when it comes to thin hair. Clients walk in asking for "more volume" and assume layers are the answer. Sometimes they are. Sometimes they are exactly what causes the problem.

What matters is not whether you add layers. It is how, where, and how much.

## The Promise of Layers (When They Work)

Done right, layers can completely shift how thin hair looks and moves. They create lift, break up flat sections, and give the illusion of density.

> “Thin hair does not need more hair. It needs better structure. That is what layers are supposed to do.”
> — Nina Patel, Salon Educator, Chicago

When executed well, layers can:

1. **Add movement** so hair does not sit flat against the scalp
2. **Create volume at the crown**, especially for crown thinning concerns
3. **Support styling**, making it easier to use volumizing products for fine hair
4. **Enhance shape**, particularly with layered cuts or a soft fringe

This is where layering becomes a tool for correction, not just style.

## Where It Goes Wrong

The issue is not layers themselves. It is over-layering.

Thin hair cannot afford to lose too much weight. Once you remove too much density, the ends start to collapse, and the hair can look even thinner than before.

> “We see this all the time. Someone comes in with thin hair and leaves with less of it. Too many layers, and suddenly the perimeter disappears.”
> — Marcus Bell, Colorist, London

Here is where layers start to work against you:

1. **Over-thinning the ends**, The fastest way to make hair look sparse. The bottom line should feel solid, not wispy.
2. **Short layers at the crown**, Too much creates separation, exposing more scalp.
3. **Ignoring hair density**, Fine hair and low-density hair both require restraint.
4. **Cutting for movement instead of fullness**, Movement matters, but fullness is the priority with thin hair.

## The Line Between Volume and Loss

This is where professional judgment comes in. Stylists are constantly balancing two things: creating lift and movement, and preserving as much visible density as possible.

> “You cannot cut your way out of thinning hair. You can only cut in a way that respects it.”
> — Dana Reeves, Stylist, Nashville

If a client is already experiencing hair fall or early thinning, aggressive layering can exaggerate the issue.

## How Stylists Approach Layers for Thin Hair Now

The approach has shifted over the last few years. It is less about dramatic shape and more about subtle engineering.

### Keeping the perimeter strong

The baseline of the haircut stays blunt or slightly softened. This maintains the appearance of thickness.

### Adding internal layers only

Instead of visible layers, stylists remove weight from inside the haircut. The outside still looks full.

### Focusing on the crown strategically

A small amount of lift at the crown can help, but it has to be controlled.

### Customizing for texture

Clients with wavy or curly hair may need different layering to avoid frizz or collapse.

### Pairing with the right styling routine

Layers only work if the client can style them. This often includes:

- Volumizing shampoo and conditioner
- Lightweight mousse or styling foam
- A targeted hair serum for ends without weighing them down

## The Role of Hair Health

Layers will not fix compromised hair. If the hair is dealing with severe breakage, damage from bleach, or chronic dryness, layering too much will expose those weak areas.

Treatment comes first:

- Protein treatment to strengthen strands
- Hair breakage treatment to reduce snapping
- Regular scalp treatment to support growth at the root

> “Healthy hair holds a shape. Damaged hair falls apart. No haircut can override that.”
> — Nina Patel, Salon Educator, Chicago

## When Shorter Cuts Make More Sense

Sometimes the solution is not more layers. It is less length.

Shorter cuts can instantly create the illusion of density:

- A pixie cut concentrates fullness at the crown
- A soft bob keeps weight at the perimeter
- A structured short cut can make thinning less noticeable

This is especially true for clients dealing with ongoing thinning or progressive hair loss.

## What Clients Should Actually Ask For

Instead of asking for layers, the better conversation is about outcome.

A good consultation sounds like:

- “I want my hair to look fuller”
- “I feel like my ends are thin”
- “My crown looks flat”

From there, the stylist decides how much layering is appropriate. Because layers are not a universal fix. They are a precision tool.

## The Bottom Line

Layers can be one of the best things you do for thin hair or the fastest way to make it look worse. The difference comes down to restraint, placement, and understanding what the hair can handle.

> “With thin hair, every snip shows. You are either building density or taking it away. There is no neutral.”
> — Marcus Bell, Colorist, London

Keep the strength, create the illusion, and support it with the right products and styling routine. That is what makes layers work.`,
		metaTitle: "Why Layers Can Either Help or Ruin Thin Hair",
		metaDescription: "Layers are a precision tool for thin hair, not a universal fix. Here is how stylists use them to build density, and where they go wrong."
	},
	{
		id: 16,
		slug: "gua-sha-scalp",
		tag: "Hair Thinning",
		title: "Gua Sha for Scalp: The Treatment Stylists Are Watching Closely",
		excerpt: "Gua sha has had its face moment. Now stylists are paying attention to what it can do for the scalp, and where it fits into a serious hair care routine.",
		author: "Marissa Chen",
		date: "Apr 16, 2026",
		readTime: "9 min",
		image: "/image/gua-sha-scalp.avif",
		category: "Hair Thinning",
		section: "Hair Care",
		body: `Gua sha has already had its beauty-world moment for the face. The sculpted cheekbones, the lymphatic drainage claims, the jade tools sitting on every bathroom shelf. But behind the chair, the more interesting shift is happening higher up: clients are now asking about gua sha for the scalp.

And stylists are paying attention.

Not because it is a miracle cure for hair loss or hair thinning. It is not. But because scalp work is becoming a serious part of modern hair care, and gua sha fits neatly into that conversation. It sits somewhere between massage, ritual, circulation support, and a more intentional way to apply scalp products.

> “The scalp has been ignored for too long. Clients will spend $300 on hair color products, then forget that the hair grows from skin. Gua sha makes them pay attention to the root.”
> — Marissa Chen, Scalp-Focused Stylist, Los Angeles

That is exactly why it is showing up in salons, treatment rooms, and at-home routines.

## What Is Scalp Gua Sha?

Scalp gua sha uses a smooth-edged tool to gently massage and scrape across the scalp. The technique comes from traditional East Asian bodywork, where gua sha is used on the skin to encourage movement, release tension, and support circulation.

For the scalp, the pressure is lighter and the goal is different. You are not trying to aggressively scrape the skin. You are trying to wake up the scalp, loosen tight areas, and help products like hair serum, scalp oil, or scalp treatment spread more evenly.

Think of it as scalp massage with more precision.

## Why Everyone Is Talking About the Scalp Now

The scalp conversation has changed. A few years ago, clients mostly thought about hair length, shine, frizz, and color. Now they are asking more direct questions:

1. Why is my hair falling out?
2. Why does my scalp feel tight?
3. Is buildup making my hair flat?
4. Can scalp care help with hair growth?
5. What is the best treatment for thinning hair I can actually maintain?

> “Scalp care is where skin care was ten years ago. People are realizing that if the scalp is inflamed, dry, congested, or ignored, the hair is going to show it.”
> — Dana Reeves, Salon Owner, Nashville

## What Scalp Gua Sha Can Actually Help With

Let's be clear. Gua sha is not a replacement for minoxidil, PRP hair treatment, a dermatologist visit, or medical treatment for alopecia, female pattern baldness, or thyroid hair loss.

But it can support a better scalp-care routine. Stylists like it for a few practical reasons.

### 1. It helps release scalp tension

A tight scalp is common, especially in clients who clench their jaw, wear tight ponytails, or carry stress in the head and neck. Scalp gua sha can help loosen that tight feeling around the temples, crown, and nape.

> “Clients do not always realize their scalp has tension until we start working through it. The crown and hairline are usually where they feel it first.”
> — Marissa Chen, Scalp-Focused Stylist, Los Angeles

### 2. It encourages product distribution

If you are using a scalp serum, hair growth serum, or scalp oil, a gua sha tool can help work the product across the scalp without using your nails. Many clients apply scalp products unevenly, a tool slows the process down and ensures better coverage.

### 3. It supports circulation through massage

Massage can temporarily increase blood flow to the area being worked. That does not mean gua sha will regrow hair on its own, but it makes sense as part of a broader scalp care routine, especially for clients dealing with stress-related shedding or telogen effluvium.

### 4. It helps loosen buildup before washing

Used gently before shampooing, scalp gua sha can help lift oil, sweat, dry flakes, and product buildup. It is especially helpful before a clarifying wash or targeted scalp treatment.

## Who Scalp Gua Sha Is Best For

Scalp gua sha makes the most sense for clients who want a healthier, cleaner, more responsive scalp. It can be a good fit if you have:

1. Dry scalp or tightness
2. Mild flaking or buildup
3. Flat roots from product congestion
4. Stress-related scalp tension
5. Fine hair that gets weighed down easily
6. A routine focused on hair growth or hair regrowth
7. Early thinning, where scalp care is part of the bigger plan

## Who Should Be Careful

This is where stylists get serious. Scalp gua sha should never hurt. It should never leave cuts, bruising, or burning. And it is not for every scalp.

Avoid scalp gua sha if you have:

1. Open sores or scratches
2. Active scalp infection
3. Severe dandruff or inflamed patches
4. Psoriasis flare-ups
5. Recent hair transplant or scalp procedure
6. Sudden, unexplained bald patches

> “A tool should never be your diagnosis. If the scalp looks angry or the shedding is sudden, that is not a spa moment. That is a referral.”
> — Marcus Bell, Colorist, London

If you are dealing with scarring alopecia, frontal fibrosing alopecia, or rapidly changing hair loss, see a dermatologist before starting any at-home scalp tool routine.

## How to Do Scalp Gua Sha at Home

The technique is simple, but the pressure matters. You want firm enough contact to feel movement, not so much that the scalp feels sore afterward.

### 1. Start on a dry or lightly oiled scalp

You can do this before shampooing or at night with a lightweight scalp product. Good options include a lightweight hair serum, scalp oil, or scalp moisturizer. Avoid heavy oils if your hair gets greasy quickly.

### 2. Work in sections

Part the hair so the tool touches the scalp, not just the hair. Start with:

1. Hairline
2. Temples
3. Crown
4. Sides
5. Nape

### 3. Use short, gentle strokes

Move the tool in slow strokes from front to back or from the center outward. Do not scratch, dig, or drag aggressively through tangled hair.

### 4. Spend extra time where the scalp feels tight

Most clients feel tension at the temples, crown, or behind the ears. Use lighter pressure around the hairline, especially if you are concerned about thinning at the front or temples.

### 5. Shampoo if needed

If you used oil or loosened buildup, follow with shampoo. Clients with flakes may need a medicated dandruff shampoo or specific dandruff treatment.

## How Often Should You Do It?

For most scalps, two to three times a week is enough. If your scalp is sensitive, start once a week.

1. **Once a week** for sensitive scalps
2. **Two to three times a week** for dry scalp, buildup, or tension
3. **Before wash day** if using oils or heavier treatments
4. **At night** if pairing with lightweight scalp serum

More is not always better. Overworking the scalp can create irritation, which defeats the point.

## The Salon Version vs the At-Home Version

In salons, scalp gua sha is usually part of a bigger service, an add-on to a scalp treatment, gloss, blowout, or restorative appointment. A stylist might combine it with steam, scalp exfoliation, a tea tree treatment, or a hydrating scalp mask.

At home, the goal is maintenance. You are not trying to replicate a full treatment room service. You are just keeping the scalp mobile, clean, and cared for between appointments.

## Can Scalp Gua Sha Help With Hair Growth?

This is the question everyone asks. The honest answer: scalp gua sha may support a healthy scalp environment, but it should not be positioned as a guaranteed hair growth treatment.

It can be part of a supportive routine alongside dermatologist-recommended treatments, topical minoxidil, microneedling, red light therapy, or PRP, depending on the person and the diagnosis.

> “Scalp gua sha is support, not the whole strategy. The problem is when people confuse a good ritual with a medical treatment.”
> — Dana Reeves, Salon Owner, Nashville

## What Products Pair Well With Scalp Gua Sha?

The best products are lightweight, scalp-safe, and easy to wash out. Stylists usually recommend:

1. **Scalp serum**, Best for targeted application without greasiness
2. **Oil for scalp**, Better before shampooing, especially for dry or tight scalps
3. **Scalp moisturizer**, Good for clients dealing with dryness, flakes, or tightness
4. **Tea tree scalp treatment**, Useful for a cooling, fresh feeling, though may be too strong for sensitive scalps
5. **Shampoo for hair fall**, A supportive wash option when paired with a full thinning-hair routine
6. **Volumizing shampoo and conditioner**, Helpful if the goal is a cleaner scalp and fuller-looking roots

Avoid applying heavy masks, thick conditioners, or styling creams directly to the scalp unless they are designed for scalp use.

## The Mistakes Stylists See All the Time

Scalp gua sha looks easy, but people still overdo it. The most common mistakes:

1. **Using too much pressure**, If the scalp feels sore later, you went too hard
2. **Using the tool on tangled hair**, This can cause pulling and breakage
3. **Scraping over irritation**, Flakes, redness, or sores need care, not friction
4. **Expecting overnight hair growth**, Scalp health is long-term
5. **Using heavy oils too often**, This can create buildup and make fine hair look flatter
6. **Ignoring actual hair loss symptoms**, Excessive shedding or bald patches should be checked by a professional

## The Bottom Line

Scalp gua sha is not a magic fix. It will not cure hair loss, reverse alopecia, or replace clinical treatments.

But as part of a serious scalp-care routine, it makes sense. It helps clients slow down, touch their scalp, notice changes earlier, and apply treatment products more intentionally.

> “The best scalp routine is the one a client will actually do. Gua sha works because it feels good enough to become a habit.”
> — Marissa Chen, Scalp-Focused Stylist, Los Angeles

And in hair care, consistency is usually where the real results start.`,
		metaTitle: "Gua Sha for Scalp: What Stylists Actually Think",
		metaDescription: "Scalp gua sha is showing up in salons and at-home routines. Here is what it can actually do, who it is for, and where stylists draw the line."
	},
	{
		id: 17,
		slug: "low-maintenance-color",
		tag: "Color",
		title: "How to Ask for a Low-Maintenance Color That Actually Lasts",
		excerpt: "Low-maintenance color is one of the most requested services in salons right now. Here is how to ask for it properly, and what actually makes it last.",
		author: "Sophie Marchand",
		date: "Apr 18, 2026",
		readTime: "9 min",
		image: "/image/hair-coloring.avif",
		category: "Color",
		section: "Trends",
		body: `Low-maintenance hair color is one of the most requested services in salons right now. Clients want dimension, brightness, shine, and something that still looks good eight weeks later. What they do not want is a hard grow-out line, a toner that disappears in two shampoos, or a color that only looks right under salon lighting.

The problem is that “low-maintenance” means different things to different people.

To a client, it usually means fewer appointments. To a stylist, it means smarter placement, better tone selection, realistic lift, and a home-care routine that protects the work.

> “Low-maintenance color is not lazy color. It actually takes more planning because you are designing the grow-out before you even mix the bowl.”
> — Nina Patel, Colorist & Educator, Chicago

That is the part most clients do not see. The best low-maintenance color is built to age well.

![A soft rooted blonde with lived-in dimension, the grow-out is part of the design](https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/8e/bd/b7/80/34/v1_E11/E117RM56.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=c788e18caf3fa6e4a5c15498b6e1bc3b23bdd5fc3d80d2d55f0dd50cd0c82eec)

## First, Say What You Actually Mean by Low-Maintenance

This is where the consultation matters. If you sit down and say “I want something low-maintenance,” your stylist still has to decode what that means. The better way to ask is specific:

1. “I want my grow-out to look soft.”
2. “I do not want to touch up my roots every month.”
3. “I want brightness around my face, but I still want my natural base.”
4. “I can realistically come in every 10 to 12 weeks.”
5. “I want the color to fade nicely, not turn orange or dull.”

That gives your stylist something useful to work with.

> “Clients think they are asking for a color. What they are really asking for is a maintenance schedule. Once we know that, we can design the color properly.”
> — Marcus Bell, Colorist, London

## The Color Terms That Usually Mean Low-Maintenance

Not every service is built to last. A global bleach-and-tone blonde is high-maintenance by design. A soft dimensional brunette or root-shadowed blonde is much easier to live with.

### 1. Lived-in color

Lived-in color usually means the root stays soft, natural, or intentionally shadowed. The brightness is placed through the mid-lengths and ends, so the color keeps its shape as it grows. It works especially well for brunettes, blondes, and brondes.

### 2. Root shadow

A root shadow softens the transition between your natural hair and the colored pieces. It prevents the “freshly highlighted stripe” look and buys you more time between appointments. This is one of the most important techniques for low-maintenance blondes.

### 3. Balayage

Balayage is hand-painted color designed to grow out softly. It does not mean zero upkeep, but it usually requires fewer touch-ups than traditional highlights. The best balayage still needs a gloss or toner appointment, especially if the hair lifts warm.

### 4. Dimensional brunette

For brunettes, low-maintenance often means keeping the base rich and adding subtle ribbons of warmth or brightness, espresso, chestnut, caramel, soft mocha, or golden brown. It gives movement without committing to constant root work.

### 5. Gloss or glaze

A gloss hair treatment is often the secret behind expensive-looking color. It refreshes tone, adds shine, and can make older color look intentional again. This is the appointment stylists love because it keeps the color alive without a full lightening service every time.

![Dimensional brunette with caramel ribbons, one of the easiest color families to maintain](https://i.pinimg.com/564x/07/66/08/076608816956e391d7c5e8848a2fa9a7.jpg)

## What Actually Makes Color Last

Long-lasting color is not just about the formula. It is about how the color is placed. Stylists are thinking about several things before they paint:

1. **Your natural base color**, The closer the final result stays to your natural level, the easier the maintenance.
2. **Your undertone**, If your hair naturally pulls orange, asking for icy beige blonde may mean constant toning. A warmer beige, caramel, or honey shade may last better.
3. **Your hair history**, Previous bleach, box dye, old toner, and permanent color all affect how evenly the hair lifts and fades.
4. **Your haircut**, Layered haircuts, face-framing pieces, and shorter shapes can all change where brightness should be placed.
5. **Your lifestyle**, Heat styling, washing frequency, sun exposure, swimming, and hard water can all shift color faster.

> “Clients want the color to last, but they do not always realize their routine is part of the formula. If you wash daily with the wrong shampoo, no toner is surviving that.”
> — Dana Reeves, Salon Owner, Nashville

## The Best Low-Maintenance Color Families

Some shades naturally age better than others. That does not mean you cannot have the color you want, but it does mean your stylist may steer you toward a version that fits your real life.

### Brunette

Brunette is one of the easiest families to keep low-maintenance, especially when the base is not pushed too far from natural. Ask for:

1. Soft espresso
2. Chestnut brown
3. Mocha brunette
4. Caramel ribbons
5. Subtle face-frame brightness

Avoid overly ashy brunette if your hair naturally pulls warm. It may look beautiful on day one and flat by week four.

### Blonde

Blonde can be low-maintenance, but only if the root is handled correctly. Ask for:

1. Rooted blonde
2. Beige blonde
3. Honey blonde
4. Bronde
5. Soft money piece with a root melt

Avoid asking for bright, root-to-tip blonde if you do not want frequent appointments. That is not low-maintenance color. That is a relationship.

### Red and copper

Copper is having a major salon moment, but it fades faster than most shades. If you want a lower-maintenance version, ask for a softer copper brunette, auburn gloss, or warm cinnamon dimension instead of a high-voltage orange copper.

> “Copper is gorgeous, but it is honest. It will tell on you if you skip the home care.”
> — Marcus Bell, Colorist, London

### Gray blending

For clients with natural gray, the most low-maintenance option is often blending, not covering. Softer highlights, lowlights, glosses, and demi-permanent color can make the grow-out feel less severe. This is one of the biggest shifts stylists are seeing with clients over 40, they do not necessarily want to erase gray. They want it to look intentional.

## What to Ask Your Stylist For

The best salon consultations are clear without being overly technical. You do not need to know formulas. You just need to communicate the result and the upkeep. Try saying:

1. “I want brightness, but I want my natural root left soft.”
2. “Can we do a root shadow so it grows out better?”
3. “I want something I can maintain with gloss appointments.”
4. “I do not want to be locked into monthly root touch-ups.”
5. “Can we keep the color within two to three levels of my natural base?”
6. “I want dimension, but I do not want chunky contrast.”
7. “I want the fade to still look expensive.”

That last line matters. Good color should not only look good fresh. It should fade well.

## What Photos to Bring

Photos help, but only if you bring the right kind. Do not bring one heavily edited image and expect your stylist to reverse-engineer it. Bring a few examples and point out:

1. The root
2. The brightness around the face
3. The tone
4. The amount of contrast
5. The overall depth

A photo of the root is especially important. Most clients only save the bright ends. Stylists are looking at the top three inches.

> “We can tell from a reference photo whether the color is going to be high-maintenance. If the root is erased, that client is coming back often.”
> — Nina Patel, Colorist & Educator, Chicago

## What to Avoid Asking For

Some requests sound low-maintenance but are not. Avoid these if your goal is longevity:

1. **“Make me really bright all over.”**, Full brightness usually means visible regrowth.
2. **“I want icy blonde but low-maintenance.”**, Icy tones fade quickly and need frequent toning.
3. **“Can we cover all my gray permanently?”**, You can, but expect a root line.
4. **“I want a big change, but I do not want upkeep.”**, Big changes usually require maintenance.
5. **“Just do whatever.”**, Stylists love trust, but low-maintenance color still needs boundaries.

## The Home Care That Keeps Color Looking Expensive

This is where clients either protect the color or undo it. Your stylist may recommend:

1. **Shampoo for color treated hair**, Helps slow fading and keeps tone cleaner.
2. **Hair serum or leave-in treatment**, Especially useful for lightened ends that need shine and softness.
3. **Hair moisturizer**, Color lasts better when the hair is not dry and porous.
4. **Glossing appointments**, Refreshes tone and shine without a full color service.
5. **Heat protection**, Hot tools fade color faster than most clients realize.
6. **Scalp care**, A healthy scalp supports better-looking hair overall.

Professional hair care products are not always about luxury. In color work, they are part of the maintenance plan.

## How Often Should You Come Back?

This depends on the color, but most low-maintenance schedules look something like this:

1. **Gloss refresh:** every 6 to 8 weeks
2. **Face-frame touch-up:** every 8 to 12 weeks
3. **Balayage refresh:** every 3 to 5 months
4. **Full color redesign:** 1 to 2 times per year

The more natural the root and tone, the longer you can stretch it. The brighter and cooler the color, the sooner you will be back.

## The Bottom Line

Low-maintenance color is not about doing less. It is about doing the right things in the right places. The root has to be soft. The tone has to work with your natural warmth. The brightness has to be placed where it will still make sense months later.

> “The best low-maintenance color does not look forgotten at week ten. It looks like it was planned that way.”
> — Dana Reeves, Salon Owner, Nashville

That is what you should ask for. Not just pretty color on day one, but color that grows out quietly, fades softly, and still looks like you meant it.`,
		metaTitle: "How to Ask for Low-Maintenance Hair Color That Actually Lasts",
		metaDescription: "Low-maintenance color takes more planning, not less. Here is how to ask for it, what terms to use, and what actually makes it last."
	},
	{
		id: 18,
		slug: "at-home-hair-care",
		tag: "At-Home Tips",
		title: "At-Home Hair Care That Actually Makes a Difference (According to Stylists)",
		excerpt: "The clients with the best hair are not the ones doing the most in-salon. They are the ones doing the right things consistently at home.",
		author: "Priya Allison",
		date: "Apr 20, 2026",
		readTime: "8 min",
		image: "/image/at-home-hair-care.avif",
		category: "At-Home Tips",
		section: "Hair Care",
		body: `Most clients think better hair comes from bigger salon appointments. More color, more treatments, more time in the chair. What stylists actually see is the opposite.

The clients with the best hair are not the ones doing the most in-salon. They are the ones doing the right things consistently at home.

> “Your hair lives with you, not with us. We can reset it in the chair, but what you do between appointments decides how it looks 80 percent of the time.”
> — Dana Reeves, Salon Owner, Nashville

This is where at-home hair care stops being optional and starts being the entire strategy.

![A well-maintained blowout, the result of consistent at-home care, not just salon visits](https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/ee/f9/d3/57/04/v1_E10/E10B9UPC.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=6516535bd186f44758e01ec96b50590c3a09624b21f2d2a6d1f852258247424a)

## Start With the Scalp, Not the Ends

Most people build routines around damaged ends. Masks, oils, leave-ins. Meanwhile the scalp, where hair actually grows, gets ignored.

If your scalp is dry, irritated, or congested, it shows up as:

- **Hair thinning** or slower growth
- **Hair fall** or excessive shedding
- Flat roots that never hold volume
- Flaking linked to dandruff
- Tightness or itchiness

That is why stylists are pushing scalp-first routines.

### What to do at home:

1. Use a scalp treatment once or twice a week
2. Try a dry scalp treatment at home if you notice flaking
3. Apply a lightweight scalp oil or scalp moisturizer before washing
4. If needed, rotate in a medicated dandruff shampoo

> “Healthy scalp, better hair. It sounds simple, but it is the part most people skip.”
> — Marcus Bell, Colorist, London

## Wash Less, But Wash Better

Overwashing is still one of the biggest issues stylists see. It strips natural oils, fades color, and dries out the hair and scalp. At the same time, under-washing with too much product buildup can clog the scalp.

### A better wash routine:

1. Use a shampoo for color treated hair if you have any color
2. Focus shampoo on the scalp, not the ends
3. Rinse longer than you think you need to
4. Condition mid-lengths to ends only

If you are dealing with hair loss, hair thinning, or excessive shedding, gentle washing is key. Aggressive scrubbing or harsh formulas can make shedding feel worse.

![Scalp-focused washing, the technique matters as much as the product](https://elements-resized.envatousercontent.com/envato-dam-assets-production/214b747b-f1af-4f3d-9236-2323436c5e79/9e2c3562-b0a0-4ae4-81b8-d7799486e3a2.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=601bfb355b840e0115a818f14c215973b41660c5261941b5585134829d337284)

## Treat the Hair You Have, Not the Hair You Want

Clients often buy products for aspirational hair. Thick, glossy, high-density hair. Not the hair they actually have. This is where routines fall apart.

### For dry or damaged hair:

- Use a hair treatment for damaged hair weekly
- Add a protein treatment if the strands feel weak
- Use a lightweight hair moisturizer or leave-in treatment

### For thinning or fine hair:

- Look for products specifically for thinning hair
- Use volumizing shampoo and conditioner
- Avoid heavy oils on the roots

### For frizz or texture:

- Use a hair treatment for frizzy hair
- Layer in a small amount of hair serum for control

> “People overload their hair trying to fix it. Most of the time, less product used correctly works better than more product used randomly.”
> — Nina Patel, Colorist & Educator, Chicago

## Heat Styling Is Where Most Damage Happens

Flat irons, curling wands, and even high-heat blow dryers are still the fastest way to undo healthy hair. This is especially true for clients already dealing with severe breakage, bleach damage, or ongoing shedding.

### Smarter heat habits:

1. Always use heat protection
2. Lower the temperature when possible
3. Avoid daily straightening or curling
4. Let hair air dry partially before styling

Tools can help reduce damage, but technique still matters more than the tool.

![Air drying before heat styling, one of the simplest ways to reduce damage](https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/08/7d/f4/c5/94/v1_E10/E106L7XU.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=02101d831d2be8ddf516d386717a48420b6537ae8d819339f4eaf20bec820f84)

## The Weekly Reset Routine Stylists Recommend

If you want a simple system that works, this is what many stylists suggest.

### Once a week:

1. Apply scalp oil or a scalp treatment
2. Use a dry scalp treatment if needed
3. Shampoo thoroughly
4. Apply a deep conditioner or hair treatment
5. Finish with a lightweight leave-in treatment

### Daily or every other day:

1. Use minimal styling products
2. Add a small amount of hair serum for ends
3. Avoid buildup at the roots

### Every few weeks:

1. Clarify if you use a lot of product
2. Refresh with a gloss treatment at the salon if you have color

Consistency matters more than intensity. A simple routine done regularly will outperform a complicated one done occasionally.

## When Hair Loss or Thinning Needs More Than Home Care

At-home care helps, but it is not always enough. If you are noticing sudden hair loss, diffuse thinning that is getting worse, a visible thinning hairline, or ongoing shedding that does not slow down, it may be time to look beyond products.

Options stylists often discuss with clients include:

- Seeing a hair loss specialist or dermatologist
- Treatments like PRP hair treatment
- Topical solutions like minoxidil
- Scalp-focused therapies

> “Products support the hair you have. If the issue is internal or hormonal, you need a bigger plan.”
> — Dana Reeves, Salon Owner, Nashville

## The Products That Actually Make a Difference

There is a lot of noise in the haircare space. What stylists consistently see working:

- Professional hair care products over harsh formulas
- Lightweight, targeted treatments instead of heavy layering
- Scalp-focused products for long-term results
- Simple routines using good products instead of constantly switching

Whether it is vegan hair products, natural hair care products, or specific targeted lines, the key is choosing products that match your hair type and sticking with them long enough to see results.

## The Bottom Line

At-home hair care is not about doing everything. It is about doing the right things consistently. Focus on the scalp. Use the right products for your actual hair type. Be mindful with heat. And build a routine you can maintain.

> “The best hair we see in the salon is never an accident. It is always someone doing the basics well, over and over again.”
> — Marcus Bell, Colorist, London

Not more products, not more steps. Just better habits.`,
		metaTitle: "At-Home Hair Care That Actually Makes a Difference",
		metaDescription: "Stylists share the at-home habits that make the biggest difference between appointments, from scalp care to heat styling to product selection."
	},
	{
		id: 19,
		slug: "busiest-stylists-system",
		tag: "Business",
		title: "Why the Busiest Stylists Aren't Doing More Clients, They're Doing This Instead",
		excerpt: "A full schedule doesn't always mean high income. The stylists building sustainable careers in 2026 are doing fewer things, better, and charging accordingly.",
		author: "Dana Reeves",
		date: "Apr 22, 2026",
		readTime: "7 min",
		image: "/image/hair-salon.avif",
		category: "Business",
		section: "Inspiration",
		body: `There's a point in most stylists' careers where more bookings stop being the answer.

The schedule is full. The days are long. The income plateaus anyway.

What separates working stylists from high-performing ones in 2026 is not how many clients they take. It's how they structure the work they're already doing.

> “The shift is when you stop thinking in appointments and start thinking in systems. That's where your income changes.”
> — Dana Reeves, Salon Owner & Business Coach, Nashville

![A stylist reviewing their schedule, the work behind the chair is only part of the picture](/image/schedule.png)

## The Old Model Is Breaking

For years, the model was simple: more clients equals more money. But that model has limits, physical limits, time limits, and burnout.

Stylists who rely only on volume eventually hit the same ceiling:

- No time for consultations
- Rushed services
- Lower-ticket appointments filling prime hours
- Minimal retail conversations
- Constant fatigue

And ironically, the client experience drops right when the schedule fills up.

## What High-Earning Stylists Do Differently

The stylists who are consistently booked, charging premium prices, and not overworked are doing a few key things differently.

### 1. They specialize

Instead of offering everything, they become known for something, lived-in color, blondes, copper and reds, curly hair, or transformations. This attracts higher-intent clients and allows them to refine and speed up their process.

> “I stopped saying yes to everything. Once I focused on dimensional color, my bookings didn't go down. My prices went up.”
> — Nina Patel, Colorist & Educator, Chicago

### 2. They price based on outcome, not time

Charging by the hour or by service menu alone is outdated in high-performing salons. Clients are paying for the result, the expertise, and the customization. A two-hour gloss appointment and a two-hour corrective color should not be priced the same.

### 3. They build maintenance into the service

The best stylists are not selling one appointment. They are selling a plan:

- Initial color service
- Gloss refresh every 6–8 weeks
- Full refresh every 4–6 months

This creates predictable income and keeps the client's hair looking consistent.

> “I don't sell color. I sell how your hair is going to look for the next six months.”
> — Marcus Bell, Colorist, London

### 4. They treat retail as part of the service

Retail is still one of the most underused revenue streams in salons. The top stylists don't sell, they prescribe. Shampoo for color treated hair, hair serum for shine, scalp treatment for long-term health, volumizing products for fine or thinning hair.

> “Clients are already asking what to use. If you're not answering that, they're buying it somewhere else.”
> — Dana Reeves, Salon Owner & Business Coach, Nashville

### 5. They protect their schedule

Not every hour should be filled the same way. High-performing stylists reserve prime time for high-ticket services, avoid stacking low-value appointments back-to-back, build in consultation time, and leave space for adjustments and add-ons.

![A well-structured salon day, intentional scheduling is a skill in itself](https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/fc/6b/44/ae/47/v1_E10/E10F9W2.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=ffd30589afe066c6a890b6882020ae1e52b64b50f789613a8157ca8599cc4978)

## The Shift From Technician to Operator

At a certain point, being a great stylist is not enough. You also need to think like an operator. That means understanding which services drive revenue, which clients rebook consistently, which work brings in referrals, and which days and times are most valuable.

> “You can love the craft and still run it like a business. In fact, you have to.”
> — Nina Patel, Colorist & Educator, Chicago

## What This Looks Like in Practice

A fully booked stylist working 5 days a week might take fewer clients per day, focus on higher-value services like balayage, transformations, or specialty color, build in gloss and maintenance appointments, recommend targeted haircare products, and increase pricing based on demand and results.

The result: higher average ticket, better client experience, more consistent income, and less burnout.

## The Role of Content and Visibility

Another shift happening right now is how stylists attract clients. It is no longer just referrals and walk-ins. It is visual proof, before-and-after transformations, consistent portfolio updates, and clear specialization.

Clients are choosing stylists based on what they can see.

> “If your work isn't visible, it's not being considered.”
> — Marcus Bell, Colorist, London

This is why categories like Transformations perform so well. They show capability instantly.

![Portfolio work, visible proof of specialization is one of the most powerful marketing tools a stylist has](https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/40/1c/70/7b/35/v1_E11/E117U9UP.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=4a70f19fdfe208663ac7e7fef2266077f6a3499fb19ad8b1e675e71f7e3c743a)

## The Bottom Line

The busiest stylists are not always the most successful. The ones building sustainable, high-income careers are doing fewer things, better, and charging accordingly.

They specialize. They structure their services. They build maintenance into the experience. And they treat their work like a business, not just a schedule to fill.

> “You don't need more clients. You need a better system for the ones you already have.”
> — Dana Reeves, Salon Owner & Business Coach, Nashville`,
		metaTitle: "Why the Busiest Stylists Aren't Doing More Clients",
		metaDescription: "High-earning stylists in 2026 are not taking more clients, they are specializing, pricing smarter, and building systems that work."
	},
	{
		id: 20,
		slug: "smoothing-products-stylists-use",
		tag: "Products",
		title: "The Types of Products Stylists Actually Use for Smoothing Hair",
		excerpt: "Smooth hair is never one product. Stylists build it in layers, the right prep, the right treatment, and the right finish.",
		author: "James Olivier",
		date: "Apr 24, 2026",
		readTime: "8 min",
		image: "/image/type-of-product.avif",
		category: "Products",
		section: "Hair Care",
		body: `Smoothing hair is where clients and stylists often talk past each other.

A client says “I want my hair smoother,” and usually means less frizz, more shine, easier styling, and something that does not puff up the second they step outside. A stylist hears something more specific: cuticle condition, porosity, humidity response, heat history, and whether the hair needs moisture, protein, or actual chemical smoothing.

That is why there is no single smoothing product that works for everyone. In the salon, smoothing is built in layers.

> “Smooth hair is never one product. It is the right prep, the right treatment, and the right finish. If one of those is wrong, the hair tells on you.”
> — Nina Patel, Colorist & Educator, Chicago

![The smoothing process starts before styling, product selection at the wash stage sets the foundation](https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/f3/d8/4c/8f/13/v1_E10/E107L00O.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=1c54a363093754a4f3bbfd8979242085e3a9662bccc058fec857726430bd46b5)

## It Usually Starts With the Wash

The first smoothing decision happens before styling even begins. If the shampoo is too harsh, the hair swells, the cuticle lifts, and the finish gets rough before the blow-dry starts.

Stylists usually reach for a smoothing shampoo and conditioner when the hair feels dry, coarse, frizzy, or overworked. For colored clients, a shampoo for color treated hair matters because faded, porous color often looks frizzier than it really is.

> “People blame the weather, but half the time it is the shampoo. If the hair is stripped in the shower, you are already fighting frizz before you pick up a brush.”
> — Marcus Bell, Colorist, London

## Then Comes the Treatment Layer

When stylists talk about smoothing, they are often talking about repair. Frizz is not always a hair type issue. A lot of the time, it is damage, bleach, heat tools, old color, rough brushing, and chemical services all create openings in the cuticle. Once the cuticle is uneven, the hair stops reflecting light and starts grabbing moisture from the air.

That is when a stylist may recommend a hair treatment for damaged hair, a protein treatment for hair, or a deeper moisturizing mask. These are not just “nice extras.” They help the strand behave better.

For clients with severe hair breakage and thinning, smoothing has to be approached carefully. Heavy products can make the hair look flatter, but skipping treatment leaves the ends looking frayed. The sweet spot is usually lightweight repair, not coating the hair until it collapses.

![Treatment products work at the strand level, they change how the hair behaves, not just how it looks](https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/17/18/09/9a/0f/v1_E11/E114HCS4.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=6a8bf7ae5de70b10cdb42ca625dc9d16259b52b2b917a8bfd0cddc119372b9f8)

## Leave-In Products Do Most of the Daily Work

If there is one category stylists rely on constantly, it is leave-in smoothing care. A leave-in hair treatment gives the hair slip, softness, and control before styling. A creamier formula works well on thick, coarse, dry hair. A lighter hair serum is better for fine hair that gets greasy or flat quickly.

The mistake clients make is using too much. Stylists rarely load the hair from root to end. They work product through the mid-lengths and ends, then use what is left on the hands to skim the surface.

> “Most smoothing products are not bad. They are just overused. The difference between glossy and greasy is usually one extra pump.”
> — Dana Reeves, Salon Owner, Nashville

## For Real Frizz Control, Stylists Use Heat-Activated Products

A salon blowout does not last longer by accident. Stylists often use blow-dry creams, heat protectants, and smoothing lotions that are designed to activate with heat. These products help seal the cuticle as the hair is dried into shape.

That is why the same client can use a serum at home and still not get the salon finish. The product matters, but the blow-dry technique matters just as much. Tension, airflow, section size, and heat direction all decide whether the cuticle lies flat.

For clients who use hot tools often, this step is non-negotiable. Heat without protection may look smooth for the day, but over time it creates the exact frizz and breakage the client is trying to fix.

## Salon Smoothing Treatments Are a Different Category

Keratin treatments, hair botox, and other professional smoothing services sit in their own lane. These are for clients who want smoother hair for weeks or months, not just until the next wash. They are especially helpful for hair that expands in humidity, takes too long to blow-dry, or never feels polished without heavy styling.

But modern smoothing treatments are not always about making the hair pin-straight. Most stylists are using them to soften frizz, improve manageability, and cut down styling time while keeping some natural movement.

> “Clients used to ask for straight hair. Now they ask for hair that behaves. That is a very different consultation.”
> — Marcus Bell, Colorist, London

A good stylist will look at the hair's condition first. If the hair is over-bleached, fragile, or already breaking, the formula and timing need to be adjusted. Smooth should never come at the expense of strength.

![A professional smoothing service, the consultation determines the formula, not the other way around](https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/de/1c/6e/36/51/v1_E10/E1020HOE.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=140b54d4a815107572fecd522d881990d9df921efc3d1aa99868deae2e634bb7)

## The Finish Is Usually a Serum or Oil

The final polish often comes from a hair serum or lightweight oil. This adds shine, controls flyaways, and makes the ends look cleaner. But finishing products are not repair products, they make the hair look better in the moment. They do not replace treatments, moisture, or a proper smoothing routine.

For fine hair, stylists usually keep this step very light. For coarse, curly, or dry hair, they may use a richer oil, especially through the ends. The goal is reflection, not weight.

## Scalp Care Matters More Than Clients Think

Smoothing is not only about the ends. A dry, tight, or irritated scalp can affect how the root area sits, especially on clients who deal with flakes, buildup, or oil imbalance.

That is why more stylists are adding scalp treatment, dry scalp treatment, scalp moisturizer, or scalp oil into the conversation. If the scalp is congested, the roots can look dull and flat. If the scalp is dry, the hair can feel rough right from the base.

## What Stylists Actually Want Clients to Understand

The best smoothing routine is not the most expensive one. It is the one that matches the hair.

- Fine, frizzy hair usually needs lightweight leave-in care and heat protection
- Thick, coarse hair may need richer creams and deeper treatments
- Color-treated or bleached hair often needs repair before it can look smooth
- Curly and wavy hair needs smoothing products that control frizz without erasing texture

> “Good smoothing is personal. Two clients can both say they have frizz, but one needs moisture and the other needs protein. If you treat them the same, one of them is going to hate the result.”
> — Nina Patel, Colorist & Educator, Chicago

## The Bottom Line

Stylists do not rely on one miracle smoothing product. They build smoothness through cleansing, treatment, leave-in care, heat protection, and finishing products. When the system is right, hair looks softer, shinier, and more controlled without feeling heavy.

The real secret is knowing what kind of smoothing your hair actually needs. Because sometimes the answer is a serum. Sometimes it is a protein treatment. Sometimes it is a keratin service. And sometimes it starts with changing your shampoo.`,
		metaTitle: "The Types of Products Stylists Actually Use for Smoothing Hair",
		metaDescription: "Smooth hair is built in layers. Stylists break down the products they actually use, from wash to treatment to finish, and why one product is never enough."
	},
	{
		id: 21,
		slug: "what-stylist-sees-when-you-sit-down",
		tag: "Tips",
		title: "What Your Stylist Is Actually Looking at When You Sit Down",
		excerpt: "The consultation starts before you say a word. Here's what your stylist is reading the moment you walk in.",
		author: "Cleo Hartley",
		date: "Apr 26, 2026",
		readTime: "9 min",
		image: "/image/sit-down.avif",
		category: "Tips",
		section: "Inspiration",
		body: `The second you sit in the chair, your stylist is already working.

You may still be taking off your coat, unlocking your phone, or saying, “I don't really know what I want, but I need a change.” Meanwhile, your stylist has already clocked the root, the ends, the shape, the scalp, the color history, and the one piece in the front that clearly has its own personality.

Stylists are trained observers. The consultation is not just about what you say. It is about what your hair is saying before you even start.

> “Clients think the appointment starts when we ask what they want. For us, it starts the second they walk in.”
> — Nina Patel, Colorist & Educator, Chicago

![The first few minutes in the chair, your stylist is already reading the whole picture](https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/51/0d/6d/da/30/v1_E10/E1096J9K.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=a4cb791a5ad03f1a41b34dbaef591f289979c41bfb5cd30cb6789db23b35c454)

## The Way Your Hair Falls Naturally

Before anyone touches a brush, your stylist wants to see how your hair lives. Not how it looks freshly styled. Not how it looks in your inspo photo. How it naturally sits when you walk in from real life.

They are noticing where your part wants to fall, whether your crown splits, how your front pieces frame your face, and whether your ends flip, collapse, or puff out.

> “Every head of hair has a routine. Our job is to work with it, not bully it into behaving for one salon photo.”
> — Marcus Bell, Colorist, London

## Your Root Situation

Stylists look at roots the way detectives look at footprints. Your root tells them how long it has been since your last color, how fast your hair grows, how much contrast you are dealing with, and whether your current maintenance plan makes sense.

For color clients, the root reveals everything: how harsh the grow-out is, how much gray is coming in, whether the previous color was blended well, and whether you are actually low-maintenance or just hoping to be.

The ends can lie. The root does not.

## The Ends, Also Known as the Receipts

If the root tells the present, the ends tell the past. Old bleach, heat damage, box dye, previous highlights, hard water, rough brushing, too much hot tool work. It all shows up at the ends.

> “Ends are receipts. They tell me what the hair has been through, even when the client says, 'I barely do anything to it.'”
> — Dana Reeves, Salon Owner, Nashville

This is where your stylist decides whether your hair can handle a big color change, whether you need a hair treatment for damaged hair first, or whether those “just a little trim” ends actually need more than a little.

![Ends tell the full story of a client's hair history, stylists read them before making any decisions](https://elements-resized.envatousercontent.com/envato-dam-assets-production/6c54279f-8d01-452b-9052-64f196b93c46/83f20189-fbaf-4bd0-9153-baddd7db64b5.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=89898d8fdc319cdacb8a4d252c02b46b351c820e5580c229059110b34a8cca2f)

## Your Scalp

Yes, your stylist is looking at your scalp. The scalp is the foundation of the whole appointment. If it is dry, irritated, oily, flaky, or sensitive, it affects everything from color application to styling.

A stylist may notice dryness or flaking, product buildup, redness or irritation, tender areas, or visible thinning at the part or crown. This is where conversations about scalp treatment, dandruff treatment, or scalp moisturizer come in, not because your stylist is trying to upsell you, but because healthy hair starts at the scalp.

## The Density, Not Just the Thickness

Clients often say “my hair is thick” when they mean the strands are coarse. Or “my hair is thin” when they mean the strands are fine. Stylists separate the two.

**Texture** is the size of each strand. **Density** is how much hair you have on your head. You can have fine hair with high density. You can have coarse hair with low density.

> “With density, we are not guessing. We are checking what the haircut can support.”
> — Nina Patel, Colorist & Educator, Chicago

This is why layers can look incredible on one client and tragic on another. Same reference photo, totally different hair reality.

## Your Hairline

The hairline determines how bangs sit, how face-framing layers fall, how a ponytail looks, and how color should be placed around the face. It can also reveal early signs of hair thinning, breakage, postpartum hair loss, or tension from tight styles.

Those little baby hairs around the temples? Your stylist is reading them like subtitles.

## Your Previous Color, Even the One You Forgot About

Hair has a memory. That “temporary” dark gloss from last year. The box dye from college. The highlights under the brunette. The toner that grabbed weird. The bleach that still lives on the last four inches.

Your stylist is looking for all of it. This is why they ask color history questions that feel oddly specific. Old color can affect lift, tone, porosity, and whether your dream blonde is happening today or becoming a six-month plan.

## Your Inspo Photo, But Not the Way You Think

When you show a reference photo, your stylist is not just looking at the pretty part. They are checking whether the lighting is realistic, whether the hair is filtered or heavily edited, what the client's natural base is, how much styling is involved, and whether your hair has the density for it.

This is why a good stylist might say, “I love this direction, but here is what it would look like on your hair.” That is not rejection. That is translation.

![A reference photo consultation, stylists are reading the root, the density, and the styling, not just the finish](https://elements-resized.envatousercontent.com/envato-dam-assets-production/76ee7236-dfc0-4266-a839-c84de7921ad9/ec4c2b5a-2bb2-413e-8d84-805cee9fd955.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=77c820c4a3352a6bb986f5afeb6d32810897ed77c6b32d1eb7936cd48fda9880)

## Your Lifestyle, Based on Clues

Stylists are not judging. They are gathering evidence. If your hair is always in a bun, that matters. If the front pieces are heat-damaged, that matters. If your color is faded but your roots are six months grown out, that really matters.

> “Some clients ask for hair that belongs to a person with a completely different schedule. Our job is to make it beautiful and realistic.”
> — Marcus Bell, Colorist, London

## The One Thing You Keep Apologizing For

Clients apologize for everything. “My roots are so bad.” “I know my ends are terrible.” “I tried to cut my bangs.” “I used box dye but only once.”

Your stylist is usually not shocked. They have seen everything. Truly everything.

> “Clients confess like they are in trouble. I'm not mad. I just need accurate information so I can get them where they want to go.”
> — Dana Reeves, Salon Owner, Nashville

So yes, tell the truth. No, your stylist is probably not judging you. They are just updating the formula in their head.

## What Your Stylist Is Really Deciding

By the end of those first few minutes, your stylist is already mapping the appointment, whether your goal is possible today, what needs to be adjusted, where the haircut should hold weight, where the color should be brightest, what treatment your hair needs, and what maintenance plan will keep you from hating it in six weeks.

The consultation is not small talk. It is the blueprint.

## The Bottom Line

When you sit down, your stylist is not just looking at your hair. They are reading the whole story: the root, the ends, the scalp, the density, the history, the lifestyle, and the version of yourself you are trying to walk out as.

> “The hair tells us what it can do. The client tells us what they want. The appointment is where we make those two things meet.”
> — Nina Patel, Colorist & Educator, Chicago

That is the real work behind the chair.`,
		metaTitle: "What Your Stylist Is Actually Looking at When You Sit Down",
		metaDescription: "The consultation starts before you say a word. Here is what your stylist reads the moment you walk in, and why it shapes everything that follows."
	},
	{
		id: 22,
		slug: "gdragon-hairstyles-stylists-reference",
		tag: "Cut & Style",
		title: "10 G-Dragon Hairstyles Stylists Still Reference",
		excerpt: "G-Dragon's hair keeps changing without ever feeling random. Here are 10 looks stylists still pull from, and why they actually work.",
		author: "Ji-Woo Park",
		date: "Apr 28, 2026",
		readTime: "6 min",
		image: "https://s.yimg.com/ny/api/res/1.2/Lq1vk6kjUgL5SRQyCjjgUg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTIwMDA7aD0xNTE4O2NmPXdlYnA-/https://media.zenfs.com/en/mmail.com.my/4440162b287bbefca7b488c1c58194b3",
		category: "Cut & Style",
		section: "Trends",
		body: `G-Dragon has never treated hair like an accessory. For him, it is part of the concept, the era, and the performance. The source you shared rounds up 25 of his most memorable looks, from cherry-blossom pink and lake green to his multi-tonal “flower field” color, tennis-ball green, wolf cuts, and the now-iconic tamagoyaki-inspired style.


## 1. The Flower Field Color

This is G-Dragon at full volume.

Built on a platinum base, the look mixes saturated pink, yellow, red, and green pieces through long hair, creating the effect of a wild, blooming garden. It is vivid, strange, and somehow still fashion.

From a stylist’s point of view, the reason it works is placement. Multi-color hair can turn messy fast. Here, the platinum base gives the color room to breathe, so every shade looks intentional.

> This is the kind of color that only works when the chaos is planned. On the wrong cut, it becomes costume. On GD, it becomes editorial.
> — Marcus Bell, Colorist, London

![Style from 'Still Life' Music Video, 2022](/image/still-life.jpg)

## 2. Mint Green

This is one of his most recognizable color eras.

After experimenting with yellow-green tones, G-Dragon went even greener.

This is not an easy color. Neon green can look harsh, gimmicky, or unfinished. On GD, it reads intentional because the styling stays controlled.

The salon lesson is simple: when the color is loud, the shape has to be clean.

![Style from Instagram 8lo8lo8lowme, 2025](/image/mint-green.png)

## 3. The Tamagoyaki Part

This one is pure G-Dragon lore.

The look features bright golden hair slicked into a center part, with the darker regrowth line showing right through the middle. Fans compared it to tamagoyaki, the Japanese rolled omelet.

It sounds ridiculous until you see it. Then it makes perfect sense.

What makes it interesting is that the “flaw” becomes the feature. Most clients panic over visible roots. GD turned the root line into the concept.

> That is the difference between trend and styling. A normal grow-out becomes iconic when someone decides it belongs there.
> — Dana Reeves, Salon owner, Nashville

![Style from Mnet Asian Music Awards, 2013](https://hips.hearstapps.com/hmg-prod/images/dragon-of-bigbang-performs-on-the-stage-during-the-2013-news-photo-1649488839.jpg?crop=0.543xw:0.814xh;0.182xw,0.0740xh)

## 4. The Fantastic Baby Seaweed Ends

From the *Fantastic Baby* era, this single-sided long hair with gradient ends became one of his most unforgettable stage looks.

It is asymmetrical, dramatic, and built for movement.

The reason stylists still remember it is because it is not just a color moment. It is a silhouette. The long piece changes how the whole head shape reads, especially on stage.

This is hair as choreography.

![Style from 'Fantastic Baby' Music Video, 2012](https://www.billboard.com/wp-content/uploads/media/big-bang-fantastic-baby-vid-billboard-1548.jpg)

## 5. Cherry-Blossom Pink

G-Dragon’s cherry-blossom pink feels softer than his neon eras, but it is still unmistakably him.

The look is worn both fluffy and slightly messy, or styled into a more defined, piecey texture.

That duality is what makes it good. One day it feels romantic. The next it feels punk.

![Style from BSX 'Victory Or Nothing', 2012](/image/pink.png)

## 6. Sunset Amber Blonde

GD has always gravitated toward bold, high-saturation shades, and this look is a perfect example. Blending warm orange with golden tones, the color melts together like a sunset, creating a rich, glowing finish. It adds just the right amount of contrast and lift against an all-black outfit, making the whole look feel intentional rather than simple.

![Style from G-Dragon x Airbnb Press Conference, 2015](https://media.gettyimages.com/id/485515764/photo/seoul-south-korea-g-dragon-of-bigbang-attends-the-collaboration-of-himself-and-airbnb-press.jpg?s=612x612&w=gi&k=20&c=SLLehYCi5m5NImx-HUbiu78NK9rzRrnKKpvj1vIBHS0=)

## 7. Platinum Blonde with Baby Bangs

Platinum is a classic idol move, but GD’s version had bite.

The transparent platinum tone paired with above-brow fringe made the whole look feel sharper, not softer.

> Platinum does not forgive lazy maintenance. If the condition is off, the whole look collapses.
> — Adam Kim, Hair Stylist, Los Angeles

![Style during the filming of 'Crooked' Music Video, 2013](https://i.ytimg.com/vi/XquYfFI3_2M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC5w8BjgCjoZsIfNLkf3Mdsr5yUog)

## 8. The Neon Red Wolf Cut

GD has worn plenty of wolf-tail and mullet-inspired shapes, but the bright red version is one of the strongest.

A wolf cut can look cool or chaotic depending on where the weight sits. On GD, the shorter sides sharpen the silhouette, while the red makes it feel performance-ready.

It is not a casual haircut. It is a statement.

![Style from Paris Fashion Week, 2018](https://assets.vogue.com/photos/59d399eb6809c33f5c2d735b/16:9/w_1792,h_1008,c_limit/g-dragon-chanel-tout.jpg)

## 9. Silver-White Slicked-Back Hair

This is one of his most polished looks.

The silver-white color gives the hair that icy, almost glowing quality, while the slicked-back styling keeps everything formal and controlled.

What stylists like here is the contrast. The styling is classic, almost traditional. The color keeps it futuristic.

![Style from G-Dragon x Shinsegae Duty Free, 2016](/image/white.png)

## 10. The Center-Parted Dark Wolf Tail

This is the quietest look on the list, which is exactly why it works.

Smooth, dark, center-parted wolf-tail hair feels restrained, but the shape still carries that signature edge.

This is probably the most wearable GD-inspired look for real clients.

![Style from G-Dragon x TS Shampoo, 2021](/image/gd-shampoo.jpg)

## The Stylist Takeaway

G-Dragon’s best hair works because it is never just color and never just cut. The two are always in conversation.

The loudest shades usually sit on cleaner shapes. The stranger silhouettes are balanced with styling control. Even the messier looks have structure underneath.

That is why his hair keeps getting referenced.

> GD’s hair is never random. It just looks brave enough to be.
> — Cassie Miller, Salon Business Coach, New Jersey `,
		metaTitle: "10 G-Dragon Hairstyles Stylists Still Reference",
		metaDescription: "G-Dragon's hair keeps changing without ever feeling random. Here are 10 looks stylists still pull from, and why the system behind them works."
	},
	{
		id: 23,
		slug: "2026-met-gala-best-hair-looks",
		tag: "Cut & Style",
		title: "10 Best Hair Looks at the 2026 Met Gala",
		excerpt: "The 2026 Met Gala theme was \"Costume Art\", and the hair teams took it literally. From gold wire pin curls to Botticelli-length waves, here are the 10 hair moments stylists will actually be talking about.",
		author: "Charlotte Moss",
		date: "May 6, 2026",
		readTime: "8 min",
		image: "/image/cover.webp",
		category: "Cut & Style",
		section: "Trends",
		body: `The 2026 Met Gala theme was "Costume Art," with the dress code "Fashion Is Art," and the hair teams clearly took that literally. This was not a night of safe blowouts. Hair became structure, reference, texture, ornament, and in more than one case, its own accessory. Vogue also called out one of the biggest beauty through-lines of the night: extra-long hair, from Botticelli-like lengths to waist-skimming extensions and mermaid waves.

What made the best looks work was not just drama. It was intention. The hair either extended the story of the gown, sharpened the silhouette, or gave the whole look a stronger point of view.

Here are the 10 hair moments stylists will actually be talking about.

## 1. Chase Infiniti's Natural Curls

Chase Infiniti had one of the most beautiful texture moments of the night. Her curls were full, defined, glossy, and shaped with a soft roundness that felt powerful without being overworked.

What made it land was the balance: the hair had volume, but it still looked touchable. The curl pattern was kept consistent between her natural hair and added length, with the roots picked out to build that airy, sculptural shape.

This was red carpet hair that celebrated natural texture instead of smoothing it into something more predictable.

> Stylist read: movement, definition, and shine carried the whole look. No unnecessary control, no flattening, no apology.

![Chase Infiniti's natural curls at the 2026 Met Gala](/image/chase-i.png)

## 2. Emma Chamberlain's Platinum Pixie

Emma Chamberlain's hair was the opposite of the ultra-long trend, which is exactly why it stood out.

Her platinum pixie felt personal, sharp, and slightly undone. Paired with a Mugler look inspired by painted surfaces and artistic texture, the short hair made the whole thing feel more intimate and less costume-driven. Vogue described her look as one that turned the body into a canvas, and the hair supported that by staying cropped, pale, and expressive rather than overly polished.

> Stylist read: this is how short hair wins on a maximalist carpet. It does not compete. It edits.

![Emma Chamberlain's platinum pixie at the 2026 Met Gala](/image/emma.webp)

## 3. Madonna's Theatrical Gothic Length

Madonna went fully conceptual, with extremely long, dark, textured hair crowned by a surreal ship-like headpiece. The result felt gothic, theatrical, and completely aligned with the art-history mood of the night.

The hair was not there to be "pretty." It was there to build a scene. Reports connected the look to surrealist references, and that comes through in the way the hair and headpiece worked together as one object.

> Stylist read: sometimes hair is not the finish. Sometimes it is architecture.

![Madonna's theatrical gothic length at the 2026 Met Gala](/image/Madonna.webp)

## 4. Rihanna's Gold Wire Pin Curls

Rihanna's hair was one of the clearest examples of the theme becoming beauty. Her look featured an intricate crown of 40 gold wire pin curls, turning classic pin-curl structure into something metallic, sculptural, and almost jewel-like.

The genius was in the restraint of the base. The hair stayed sleek and controlled so the gold detailing could become the focal point. It did not read like decoration placed on top of a hairstyle. It read like the hairstyle had become jewelry.

> Stylist read: pin curls, but elevated into metalwork.

![Rihanna's gold wire pin curls at the 2026 Met Gala](/image/Rihanna.jpg)

## 5. Sabrina Carpenter's 1920s Faux Bob

Sabrina Carpenter traded her usual long, soft curls for a 1920s-inspired faux bob, complete with sculpted rolls and a jeweled headpiece. The look played perfectly against her Dior film-strip gown, which referenced classic Hollywood and her namesake film inspiration.

This was one of the strongest examples of styling illusion. Her hair was not actually cut short. It was shaped into a bob effect, giving the drama of a transformation without losing the length.

> Stylist read: faux bobs are only convincing when the curl set is strong. This one had the shape, the bounce, and the period reference.

![Sabrina Carpenter's 1920s faux bob at the 2026 Met Gala](/image/Sabrina Carpenter.avif)

## 6. Nicole Kidman's Ultra-Long Blonde

Nicole Kidman helped set the long-hair tone early. Her waist-length blonde extensions, paired with soft fringe, gave the look that almost Rapunzel effect that kept showing up across the carpet. Vogue noted that her long hair, styled by Adir Abergel, helped define the evening's extra-long hair mood.

The reason this worked was polish. The length was dramatic, but the finish stayed soft and expensive rather than heavy.

> Stylist read: long hair on a red carpet needs movement. If it just hangs, it drags the look down. This had flow.

![Nicole Kidman's ultra-long blonde at the 2026 Met Gala](/image/Nicole Kidman.jpg)

## 7. Beyoncé's Mermaid Waves

Beyoncé's return to the Met Gala came with long mermaid waves, a warm blonde tone, sculptural face-framing pieces, and a crystal headpiece that echoed the maximalist energy of her gown. Reports noted that the look was styled by Neal Farinah and played into controlled volume and high-impact glamour.

This was not beach hair. It was red carpet mermaid hair: polished, expensive, and built to hold its shape under cameras.

> Stylist read: the face frame did the heavy lifting. It kept all that length from overwhelming her features.

![Beyoncé's mermaid waves at the 2026 Met Gala](/image/beyonce.jpg)

## 8. EJAE's Binyeo Updo

EJAE's look brought cultural detail into the hair in a way that felt polished and relevant. Her updo was held with binyeo, traditional Korean hairpins, creating a sculptural shape that connected directly to heritage while still reading modern on the Met steps.

Her silver sculptural gown already leaned futuristic, but the hair gave it history and specificity. Reports highlighted the silver embellishment and artistic styling around her debut look.

> Stylist read: hair accessories work best when they are not afterthoughts. Here, the pins were part of the identity of the look.

![EJAE's binyeo updo at the 2026 Met Gala](/image/EJAE.webp)

## 9. Troye Sivan's Shiny Brunette Volume

Troye Sivan's hair was a grooming standout: glossy brunette, lifted, sculpted, and slightly rebellious. GQ connected his look to Robert Mapplethorpe references, with deliberately disheveled height and texture playing against his Prada styling.

What made it interesting was the finish. It was not matte or messy in the usual rock-star way. It had rich tonal depth and a lacquered quality, which made the volume feel more editorial.

> Stylist read: brunette can be just as high-impact as bleach when the gloss is right.

![Troye Sivan's shiny brunette volume at the 2026 Met Gala](/image/Troye Sivan.png)

## 10. Lisa's Extra-Long Hair and Sculptural Veil

Lisa leaned into the night's ultra-long hair movement with dramatic length and a sculptural veil detail. Vogue included her among the key extra-long hair references of the night, noting how accessories helped turn length into a full visual statement.

The look worked because the hair was not just long for length's sake. It was part of the silhouette, extending the line of the outfit and giving the styling a more ceremonial feeling.

> Stylist read: when hair is this long, the accessory has to justify it. Here, it did.

![Lisa's extra-long hair and sculptural veil at the 2026 Met Gala](/image/lisa.png)

## The Bottom Line

The best Met Gala hair this year was not about one trend, even though the extra-long hair wave was impossible to miss. The stronger story was that hair became part of the artwork.

Long waves turned into Botticelli references. Pin curls became sculpture. Updos became cultural storytelling. Pixies became edits. Curls became volume, texture, and identity.

That is what made 2026 interesting. The hair was not just finishing the look. It was helping explain it.`,
		metaTitle: "10 Best Hair Looks at the 2026 Met Gala",
		metaDescription: "From gold wire pin curls to Botticelli-length waves, these are the 10 hair moments from the 2026 Met Gala that stylists will actually be talking about."
	},
	{
		id: 24,
		slug: "mothers-day-effortless-hairstyles",
		tag: "Cut & Style",
		title: "Mother's Day Special Edition: 6 Effortless Hairstyles Stylists Are Loving",
		excerpt: "Mother's Day hair should feel soft, pretty, and easy to wear. These six stylist-loved looks bring polish, lift, and movement with very little fuss.",
		author: "Nora Bell",
		date: "May 8, 2026",
		readTime: "5 min",
		image: "/image/woman-in-bathrobe-using-hair-dryer-in-bathroom-2026-03-25-22-37-47-utc.jpg",
		category: "Cut & Style",
		section: "Trends",
		body: `Mother's Day hair should feel soft, pretty, and easy to wear. Think polished texture, flattering shape, and styles that hold up through brunch, family photos, flowers, and a full day of being celebrated.

From a stylist's perspective, these are the easy looks we keep coming back to because they work beautifully on real clients. They give the hair lift, movement, and that sweet finished feel with very little fuss.

## 1. The Soft Half-Up Claw Clip

A half-up claw clip is one of the quickest ways to make hair look lifted and styled. Take the top section, twist it back, secure it with a pretty clip, then let the ends fall softly over the clip for extra volume.

The vibe is feminine, fresh, and relaxed. It keeps the hair away from the face while still showing off length, waves, or curls.

![Image placeholder: a soft half-up claw clip hairstyle with lifted crown volume and loose lengths falling over the clip.](/image/soft-half-up-claw-clip.png)

## 2. The Elevated Low Ponytail

A low ponytail always feels chic when the crown has a little softness. Gather the hair low, loosen the top slightly, and smooth the sides with your hands for that effortless salon finish.

This style feels clean and elegant. It pairs beautifully with soft knits, dresses, button-downs, and anything with a pretty neckline.

![Image placeholder: an elevated low ponytail with a soft crown, smooth sides, and a polished low tie.](/image/low.png)

## 3. The Claw Clip Messy Bun

This is the easy updo clients always love because it looks casual and styled at the same time. Gather the hair low, twist it into a loose bun, and secure it with a claw clip. Leave a few face-framing pieces out for softness.

The finish feels cool, modern, and very wearable. It is great for moms who want their hair up while still looking put together.

![Image placeholder: a claw clip messy bun with loose texture, soft face-framing pieces, and a relaxed low shape.](/image/bun.png)

## 4. The Voluminous Half-Up Style

For instant lift, a voluminous half-up style is always a good choice. Secure the top section into a small ponytail, then gently loosen the crown and sides to create shape.

This look gives the hair that fresh, bouncy feel while keeping everything simple. It is especially pretty for photos because it opens up the face and keeps the overall shape full.

![Image placeholder: a voluminous half-up hairstyle with crown lift, soft sides, and bouncy loose lengths.](/image/half up.png)

## 5. The Soft Twisted Low Pony

A twisted low ponytail adds just enough detail to feel special. Twist the side sections back, secure them low, then let the rest of the hair fall into a soft ponytail.

The feel is graceful and romantic. It works beautifully for brunch, garden lunches, family gatherings, or any Mother's Day outfit with a softer, more classic mood.

![Image placeholder: a soft twisted low ponytail with side twists gathered into a graceful low pony.](/image/low-ponytail.avif)

## 6. The Effortless Textured Bun

A textured bun is always a stylist favorite for easy polish. Start with soft waves or heatless curls, gather the hair into a bun, and gently pull it apart to build shape and fullness.

This style feels romantic, modern, and very photo-friendly. A few loose pieces around the face make it even prettier, especially with statement earrings or a floral dress.

![Image placeholder: an effortless textured bun with soft waves, fullness, and loose face-framing pieces.](/image/back.png)

## Stylist Tip

The secret is softness, balance, and a little lift at the crown. A cute claw clip, a small elastic, or a few loose curls can make the whole style feel intentional in seconds.

Mother's Day hair should feel like you, just a little more polished. Chic, touchable, and ready for every sweet photo moment.`,
		metaTitle: "Mother's Day Special Edition: 6 Effortless Hairstyles Stylists Are Loving",
		metaDescription: "Soft, pretty, and easy Mother's Day hairstyles stylists love, from claw clip looks to low ponytails, textured buns, and romantic half-up styles."
	},
	{
		id: 25,
		slug: "history-of-hair-color",
		tag: "Color",
		title: "A Stylish History of Hair Color: From Ancient Pigment to Modern Salon Craft",
		excerpt: "Before gloss bowls and toner charts, people were already using plants, minerals, and early chemistry to change the way hair looked. A colorist's guide to where it all started, and what it means behind the chair today.",
		author: "Leila Fernandez",
		date: "May 12, 2026",
		readTime: "12 min",
		image: "/image/ancient.png",
		category: "Color",
		section: "Trends",
		body: `Hair color has always carried a mood. Before gloss bowls, toner charts, balayage boards, and bond builders, people were already using plants, minerals, sunlight, and early chemistry to change the way hair looked and felt.

From a stylist's perspective, that part is fascinating. The tools have changed completely, but the client desire feels very familiar. People have always wanted hair that feels softer, richer, brighter, bolder, younger, more polished, or more personal.

> "A good hair color tells us two things: how the client wants to feel and how they want to be seen."

## Hair Color Through the Ages: A Quick Timeline

| Era / Region | What People Used | What It Represented | What Stylists See Today |
|---|---|---|---|
| Ancient Egypt | Henna and plant-based pigment | Ritual, beauty, warmth, status | Copper, auburn, cinnamon brunette |
| Ancient China | Herbal and mineral formulas | Youthfulness, refinement, dark glossy hair | Gray coverage, black gloss, rich brunette |
| Indian subcontinent and henna cultures | Henna for hair, skin, and ceremony | Celebration, beauty, tradition | Warm red glosses, natural stain, shine |
| Indigenous Americas | Plants, clays, minerals, natural pigments | Identity, ceremony, adornment, storytelling | Color as personal expression |
| Ancient Mediterranean and Rome | Plant dyes, metals, ash, natural mixtures | Fashion, status, tone shifting | Blonding, darkening, tonal correction |
| Renaissance Venice | Lightening recipes and sun exposure | Golden hair as a beauty ideal | Honey blonde, vanilla blonde, soft bronde |
| 19th century chemistry | Synthetic dye discoveries | More control, stronger color science | Modern formulation begins |
| Early 20th century salons | Professional hair dye systems | Color becomes a salon craft | Consultations, formulas, shade families |
| 1950s and beyond | Home color and mass advertising | Everyday beauty maintenance | Natural gray coverage, polished brunettes |
| 1970s to now | Bleach, vivid color, fashion shades | Rebellion, personality, self-expression | Vivids, color blocking, peekaboo panels |

## 1. Ancient Egypt: The Original Warm Gloss

One of the earliest beauty stories in hair color starts with henna. In ancient Egypt, henna was used to stain mummies and mummy wrappings, and some mummies have been found with red hair dyed by henna. That tells us hair color was connected to ritual, preservation, and beauty long before modern salons existed.

From behind the chair, this feels very full circle. Warmth is still one of the most powerful ways to make hair look alive. Copper, auburn, cinnamon brown, and soft chestnut all bring that same richness clients love when they want their hair to catch light beautifully.

> Warm tones have staying power because they make the hair look glossy, healthy, and dimensional.

![Ancient henna pigments and natural dye materials, the original color palette](/image/henna.webp)

## 2. Ancient China: Dark Hair, Youth, and Refinement

Ancient Chinese hair-coloring traditions also deserve a clear place in the story. Research on reconstructed Chinese hair colors notes that recipes for herbal and mineral hair color were documented from the Jin Dynasty period, including formulas for coloring white hair and beards black.

That sounds historical, but the salon connection is very current. A lot of clients still come in asking for rich dark hair because it feels polished, youthful, and clean. The modern version may be a soft black gloss, a deep espresso brunette, or gray coverage that blends naturally through the hairline.

Dark color looks simple, but it needs balance. Too flat can feel heavy. Too ashy can look dull. The prettiest dark shades usually have shine, softness, and a customized undertone.

![Deep espresso brunette with gloss finish, the modern version of an ancient ideal](/image/espresso.png)

## 3. Indigenous Americas: Color as Identity and Storytelling

Across Indigenous communities in the Americas, natural pigments from plants, minerals, and clay have been used for decoration, ceremony, craft, hair, and body adornment. The U.S. Forest Service notes that native plant dyes have been used to decorate animal skins, fabrics, crafts, hair, and bodies.

This part of the history should be handled with respect because meanings vary by community. Still, the larger beauty takeaway is clear: color has often carried identity, symbolism, and story.

In the salon today, we see a modern version of that same idea. Some clients choose cherry cola brunette because it feels confident. Some choose icy blonde because it feels fresh. Some choose hidden panels of pink or blue because they want a little personality without changing their whole look.

> Color is visual language. Even a subtle gloss says something.

![Natural plant-based pigments, color as ceremony, identity, and personal expression](/image/natural.avif)

## 4. Ancient Rome and the Early Blonding Conversation

Ancient Mediterranean hair-coloring practices used naturally occurring materials from plants and minerals, and historical summaries describe Roman hair dyes made from ingredients such as henna, saffron, beechwood ash, and other natural mixtures.

To a colorist, this reads like the earliest version of tone shifting. People were already trying to go warmer, darker, brighter, or lighter. The desire to change the reflection of the hair is ancient.

The professional difference today is control. We understand lift levels, underlying pigment, developer strength, porosity, toner timing, and bond support. Blonding still has glamour, but the modern salon approach is much more strategic.

What clients ask for now:

- "I want to be brighter around my face."
- "I want blonde, but soft."
- "I want it to grow out pretty."
- "I want lighter hair without losing shine."

Those requests are never one-size-fits-all. A soft beige blonde and a high-contrast platinum require completely different plans.

![Face-framing highlights, the modern answer to the ancient desire for lighter hair](/image/face-framing.avif)

## 5. Renaissance Venice: Golden Hair Becomes the Moment

By the Renaissance era, blonde hair had a strong beauty pull, especially in places like Venice. The Walters Art Museum discusses a Venetian cosmetic manuscript from around 1500 that included hair-lightening recipes, showing how intentional beauty routines had become.

As stylists, we still see this every day. Blonde is one of the most requested transformations because it changes the way the face reads. It can soften, brighten, lift, or create that fresh "new season" feeling.

The chic salon version today is placement-led. We use face-framing highlights, root melts, lowlights, glosses, and toners to make blonde feel wearable.

![Honey blonde with root melt, the Renaissance golden ideal, made wearable for modern life](/image/Honey blonde with root melt.webp)

## 6. The Chemistry Shift: Color Becomes More Predictable

A major turning point came in 1856, when William Henry Perkin accidentally discovered mauveine, the first commercialized synthetic dye. That discovery helped open the door to synthetic dye chemistry and a new era of color control.

That moment matters to the beauty industry because modern hair color depends on chemistry. Every formula a colorist mixes is built on control: tone, depth, lift, deposit, timing, and condition.

> "Color became a craft when we stopped guessing and started formulating."

This is where hair color begins to feel closer to the professional salon world we know today.

![Color formulation tools, the chemistry behind every shade a colorist mixes](/image/color.avif)

## 7. The Birth of Professional Salon Color

In 1907, Eugène Schueller launched his first hair dyes, and two years later he founded the company that became L'Oréal. L'Oréal's own history connects the brand's beginning to early hair dye innovation and professional beauty science.

This changed the industry language. Hair coloring became more connected to salons, stylists, formulas, education, and client trust.

Today, a client may bring in an inspiration photo, but the stylist has to translate that photo into a realistic formula based on:

- Natural level
- Previous color
- Hair density
- Porosity
- Scalp sensitivity
- Undertone
- Maintenance schedule
- Desired finish

That is where professional color becomes more than product. It becomes judgment, experience, and technical skill.

![A colorist reviewing a client's hair history before mixing, the consultation is the foundation](/image/consultation.avif)

## 8. The 1950s: Hair Color Becomes Everyday Beauty

By the 1950s, hair color started moving into mainstream beauty culture. Clairol's "Does she or doesn't she?" campaign helped change the public conversation around hair coloring and made natural-looking color feel more accepted as everyday beauty maintenance.

From a salon perspective, this was huge. Hair color became less secretive and more connected to looking polished, fresh, and well cared for.

That influence still shows up in client language today:

- "I want it to look natural."
- "I want gray coverage that feels soft."
- "I want people to notice I look good."
- "I want my brunette to look expensive."
- "I want my blonde to look clean, but easy."

This is where subtle color became powerful. A root touch-up, a soft gloss, or a tone refresh can completely change how finished the hair looks.

![Polished brunette with soft gray blending, the everyday beauty ideal that started in the 1950s](/image/grey.jpeg)

## 9. The 1970s and Beyond: Hair Color Gets Bold

By the late twentieth century, hair color moved strongly into self-expression. Punk became an international movement between 1975 and 1980, and its aesthetic helped push fashion, hair, and beauty into a more rebellious visual space.

That energy is still alive in salons. We see it in vivid panels, blue-black glosses, pink money pieces, smoky lavender, copper shags, platinum pixies, and color blocking.

The modern version feels more customized. A client can go bold with a full vivid transformation, or they can keep it soft with a hidden peekaboo shade under the hair. Expression has range now.

![Vivid color panels, bold self-expression that traces back to the punk movement of the 1970s](/image/self-expression.avif)

## Then vs. Now: What Changed Behind the Chair

| Then | Now |
|---|---|
| Color came mostly from plants, minerals, and natural materials | Colorists can customize tone, depth, brightness, and finish |
| Results were harder to predict | Formulas are built around hair history, lift level, and porosity |
| Hair color often carried ritual, status, or symbolism | Hair color carries lifestyle, identity, maintenance, and personal style |
| Blonding was rougher and less controlled | Modern blonding uses strategic placement, toner, and bond support |
| Gray coverage was often the main goal | Gray blending, glossing, and dimensional color are just as important |
| Bold color was more subcultural | Vivids, pastels, and creative color are part of mainstream salon work |

## What Stylists Actually See Working on Clients Now

The prettiest modern color work is customized. The shade matters, but placement matters just as much.

A brunette can look richer with soft ribbons of warmth. A blonde can feel expensive with a root shadow and gloss. A red can feel wearable when the copper, gold, and brown tones are balanced. A vivid color can look elevated when the cut and styling support it.

The modern client usually wants one of these color moods:

**Soft enhancement**, Glosses, beige blondes, warm brunettes, and natural-looking reds.

**Low-maintenance dimension**, Balayage, root melts, lived-in blondes, and soft money pieces.

**Healthy-looking shine**, Demi color, toner refreshes, acidic glossing, and bond care.

**Gray blending**, Softer grow-out with highlights, lowlights, or translucent coverage.

**Personality color**, Copper, cherry cola, rose brown, pastel panels, vivid ends, or hidden color.

## Stylist Consultation Checklist

Before we mix anything, we read the hair like a map.

| What We Check | Why It Matters |
|---|---|
| Hair history | Old color, bleach, henna, box dye, or toner can change the result |
| Natural level | This tells us how much lift or deposit is realistic |
| Porosity | Porous hair can grab color quickly and fade unevenly |
| Elasticity | Weak hair may need treatment before lightening |
| Scalp sensitivity | Comfort and safety come first |
| Skin tone | The right undertone makes the color more flattering |
| Lifestyle | Maintenance should match the client's real routine |
| Inspiration photos | Photos help us understand tone, placement, and finish |

## What This Means for Clients Today

Hair color has moved from ancient pigment to precise personalization. The options are endless now, but the best results still come from a smart plan.

A beautiful color should fit the client's face, hair condition, schedule, and style. It should grow out gracefully. It should make the hair feel better, not weaker. It should look good in real life, under salon lighting, in selfies, and on day three after styling.

**Choose a color plan instead of chasing one photo.**

Bring inspiration, but let your stylist customize the version that works for your hair. A photo shows the goal. The consultation builds the route.

For low-maintenance beauty, ask about glossing, dimensional brunette, soft balayage, root melting, or gray blending. For high-impact color, plan for maintenance. Bright blonde, copper, vivids, and color blocking can be gorgeous, but they need the right schedule and home care.

Also, be honest about your hair history. Box dye, henna, old bleach, keratin treatments, hard water, and previous toners all matter. Many brands and professional resources also recommend allergy testing and strand testing before coloring, especially with a new formula or bigger change.

The chicest color is the one that looks intentional, feels wearable, and keeps the hair healthy. History gave us the pigments. Chemistry gave us control. Stylists bring the eye, the formula, and the care plan that make the color feel personal.
`,
		metaTitle: "A Stylish History of Hair Color: From Ancient Pigment to Modern Salon Craft",
		metaDescription: "From henna in ancient Egypt to modern balayage, explore how hair color evolved across cultures and what it means for the salon today."
	},
	{
		id: 29,
		slug: "mens-haircuts-hot-guy-energy",
		tag: "Cut & Style",
		title: "Clean Cuts, Strong Lines, Hot-Guy Energy",
		excerpt: "From buzz cuts to textured crops, these are the styles giving hot guy energy right now. The best ones do not need heavy styling. They work because the shape is strong and the lines are clean.",
		author: "Tom Harley",
		date: "May 31, 2026",
		readTime: "7 min",
		image: "/image/mens-cuts-hero.avif",
		category: "Cut & Style",
		section: "Trends",
		body: `Some men's haircuts just hit differently.

They make the jawline look sharper, the face look cleaner, and the whole look feel more confident. The best ones do not need heavy styling or a complicated routine. They work because the shape is strong, the lines are clean, and the hair actually suits the face.

From buzz cuts to textured crops, these are the styles giving hot guy energy right now.

## 1. Buzz Cut

A buzz cut is simple, clean, and hard to fake.

The modern version does not have to be one flat length all over. You can keep the top slightly longer, add a soft fade on the sides, or adjust the length based on head shape.

This cut puts all the focus on the face. It works especially well when the brows, cheekbones, jawline, or overall bone structure can carry the look.

- **Best for:** square faces, diamond faces, sharper features
- **Vibe:** clean, direct, low-maintenance
- **Ask for:** a short buzz cut with subtle shape, not a completely flat one-length cut

:::image-row
![Buzz cut, close-cropped with soft fade](/image/buzz-cut-1.webp)
![Buzz cut variation, slightly longer on top](/image/buzz-cut-3.jpg)
![Buzz cut on square jaw](/image/buzz-cut-2.webp)
:::

## 2. Crew Cut

The crew cut is the clean haircut that always works.

It is short enough to feel fresh, but still has a little length on top so the haircut has shape. It is easy to maintain and looks good without much styling.

This is a good choice for guys who want to look put together without looking overly styled.

- **Best for:** square, oval, and balanced face shapes
- **Vibe:** clean, easy, athletic
- **Ask for:** a short crew cut with slightly more length on top and tapered sides

:::image-row
![Classic crew cut with tapered sides](/image/crew-cut-1.webp)
![Crew cut, natural finish](/image/crew-cut-2.jpg)
![Crew cut styled forward](/image/crew-cut-3.webp)
:::


## 3. Undercut

The undercut is bold because of the contrast.

The sides are cut short, while the top stays longer. This opens up the face and gives the haircut a stronger shape. It also makes the neck, ears, and jawline look cleaner.

The current version looks best when the top still has movement. Too much product can make it feel stiff or dated.

- **Best for:** oval, square, and diamond faces
- **Vibe:** confident, sharp, noticeable
- **Ask for:** shorter sides with length on top, but keep the finish natural

:::image-row
![Elvis' Undercut](/image/under-cut-1.jpeg)
![MIYAVI‘s undercut, longer top](/image/under-cut-2.webp)
![Undercut from the side](/image/under-cut-3.webp)
:::

## 4. Slick Back

The slick back is the grown-up version of hot guy energy.

The hair is brushed back from the forehead, which shows the full face and creates a cleaner, more polished look. It can feel classic, expensive, and a little intense when done right.

The key is product choice. Use something with flexible hold and light shine. Too much gel can make it look greasy.

- **Best for:** oval, square, and longer face shapes
- **Vibe:** polished, confident, date-night ready
- **Ask for:** medium length on top with tapered sides, styled back with a natural finish

:::image-row
![Slick back with natural shine](/image/slick-back-1.png)
![Jake Gyllenhaal's Slick back](/image/slick-back-2.jpg)
![David Beckham's Slick back](/image/slick-back-3.jpg)
:::

## 5. Wet-Look Fringe

The wet-look fringe is softer and more fashion-forward.

This does not mean soaking the hair or making it look oily. The modern version has light shine, separation, and movement. It should look like clean hair with a little texture and gloss.

This style works well with medium-length hair, soft waves, or a slightly longer fringe around the face.

- **Best for:** long, diamond, round, and square faces
- **Vibe:** cool, moody, effortless
- **Ask for:** soft layers with a fringe that can fall naturally around the face

:::image-row
![Wet-look fringe, light shine](/image/wet-look-1.webp)
![Wet-look fringe on wavy hair](/image/wet-look-2.webp)
![Timothee Chalamet's wet-look fringe styled to one side](/image/wet-look-3.jpg)
:::

## 6. Spiky Texture

Spiky hair is back, but softer than before.

The updated version is piecey, messy, and light. The layers create lift at the roots, while the texture makes the hair look fuller. It should feel relaxed, not stiff.

This is a strong option for guys who want volume without a full quiff or heavy styling routine.

- **Best for:** round, oval, heart-shaped, and diamond faces
- **Vibe:** playful, fresh, low-effort
- **Ask for:** short textured layers on top with natural blending on the sides

:::image-row
![Brad Pitt's Fight Club spiky hair, light and piecey](/image/spiky.avif)
![Spiky texture with root lift](/image/spiky-1.webp)
![Spiky texture on fine hair](/image/spiky-2.webp)
:::

## The Takeaway

The best men's haircut is the one that makes the face look cleaner, the hair look intentional, and the whole style feel easier.

A buzz cut can make sharp features stand out. A fade can clean up the face shape. A textured crop can make the hair look fuller. A slick back can make everything feel more polished.

The goal is simple: look good without looking like you tried too hard.

Save this before your next barber appointment.`,
		metaTitle: "Clean Cuts, Strong Lines, Hot-Guy Energy: 9 Men's Haircuts That Just Work",
		metaDescription: "From buzz cuts to textured crops and slick backs, these are the clean, strong men's haircuts delivering hot-guy energy right now. Find your style before your next appointment."
	},
	{
		id: 26,
		slug: "slick-back-bun",
		tag: "Cut & Style",
		title: "How to Make a Slick-Back Bun Look Polished",
		excerpt: "The slick-back bun looks effortless and elegant. The difference between sleek and greasy is all technique. Here is exactly how stylists do it.",
		author: "Nora Bell",
		date: "May 14, 2026",
		readTime: "7 min",
		image: "/image/pose.png",
		category: "Cut & Style",
		section: "Trends",
		body: `The slick-back bun has become one of those styles clients ask for constantly because it looks effortless, expensive, and clean. You see it on runways, red carpets, and "off-duty model" beauty looks. But behind the chair, stylists know the truth: a good slick-back bun is not just hair pulled tight with gel.

The difference between sleek and greasy-looking is technique.

Done well, it makes your face look lifted, your outfit look sharper, and even second or third-day hair look intentional. Done poorly, it can flatten the head shape, expose every bump, and make the hair look heavy instead of polished.

Here is how stylists approach it.

![A polished slick-back on a model, the kind of finish that reads editorial, not rushed](/image/slick-back-model.png)

## Start With the Right Kind of Hair

A slick-back bun actually works best when the hair is not freshly washed. Slightly oily roots can help the hair stay in place, which is why this style is perfect for days when your hair is due for a wash but you still need to look put together.

That does not mean the hair should feel dirty or overloaded with product. Think of this as a controlled, polished finish rather than a cover-up. If your roots are very oily, use a small amount of dry shampoo first, let it sit, then brush it through before styling.

The goal is grip, not buildup.

## What You Need

- **Fine-tooth comb**: for drawing a clean center part
- **Smoothing brush**: for controlling the surface and brushing the hair back without bumps
- **Hair tie**: to secure the ponytail base
- **U-pins or bobby pins**: to hold the bun shape without bulk
- **Styling product**: gel, wax, pomade, or smoothing balm depending on your hair type

**Optional:** Dry shampoo if the roots look too oily or separated. Use it before styling, let it sit, then brush it through. You still want some natural grip, that is what helps this style hold.

**Choosing your product:** Thicker or frizzier hair usually needs stronger hold. Fine or already-oily hair needs less. The goal is to smooth the hairline, sides, flyaways, and nape, not coat the entire head.

> The stylist rule: shape first, product second. The brush creates the polish. Product should only refine it.

![The right tools laid out, comb, smoothing brush, gel, U-pins, and a hair tie](/image/tool.png)

## Step 1: Create a Clean Middle Part

The part is one of the most important details in this look.

Use the tail end of a fine-tooth comb to draw a straight line down the center of your head. Then separate the hair evenly on both sides. A clean part immediately makes the style look more intentional.

Stylists usually start by perfecting the part before touching the rest of the shape. If the part is uneven, the finished bun can look rushed, even if everything else is smooth.

![A clean center part drawn with a fine-tooth comb, the foundation of the whole look](/image/comb.png)

## Step 2: Brush From the Part Outward

Once the part is set, brush the hair away from the center part on both sides. This keeps the top looking smooth and symmetrical.

Do not just brush everything backward right away. That can blur the part and create bumps near the crown. Instead, work from the part outward, then guide the hair back into the direction of the ponytail.

This is the step that gives the slick-back bun that clean, sculpted look.

## Step 3: Place the Ponytail Slightly Higher

Placement changes the entire mood of the style.

If the ponytail sits too low, the look can feel more severe or formal. If it sits slightly higher, the face looks more lifted and the bun feels more modern.

A good guide: place the ponytail around the middle-back of the head, not too close to the neck and not too high on the crown. You want the bun to feel elegant, not like a ballet bun or a gym bun.

Tie the hair securely, but do not pull so tightly that the scalp looks strained. A slick-back bun should look polished, not uncomfortable.

![Ponytail placement at the mid-back of the head, the position that reads elegant rather than severe](/image/back.jpeg)

## Step 4: Lift the Crown Before You Finish

This is the stylist trick most people skip.

After tying the ponytail, look at the top and crown area. If everything is pulled too flat, gently loosen the crown with your fingers or the end of your comb. Lift it just enough to give the head shape a softer curve.

This makes the style more flattering from the side. It also prevents the slick-back from looking too harsh.

The key is subtlety. You are not teasing the hair or creating volume. You are simply giving the head shape a little balance.

## Step 5: Twist the Bun and Secure It With Pins

Twist the ponytail into a bun and wrap it around the base. Keep the shape tight enough to stay in place, but not so tight that it becomes tiny and stiff.

Secure the bun with U-shaped pins, especially at the top and bottom. U-pins are useful because they hold the shape without creating the bulky feeling you sometimes get from too many elastics.

After pinning, gently pull the bun outward a little. This makes it look fuller and more natural. A slick-back bun does not need to be huge, but it should have shape.

![A wrapped bun secured with U-pins, full enough to read elegant, tight enough to stay polished](/image/bun.jpeg)

## Step 6: Smooth the Hairline, Sides, and Nape

This is where the style becomes truly sleek.

Use a small amount of gel, wax, or pomade and smooth down the short hairs around the hairline. Work in thin layers. It is better to add a little more product later than to start with too much and make the roots look oily.

Brush the sides down and back so the hair follows the shape of the head. Then check the back of the neck. Those small hairs at the nape are often what make a slick-back style look unfinished.

Brush them upward toward the bun and set them with product.

> From a stylist's perspective, the back matters just as much as the front. You may not see it in the mirror, but everyone else does.

![Smoothing the nape with a fine brush and product, the detail most people miss but everyone sees](/image/gel.jpeg)

## Step 7: Soften the Look If Needed

A very clean slick-back can look chic, but it can also feel intense depending on your face shape, outfit, or occasion.

For a softer finish, pull out two tiny pieces near the sideburns or in front of the ears. Keep them minimal. The point is not to create loose tendrils everywhere, but to break up the severity around the face.

This works especially well if you want the style to feel more wearable for daytime.

## Common Mistakes Stylists Notice

The biggest mistake is using too much product at the roots before the hair is shaped. Product should refine the style, not do all the work. Brush and tension create the foundation. Gel or wax creates the finish.

Another common mistake is pulling the hair straight back without considering head shape. A little lift at the crown makes the style look more flattering and less flat.

The third mistake is ignoring the nape. If the front is sleek but the back has loose baby hairs sticking out, the look loses its polish.

Finally, avoid making the bun too tight and tiny unless that is the exact look you want. A slightly fuller bun usually feels more elegant and less severe.

![Lifted, sculpted finish](/image/slick-cover.png)

## The Stylist Takeaway

The slick-back bun is not just a no-wash day shortcut. It is a styling technique that turns natural root oil, controlled tension, and careful smoothing into a polished finish.

The clean part makes it sharp. The lifted crown makes it flattering. The smooth hairline and nape make it look professional. The bun shape keeps it modern.

So the next time your roots feel a little oily, do not automatically reach for a hat. Pull the hair back, sculpt the shape, smooth the details, and make it intentional.

A good slick-back bun should not look like you are hiding your hair.

It should look like you meant to wear it that way.`,
		metaTitle: "How to Make a Slick-Back Bun Look Polished, Not Greasy",
		metaDescription: "The difference between a sleek slick-back bun and a greasy one is all technique. Here is how stylists do it, step by step."
	},
	{
		id: 27,
		slug: "fine-frizzy-wavy-hair",
		tag: "Hair Care",
		title: "Your Fine, Frizzy Hair Might Actually Be Wavy",
		excerpt: "A stylist's guide to bringing out soft texture without making your hair feel crunchy, heavy, or overdone.",
		author: "Priya Allison",
		date: "May 18, 2026",
		readTime: "10 min",
		image: "/image/wavy.jpg",
		category: "At-Home Tips",
		section: "Hair Care",
		body: `A lot of clients sit in the chair and describe their hair the same way.

:::quote-carousel
It looks straight, but it never dries smooth.
---
It gets huge the second there is humidity.
---
It has a little bend when wet, but once it dries, it just looks puffy.
:::

This is usually the moment I tell them: your hair may not be straight. It may be wavy hair that has never been styled like wavy hair.

Fine, frizzy hair can be tricky because it does not always form obvious curls. You may not have ringlets. You may not look at your hair and think, "I have curly hair." But if your hair expands in humidity, looks bendy when wet, and dries into an undefined puff, there is probably a natural wave pattern hiding underneath.

The goal is not to force your hair into curls. The goal is to help your natural texture organize itself.

![A close-up of fine wavy hair air-drying with soft, grouped texture, the kind of result this guide is working toward](/image/dry hair.png)

## Why Fine, Frizzy Hair Gets So Puffy

Straight hair usually dries in a more predictable direction. Wavy hair does not. It has bends, curves, and uneven movement through the strand. When there is not enough water, moisture, or hold, those bends separate from each other instead of grouping together.

That separation is what we see as frizz.

From a stylist's point of view, frizz is often not just "damage." Sometimes it is texture without structure. The hair wants to wave, but it has no support, so it dries fluffy instead of defined.

This is especially common with fine hair because fine strands are easy to weigh down, but they also lose shape quickly. You need hydration, but not too much. You need hold, but not a heavy, stiff finish.

Here is how to bring out the wave without making your hair feel greasy, crunchy, or flat.

## 1. Start Styling When Your Hair Is Very Wet

If you want waves to form, do not wait until your hair is half dry.

The best time to style wavy or curly texture is when the hair is soaking wet. Not towel-dried. Not just damp. Wet enough that the strands can still move together and form clumps.

This matters because water helps the hair group into natural sections. When the hair starts drying before product is applied, the strands separate, and that is when frizz starts showing up.

A stylist tip: keep a spray bottle nearby. If one side dries while you are working on another section, rewet it before applying product or scrunching. Fine hair dries quickly, so this step makes a big difference.

![Spray bottle being used to rewet sections of hair before styling, a key step for fine wavy hair](/image/spray.png)

## 2. Use Leave-In Conditioner, But Keep It Away From the Roots

Wavy hair needs moisture because the natural oils from your scalp do not always travel evenly down the strand. The bends in the hair make it harder for oil to coat the full length. That is why wavy hair can feel dry even when your scalp gets oily.

A lightweight leave-in conditioner gives the hair slip, softness, and a smoother base before styling.

For fine hair, placement matters. Do not load leave-in conditioner directly onto your roots unless your hair is very dry there. Apply it from the mid-lengths to the ends, where frizz and dryness usually show the most.

Think of leave-in conditioner as the prep step. It softens the hair so the wave can form. It is not the product that creates the hold.

## 3. Add a Lightweight Gel or Mousse for Shape

A lot of people avoid gel because they think it will make their hair hard or crunchy. The truth is, wavy hair usually needs some kind of hold while it dries.

Without hold, your hair may look wavy when wet, then dry into a soft cloud with no definition.

A lightweight gel or mousse helps create a temporary cast around the hair. That cast holds the wave pattern in place while the hair dries. It also helps reduce frizz because the strands are not moving around as much during the drying process.

For fine hair, look for something lightweight. You want support, not stiffness. Apply it while the hair is still very wet, then scrunch upward to encourage the wave.

The crunch is not the final look. It is part of the setting process.

![Lightweight gel being scrunched into soaking-wet wavy hair, the cast will soften once the hair is fully dry](/image/gel.png)

## 4. Do Not Create a Hard Straight Part Right Away

This is one of the most overlooked styling mistakes.

If your hair is fine, frizzy, and slightly wavy, a very clean middle part or side part can make the top look flat while the sides puff out. That creates the shape many clients complain about: flat at the crown, wide at the sides, and undefined everywhere else.

Instead, use a softer parting technique.

Take small sections at the top and gently zigzag the part with a comb or your fingers. Then lift the sections slightly at the root and let them fall naturally. This helps the waves settle in different directions instead of clumping into one flat line.

In salon language, we are trying to avoid a harsh split at the scalp. A softer part gives you more natural volume and a better wave pattern through the top.

After that, scrunch the hair while it is still wet. Flip your head forward if you need more root lift, then scrunch upward from the ends toward the scalp.

## 5. Start Drying With Hover Diffusing

If you use a diffuser, do not immediately scoop the hair into it and push it up to the scalp.

For fine, loose waves, that can disturb the pattern too early and create frizz before the style has a chance to set.

Start with hover diffusing instead. Hold the diffuser near the hair without touching it. Let the warm air begin to set the gel or mousse cast. This helps the wave pattern become more stable before you introduce movement.

Move from side to side so the hair does not dry in one stiff position. Once your hair is about halfway dry, then you can begin gently cupping sections into the diffuser.

Use low speed when possible. High airflow can rough up the cuticle and blow the wave pattern apart.

![A diffuser held several inches from wet hair during the hover diffusing phase, letting the cast set before touching it](/image/diffuser.png)

## 6. Dry the Roots Before Over-Drying the Ends

Fine wavy hair often holds moisture near the scalp. If you only dry the ends first, you can end up with dry, frizzy ends and damp, flat roots.

Instead, focus some drying time at the roots.

Place the diffuser near the scalp and let the roots dry before scrunching all the hair into the diffuser. This helps give the crown more lift and prevents the top from collapsing.

Once the roots are mostly dry, you can continue diffusing the mid-lengths and ends. Stop when the hair is about 80 to 90 percent dry, then let the rest air dry if you have time.

The main rule: do not keep touching it while it dries. Touching breaks the cast too early and creates frizz.

## 7. Scrunch Out the Cast Only When Hair Is Fully Dry

When gel or mousse dries, your hair may feel a little stiff. That is normal.

Do not panic and brush it out. Do not keep running your hands through it. That cast is protecting the wave underneath.

Once your hair is fully dry, gently scrunch it with clean hands to soften the finish. This is often called "scrunching out the crunch." The goal is to break the cast without breaking the shape.

If your hair is very fine, you may not need oil. Oil can make fine waves fall flat. If your hair is thicker, drier, or more frizz-prone, you can use a tiny amount of lightweight hair oil on your hands before scrunching.

Use less than you think. You can always add more, but you cannot easily remove too much oil once it is in the hair.

![Hands gently scrunching dry wavy hair to release the cast, soft, defined waves underneath](/image/scrub.png)

## 8. Touch Up Undefined Pieces With a Small Curling Wand

Natural texture does not always dry perfectly, especially if the hair has heat damage, color damage, or uneven wave patterns.

As stylists, we know that not every piece of hair behaves the same way. The front pieces may be straighter. One side may wave better than the other. Some sections may bend at the root, then go flat through the ends.

You can touch up those pieces with a small curling wand.

The key is to use a narrow barrel, usually 3/4 inch or smaller. A larger curling iron can make the piece look too styled and separate from the rest of your natural texture.

Look at the direction the hair is already trying to move, then follow that pattern. You are not creating a full curled hairstyle. You are helping the awkward pieces blend in.

Use heat protection and keep this step minimal, especially if your hair is fine or fragile.

## The Best Product Order for Fine, Frizzy Waves

For most fine, frizzy, hidden-wavy hair, the order should be:

- Soaking wet hair
- Lightweight leave-in conditioner on mid-lengths and ends
- Lightweight gel or mousse
- Scrunch
- Hover diffuse
- Diffuse roots
- Let the hair fully dry
- Scrunch out the cast
- Touch up only the pieces that need it

The biggest mistake is trying to smooth this hair the same way you would smooth straight hair. If your hair naturally wants to bend, brushing it into place while it dries can make it look bigger, not sleeker.

## Why Humidity Makes This Hair Look Worse, But Also Gives a Clue

Humidity is usually the giveaway.

If your blowout disappears the second the air gets damp, but your natural texture starts looking more alive, your hair is probably trying to wave. Moisture in the air activates the bend, but without the right styling steps, that bend turns into puffiness.

That does not mean you have to wear your hair natural every day. You can still blow it out. You can still use hot tools. But when the weather is humid, working with your wave pattern may give you a better result than fighting it.

![Side-by-side comparison, blowout in humidity vs. embraced wave pattern styled correctly](/image/before-and-after.jpg)

## Final Stylist Takeaway

Fine, frizzy hair is not always straight hair that needs more smoothing. Sometimes it is wavy hair that needs more water, better product placement, and a drying method that protects the pattern.

Start soaking wet. Use lightweight hydration. Add hold. Diffuse gently. Do not touch it too much while it dries.

The first time you style it this way, it may not be perfect. That is normal. Natural texture has a learning curve. But once you understand what your hair is trying to do, frizz becomes much easier to control.`,
		metaTitle: "Your Fine, Frizzy Hair Might Actually Be Wavy | A Stylist's Guide",
		metaDescription: "If your hair never dries smooth and explodes in humidity, it may be wavy. A stylist's step-by-step guide to bringing out soft waves without crunch or frizz."
	},
	{
		id: 28,
		slug: "wolf-cut-2026",
		tag: "Cut & Style",
		title: "The 2026 Wolf Cut: Messy is the new Sexy",
		excerpt: "The wolf cut is back, and this time it is softer, more wearable, and more personal. A stylist breaks down five versions of the cut, who they work for, and how to ask for exactly what you want.",
		author: "Yuna Seo",
		date: "May 19, 2026",
		readTime: "11 min",
		image: "/image/Wolf-cut.jpeg",
		category: "Cut & Style",
		section: "Trends",
		metaTitle: "The 2026 Wolf Cut: Messy is the new Sexy",
		metaDescription: "The wolf cut is back for 2026. Softer, more wearable, and more personal. A stylist breaks down five versions of the cut and how to ask for exactly what you want.",
		body: `The most current haircut this year is not perfectly smooth, tucked under, or overly controlled. It moves. It bends. It has pieces that flip out around the cheekbones, jawline, collarbone, and neckline.

That is why the wolf cut keeps showing up in salons again.

But from a stylist's point of view, the wolf cut is often misunderstood. It is not just messy hair. It is a cut designed to look a little undone while still having shape. The difference is important: texture looks intentional, while frizz looks unmanaged.

![Kendall Jenner's wolf cut with choppy layers and soft movement through the ends.](/image/kendall.png)

A modern wolf cut blends the structure of a shag with the attitude of a mullet. It usually has shorter, choppier layers around the crown for lift, with longer, softer pieces through the face and ends so the hair still feels wearable. Hair.com describes the wolf cut as a mix between a shag and a mullet, while Cosmopolitan notes that the cut is built around crown volume, face-framing layers, and longer movement through the bottom.

## Why the Wolf Cut Works So Well Now

Clients are moving away from hair that has to sit perfectly all day. The newer mood is softer, looser, and more personal. The hair does not need to look freshly blown out every second. It needs to have life.

This is also why the wolf cut has stayed popular in Asian beauty references, especially in K-pop, Thai celebrity styling, and Korean salon trends. Teen Vogue has noted that the wolf cut has long been a favorite in South Korean salons and K-pop styling, with its mix of soft face-framing, choppy texture, and gender-fluid shape.

> The wolf cut is not about looking undone. It is about looking like you did not try too hard, and that takes real skill to cut.
> — Yuna Seo, Cut & Style Editor

For many non-Asian hair types, especially straight, medium-thick, or dense hair, this cut can also be very useful. It removes heaviness without taking away the whole length. It gives straight hair more direction. It helps medium-length hair look less flat. And for clients growing out a bob or short cut, it gives the awkward stage a clear shape.

## The New Wolf Cut Is Softer Than Before

The early wolf cut was often more rebellious: heavy fringe, dramatic crown layers, and a stronger mullet shape. The 2026 version is more flexible.

It can be sweet, cool, feminine, boyish, polished, or edgy depending on the length, bang shape, and texture. Orm Kornnaphat's recent Dior front-row look is a good Asian reference for the softer direction: airy layers, wispy bangs, brushed-out texture, and flipped ends that still feel clean.

Suki Waterhouse is another useful reference. Her mid-length wolf cut was styled with long curtain bangs, an off-center part, and polished airy layers, which makes the cut feel less harsh and more wearable for everyday clients.

That is the version most clients should be asking for: movement without losing softness.

![Suki's soft wolf cut with curtain bangs and airy layers. The 2026 direction is less rebellious, more wearable](/image/Suki Waterhouse.jpeg)

## Style 1: The Soft Collarbone Wolf Cut

**Best for:** oval, heart-shaped, diamond, and longer face shapes

**Good references:** Karina, LingLing Kwong, Suki Waterhouse, Jenna Ortega

This is the easiest wolf cut to try if you are not ready for anything too extreme. The length usually sits around the collarbone or slightly below. The layers are visible, but they are not cut too high. The face-framing pieces sit around the cheekbones and jawline, which helps soften the face without making the hair feel too thin.

From a stylist's perspective, this version works because it keeps enough weight at the bottom. That matters. If the ends are over-layered, the hair can start to look stringy, especially on fine or naturally straight hair.

For styling, use a lightweight leave-in conditioner or smoothing cream if the hair gets frizzy. Then use a flat iron to slightly bend the ends outward or inward. You do not need to curl the whole head. A few bends around the face and ends are enough.

![Collarbone-length wolf cut with soft face-framing layers and slightly flipped ends - the most wearable entry point into the style](/image/Jenna Ortega.jpeg)

## Style 2: The Airy Wolf Cut

**Best for:** round, oval, soft-featured, and fuller face shapes

**Good references:** Orm Kornnaphat, Winter

This version feels light, youthful, and slightly androgynous. The layers are broken up around the cheekbones, the bangs are usually wispy or piecey, and the neckline has movement instead of a blunt finish.

This is a strong option for clients who say, "My hair is heavy, but I do not want it short." It gives the top more lift and makes the sides feel less bulky.

The key is the bang area. Curtain bangs make it softer. Wispy bangs make it more Korean salon-inspired. A shorter fringe makes it more editorial. For rounder faces, I would avoid cutting the side layers too short near the cheek unless the client wants a very bold shape. Keeping some softness around the jawline is usually more flattering.

![Airy wolf cut with wispy bangs and lifted crown, a K-beauty-influenced take that works especially well on straight, medium-thick hair](/image/Orm Kornnaphat.webp)

## Style 3: The Short Statement Wolf Cut

**Best for:** oval faces, strong features, clients who like a bolder look

**Good references:** Soyeon, Miley Cyrus, Keke Palmer

This version leans closer to the mullet side of the wolf cut. The crown is shorter, the sides are more separated, and the ends have more flick. It can look very cool, but it needs the right client and the right haircut.

InStyle describes the wolf cut as a celebrity-favored layered haircut with volume, choppier top layers, and longer back layers, and points to examples like Miley Cyrus, Billie Eilish, and Keke Palmer.

For Asian references, Soyeon-style short wolf cuts work because they use the haircut almost like part of the whole image. It is not just a soft beauty cut. It changes the attitude of the face and outfit.

**Stylist note:** this is not the best version for someone who wants low-risk hair. If the top layers are cut too short, the grow-out can feel awkward. If the sides are too thin, the face can look wider. This version needs balance.

![Short statement wolf cut with dramatic crown layers and strong flick at the ends, the boldest version of the style](/image/Soyeon.png)

## Style 4: The Long Wavy Wolf Cut

**Best for:** wavy hair, medium-to-thick hair, clients who want change without losing length

**Good references:** Cara Delevingne, Billie Eilish

This version keeps more length through the back but adds shape through the crown and face. It works well when the client wants movement but still wants to feel like they have long hair.

Bangstyle describes Cara Delevingne's 2026 wolf cut as a softer, more refined version of the shag-mullet shape, with crown volume, textured ends, and movement that does not rely on perfect styling.

This is one of my favorite versions for clients with natural waves because the cut helps the wave pattern show up. Instead of forcing the hair into a smooth blowout, the layers let the hair separate naturally.

**Stylist note:** the shortest layer should not be too high unless the client has enough density to support it. If the top is too short and the bottom is too long, the haircut can look disconnected.

![Long wavy wolf cut with crown volume and textured ends. The layers activate the wave pattern without forcing a blowout](/image/wolf-cut-billie-eilish.jpg)

## Why This Cut Is Good for Growing Hair Out

A lot of clients get stuck between short and long hair. The bottom starts to feel heavy, the top goes flat, and the front pieces no longer frame the face.

The wolf cut gives that in-between stage a purpose.

Instead of waiting for the hair to grow while it loses shape, the stylist can carve out movement around the crown, cheekbones, and neckline. The hair still grows, but it grows with direction.

This is especially helpful for clients growing out a bob, lob, short shag, or shoulder-length cut. The wolf cut makes the transition feel more intentional.

## What to Ask Your Stylist For

Do not just say, "I want a wolf cut." That can mean too many different things.

Say something more specific:

> "I want a soft wolf cut with face-framing layers, lightness through the ends, and some volume at the crown, but I do not want the top layers too short."

Then bring references. Bring one Asian reference and one Western reference if possible. This helps your stylist understand whether you want the cut to feel soft, edgy, feminine, boyish, polished, or more dramatic.

| Your Hair Type | What to Ask For |
|---|---|
| Fine hair | Longer layers so the ends do not become too thin |
| Thick hair | Weight removal without making the sides too bulky |
| Straight hair | Soft texturizing so the layers do not look like steps |
| Wavy or curly hair | Ask your stylist to cut with your natural texture in mind |

## How to Style a Wolf Cut at Home

The wolf cut does not need perfect styling, but it does need some direction.

**First, dry the roots.** If the crown goes flat, the haircut loses its shape. Focus on lifting the top and front sections before worrying about the ends.

**Second, choose the right product for your texture.** Fine hair can use dry shampoo or texture spray at the roots for lift. Davines notes that dry shampoo can help very fine hair create volume and texture between washes.

For most wolf cuts, a volumizing mousse, texturizing spray, heat protectant, and light hairspray are enough. John Frieda's wolf cut styling guide also recommends mousse at the roots, a hairdryer, a round brush, and a curling iron or straightener for shaping the layers.

**Third, do not over-style every piece.** Flip out a few ends. Bend the face-framing pieces. Let some sections fall naturally. The haircut looks better when it has variation.

![Styling a wolf cut at home: mousse at the roots, a diffuser or round brush, and a few bent ends are all you need](/image/style-wolf-cut.png)

## The Stylist Takeaway

The wolf cut is popular because it gives hair movement again. It is not stiff. It is not overly neat. It lets the hair have personality.

But the best wolf cuts are not random. They are customized. The stylist has to consider hair density, face shape, curl pattern, natural volume, and how much time the client actually wants to spend styling.

The real goal is not "messy hair." The goal is controlled texture: soft layers, visible movement, healthy ends, and a shape that still looks good when the hair is not perfectly done.`
	},
	{
		id: 30,
		slug: "bangs-guide-2026",
		tag: "Cut & Style",
		title: "Find the Bangs That Actually Suit You",
		excerpt: "Bangs can change your whole look faster than a new color. The 2026 guide to fringe trends, face shapes, and exactly what to ask your stylist.",
		author: "Yuna Seo",
		date: "May 31, 2026",
		readTime: "10 min",
		image: "/image/bang-cover.webp",
		category: "Cut & Style",
		section: "Trends",
		body: `Bangs can change your whole look faster than a new color.

They sit right at the center of the face, so they affect the way people notice your eyes, cheekbones, forehead, and overall face shape. The right bangs can make a haircut feel softer, cooler, sharper, or more styled with very little effort.

For 2026, bangs are moving in two directions: softer, lived-in texture and bolder, more intentional shapes. Wispy bangs, curtain bangs, side bangs, micro bangs, curly fringe, and customized face-framing cuts are all key fringe directions this year.

The big shift: bangs do not need to look heavy, flat, or overly done. The best versions have movement, softness, and a little bend so they work with the rest of the haircut.

## The 2026 Bangs Mood: Soft Layers and Natural Bend

The strongest bangs trend this year is not one single cut. It is the way bangs are being finished.

Think lighter ends, softer face-framing, small bends instead of perfect curls, bangs that grow out well, and texture that feels natural, not forced.

This is why airy bangs, bottleneck bangs, side bangs, and soft curtain shapes are showing up everywhere. They give the face a focal point without locking you into a high-maintenance haircut.

## Bottleneck Bangs

Bottleneck bangs are shorter in the center and gradually get longer toward the sides. They frame the upper part of the face and blend into the rest of the haircut.

This is one of the most wearable bang shapes because it gives structure without feeling too blunt. It can soften cheekbones, balance a rounder face, and add shape around the eyes.

On short hair, bottleneck bangs feel cool and slightly undone. On medium or long hair, they feel softer and more effortless.

- **Best for:** round faces, square faces, diamond faces, higher cheekbones
- **Ask for:** shorter pieces in the center with longer, blended face-framing pieces on the sides
- **Style note:** blow-dry the center forward, then curve the side pieces away from the face

:::image-row
![Bottleneck bangs on straight hair, shorter center with blended sides](/image/bottleneck-bangs-1.webp)
![Bottleneck bangs on medium-length hair](/image/bottleneck-bangs-2.webp)
![Bottleneck bangs with soft face-framing layers](/image/bottleneck-bangs-3.webp)
:::

## Soft Side-Swept Bangs

Side-swept bangs are back, but the 2026 version is softer and less structured than before.

The shape moves across the forehead in a light diagonal line, helping soften the cheekbone and jaw area. It works especially well if you want bangs but do not want a full forehead-covering fringe.

Straight hair makes this style look polished. Wavy or medium-length hair makes it look more relaxed and romantic.

- **Best for:** round faces, diamond faces, higher cheekbones
- **Ask for:** a soft side bang that blends into face-framing layers
- **Style note:** keep the ends slightly curved, not curled under too tightly

:::image-row
![Soft side-swept bangs on short hair](/image/soft-side-swept-1.webp)
![Side-swept bangs on wavy, medium-length hair](/image/soft-side-swept.webp)
![Side-swept bangs blending into long layers](/image/soft-side-swept-3.webp)
:::

## Curved Bangs

Curved bangs have a soft bend through the ends, usually with the movement opening slightly outward.

This shape is useful because it adds softness around the cheekbones and jaw without adding too much height at the roots. That matters for longer face shapes, where too much lift on top can make the face look even longer.

Curved bangs also look good when the hair is tied up because the face-framing pieces keep the style from looking too bare.

- **Best for:** long faces, round faces, square faces, higher cheekbones
- **Ask for:** light bangs with curved ends and soft side pieces
- **Style note:** use a round brush or flat iron only on the ends to create a small bend

:::image-row
![Curved bangs with outward-opening ends](/image/curved-1.webp)
![Curved bangs on a longer face shape](/image/curved-2.webp)
![Curved bangs styled with the colored hair](/image/curved-3.webp)
:::

## Airy Blunt Bangs

Airy blunt bangs give the look of a straight-across bang without the heaviness.

They usually sit around the brow area, but the density is lighter than a classic blunt bang. You still get that clean, pretty shape across the forehead, but the result feels softer and easier to wear.

This is a good choice for someone who wants a visible change but does not want thick, helmet-like bangs.

- **Best for:** long faces, round faces, diamond faces
- **Ask for:** brow-length bangs with a soft, airy finish and slightly blended sides
- **Style note:** the key is density. Too much hair makes them heavy; too little makes them stringy

:::image-row
![Airy blunt bangs at brow level, light density](/image/airy-1.webp)
![Airy blunt bangs on fine hair](/image/airy-2.webp)
![Airy blunt bangs with blended sides](/image/airy-3.webp)
:::

## Brow-Grazing Bangs

Brow-grazing bangs sit right around the eyebrow or slightly below it.

This length draws attention to the eyes and can make the whole haircut feel more styled. It is a strong option for someone with a longer forehead or a face shape that benefits from more softness at the top.

The only caution: this length needs maintenance. Once the bangs start touching the lashes, they can feel annoying quickly.

- **Best for:** long faces, higher foreheads
- **Ask for:** bangs that softly skim the brows, with the length customized to your eye shape
- **Style note:** plan on trims every few weeks if you want to keep the exact length

:::image-row
![Brow-grazing bangs on straight hair](/image/brow-1.webp)
![Brow-grazing bangs drawing focus to the eyes](/image/brow-2.webp)
![Brow-grazing bangs with a side part](/image/brow-3.webp)
:::

## Choppy Baby Bangs

Baby bangs are short, bold, and very visible.

The 2026 version is less perfect and more piecey. Instead of a clean straight line, the ends can be slightly uneven or textured. This gives the cut more attitude and makes it feel modern.

This is not the easiest bang to grow out, so it is better for someone who already likes a strong beauty look. It works especially well with sharp features, short cuts, bobs, and fashion-forward styling.

- **Best for:** oval faces, petite features, strong personal style
- **Ask for:** short choppy bangs above the brows with soft uneven texture
- **Style note:** keep the rest of the haircut intentional so the bangs look cool, not accidental

:::image-row
![Choppy baby bangs above the brows on a bob](/image/choppy-1.webp)
![Baby bangs with piecey, textured ends](/image/choppy-2.webp)
![Baby bangs on a long cut](/image/choppy-3.webp)
:::

## Contour Bangs

Contour bangs are customized face-framing pieces cut around the cheekbones, jawline, and sides of the face.

This is one of the most practical options because it can be adjusted to the person. The stylist can place the shortest and longest pieces based on what needs more balance: cheekbones, jawline, forehead, or face width.

The goal is not to hide the face. The goal is to create a better frame.

- **Best for:** round faces, higher cheekbones, stronger jawlines
- **Ask for:** customized face-framing pieces that blend into the haircut
- **Style note:** bring photos from the front and side so your stylist can see the exact shape you want

:::image-row
![Contour bangs framing cheekbones and jaw](/image/contour-1.webp)
![Contour bangs on a round face shape](/image/contour-3.webp)
![Contour bangs on red hair](/image/contour-2.webp)
:::

## Soft Hime-Inspired Face Frame

The classic hime cut has very defined face-framing panels. The softer version is lighter, thinner, and easier to wear.

The length can sit near the cheekbone, jaw, or chin, depending on the face shape. It gives structure around the face without looking too graphic.

This is a good option for someone who wants a trendier shape but still needs it to work in real life.

- **Best for:** square faces, stronger jawlines, higher cheekbones
- **Ask for:** soft hime-inspired face-framing pieces with lighter density
- **Style note:** a slight inward bend at the ends helps the pieces sit better

:::image-row
![Soft hime-inspired face frame at cheekbone length](/image/hime-1.webp)
![Hime face frame on straight hair](/image/hime-2.webp)
![Soft hime pieces at jaw length](/image/hime-3.webp)
:::

## Flipped-Out Bangs

Flipped-out bangs are all about the direction of the ends.

The pieces are cut to frame the face, then styled outward to open up the cheekbone and jaw area. This can make the mid-face look more lifted and give the haircut a more styled finish.

It works especially well with layered cuts, medium-length hair, and soft blowouts.

- **Best for:** wider jawlines, higher cheekbones, flatter mid-face areas
- **Ask for:** face-framing bangs long enough to flip away from the face
- **Style note:** use a round brush or flat iron to flick the ends outward

:::image-row
![Flipped-out bangs on short hair](/image/flipped-3.webp)
![Flipped-out face-framing on medium layered hair](/image/flipped-1.webp)
![Flipped ends on a soft blowout](/image/flipped-2.webp)
:::

## Sleek Side Bangs

This is the K-beauty version of side bangs: smooth, close to the forehead, and softly separated.

Instead of big volume, the shape follows the natural part and lays closer to the face. It works well with straight hair, sleek ponytails, and soft waves.

This style can help visually shorten a longer forehead and create a more styled look without cutting a full bang.

- **Best for:** long faces, higher foreheads
- **Ask for:** a longer side bang that can be styled close to the forehead
- **Style note:** use a small amount of styling balm to separate the pieces without making them stiff

:::image-row
![Sleek side bangs lying close to the forehead](/image/sleek-1.webp)
![Sleek side bangs on a sharp, short hair](/image/sleek-2.webp)
![Side bangs with a soft, defined part](/image/sleek-3.webp)
:::

## How to Choose the Right Bangs

Look at your eyes and brows first. Bangs pull attention toward the center of the face. If your eyes and brows are already your strongest features, a lighter bang, curtain bang, or face-framing piece can soften the forehead while keeping the eyes open. If you want more focus around the eyes, brow-grazing or airy blunt bangs can help.

Look at the overall strength of your features. Stronger features can usually handle more visible bangs. Softer features often work better with airy bangs, side bangs, bottleneck bangs, or tendrils.

Look at the space between your eyes and temples. If the outer sides of the face feel wider, side pieces can help bring the focus inward. Bottleneck bangs, contour bangs, and tendril bangs work well here.

Look at your forehead and hairline. A strong cowlick, widow's peak, or uneven hairline can affect how bangs sit. In this case, avoid forcing a perfectly straight bang. A side bang, curtain bang, or textured bang will usually be easier.

Be honest about styling time. If you do not want to style every morning, choose long face-framing bangs, bottleneck bangs, tendril bangs, or airy curtain bangs. If you are comfortable with a round brush or flat iron, you can handle brow-grazing, curved, flipped-out, or straight-across bangs.

## How to Maintain Bangs

Bangs are small, but they need attention. If they look oily or flat in the morning, separate the bangs, lightly wet or wash that section, then blow-dry them back into shape.

A small round brush, flat iron, dry shampoo, and light hairspray can make bangs much easier to live with.

For most full bangs, plan on a trim every three to four weeks. Long face-framing bangs can grow out for weeks and still look good. Brow-length and straight-across bangs need more frequent attention because even a small amount of growth changes the look.

## The Takeaway

The best bangs are not just the trendiest bangs. They are the bangs that work with your face shape, hair texture, hairline, and daily routine.

For 2026, the most wearable options are soft, customized, and easy to grow out. Bottleneck bangs, airy bangs, side bangs, tendrils, and face-framing layers give the face shape without making the haircut feel high-maintenance.

Before cutting, bring reference photos, talk through your styling routine, and ask your stylist how the bangs will grow out. The right bangs should make your haircut look better on day one and still make sense six weeks later.`,
		metaTitle: "Find the Bangs That Actually Suit You: The 2026 Bangs Guide",
		metaDescription: "From bottleneck bangs to baby bangs, tendrils to straight-across fringe: the complete 2026 guide to bangs trends, face shapes, and what to ask your stylist."
	},
	{
		id: 31,
		slug: "female-hair-loss-stylist-guide",
		tag: "Hair Thinning",
		title: "What Stylists Should Know About Female Hair Loss",
		excerpt: "Clients describe hair loss by what they notice first. As hair professionals, we need to read the pattern. A practical guide to the layers behind female hair loss and how to have better conversations about it.",
		author: "Lauren Chavez",
		date: "Jun 1, 2026",
		readTime: "8 min",
		image: "/image/thinning.png",
		category: "Hair Thinning",
		section: "Hair Care",
		body: `
Female hair loss can come from several places. Sometimes the issue is shedding. Sometimes the follicle is slowly producing finer hair. Sometimes the hair is breaking before it has a chance to grow longer. Scalp inflammation, stress, postpartum changes, medication shifts, nutrition, thyroid issues, and tension styling can all be part of the picture.

The goal is simple: help the client understand what we are seeing, what may be driving it, and when she needs medical support.

## The Main Patterns Stylists Should Separate

| Pattern | What it looks like | What to explain to the client |
|---|---|---|
| Pattern thinning | Wider part, thinner crown, more visible scalp | The follicle is still active, but it may be producing finer, weaker hair over time. |
| Shedding | More hair in the shower, brush, pillow, or floor | The hair cycle may have been pushed into a shedding phase by stress, illness, postpartum changes, medication, nutrition, or thyroid issues. |
| Breakage | Thin ends, uneven lengths, short broken pieces | The hair may be snapping from damage, heat, color, tension, or extensions. |
| Scalp inflammation | Itching, flakes, redness, soreness, oil imbalance | The scalp environment may be making it harder for the follicle to function well. |
| Tension loss | Weak edges, thinning temples, tight-style history | Repeated pulling can stress the follicle, especially around the hairline. |


## Pattern Thinning: The Follicle Gets Smaller Over Time

Female pattern hair loss usually shows up through the part, crown, and top of the head. The hairline may stay mostly intact, but the scalp becomes more visible.

The main process is miniaturization.

The follicle keeps working, but each cycle may produce a smaller, finer strand. A strong hair becomes softer. The part looks wider. The ponytail feels thinner. Under salon lighting, we start seeing more scalp between strands.

This is why early pattern thinning can be easy for clients to miss. They may still be growing hair, but the quality and size of the hair coming in has changed.

**Where hormones fit**

Androgens are part of the pattern-thinning conversation. Women naturally make testosterone, and in the scalp, testosterone can convert into DHT. In follicles that are sensitive to that signal, the growth phase may shorten and the follicle may gradually produce finer hair.

This does not always mean the client has a major hormone imbalance. Many women with pattern thinning have normal bloodwork. The issue can be local follicle sensitivity, genetics, life stage, and scalp biology.

| Client says | What to say |
|---|---|
| “Are my hormones messed up?” | “Not always. Some follicles are more sensitive to hormone signals, even when bloodwork looks normal.” |
| “Why is the top thinning more?” | “Different areas of the scalp respond differently. The crown and part line are usually more vulnerable.” |
| “Will I go completely bald?” | “Female pattern thinning usually causes gradual density loss on top, rather than full scalp baldness.” |

## Shedding: The Hair Cycle Gets Disrupted

Clients focus on shedding because they can see it. Hair in the shower feels urgent.

Shedding can happen after stress, illness, surgery, rapid weight change, postpartum changes, medication shifts, nutrition gaps, or thyroid issues. The trigger often happens months before the shedding starts, so clients may not connect the two.

Pattern thinning moves slower. Shedding can feel sudden.

That difference matters. A product may reduce fallout, but density only improves if stronger hair is growing back from the follicle.


| What to ask | Why it matters |
|---|---|
| “When did this start?” | Sudden shedding and slow thinning point to different causes. |
| “Did anything major happen 2 to 4 months before?” | Delayed shedding often follows stress, illness, surgery, postpartum shifts, or weight changes. |
| “Any new medication, supplement, or birth control change?” | These can affect the hair cycle. |

## Breakage: The Hair Is Snapping, Not Falling

Before recommending a growth product, check whether the hair is falling from the root or breaking along the length.

Breakage often shows up as thin ends, uneven mid-lengths, short broken pieces, or fragile hair after lightening, heat styling, chemical services, tight ponytails, or extensions.

For these clients, the first step may be a lower-tension routine, gentler color plan, heat reduction, bond support, or a cut that removes weak ends.

A growth serum will not fix hair that keeps snapping from the shaft.

## Scalp Environment: The Follicle Lives There

The scalp is the follicle's working environment.

Inflammation, itching, flakes, oil imbalance, tightness, or irritation can make thinning harder to manage. Clients may treat scalp symptoms like a side issue, but the follicle is sitting inside that environment every day.

Persistent redness, scaling, pain, sores, or patchy loss should be referred to a dermatologist.


| What to ask | Why it matters |
|---|---|
| “Any itching, burning, soreness, or flaking?” | Scalp inflammation may be involved. |
| “Does your scalp feel oily, tight, or irritated?” | Scalp imbalance can affect comfort and consistency with routines. |
| “Have you noticed patches or sudden bald spots?” | Patchy loss needs medical evaluation. |

## The Deeper Follicle Conversation

This is the part clients rarely hear.

Hair growth depends on the follicle and the tissue around it. 

- **Inside the follicle,** dermal papilla cells help control hair size, growth rhythm, and follicle strength. 
- **Around the follicle,** blood flow, oxygen response, hormone signals, inflammation, and local energy support all influence how well the follicle performs.

Clients do not need the technical terms. They need the useful takeaway:

Healthy-looking hair starts with a follicle that can produce stronger hair and stay in the growth phase long enough for density to show.

This is why one simple product story often falls short. A formula may support the scalp. Another may reduce shedding. Another may improve the feel of the hair. Real density change usually requires more direct support at the follicle and the environment around it.

## What Stylists Should Say Before Recommending Products

Use language that keeps expectations realistic.

| Client concern | Stylist response |
|---|---|
| “I just need something for shedding.” | “Let's track shedding, but also your part line, temples, and strand thickness.” |
| “This serum says it grows hair.” | “Some formulas support the scalp or reduce fallout. We want to watch whether density actually changes.” |
| “My ponytail feels smaller.” | “That can come from shedding, breakage, or finer regrowth. Let's check the scalp and the ends.” |
| “I've used a serum for months and still look thin.” | “Less shedding is one sign, but visible density depends on the quality of the hair growing back.” |

## When to Refer Out

Recommend a dermatologist when the client has sudden heavy shedding, patchy loss, scalp pain, burning, scaling, sores, eyebrow loss, irregular periods, acne with facial hair growth, or thinning that keeps progressing despite routine changes.

Stylists can spot patterns, protect the hair, adjust services, and guide clients away from unrealistic product expectations. Medical providers can check for scalp disease, internal triggers, and treatment options.

## Chair-Side Takeaway

Female hair loss needs a layered consultation.

Start with what you can see: part line, crown density, temples, scalp condition, strand quality, and breakage. Then separate the likely pattern before recommending anything.

The most important distinction for clients is this: shedding less and rebuilding density are different outcomes.

That makes the product conversation more honest. Some products support the scalp. Some improve hair feel. Some may reduce fallout. Stronger solutions need to work closer to the follicle and support the environment that helps thicker hair grow.`,
		metaTitle: "What Stylists Should Know About Female Hair Loss",
		metaDescription: "A practical chair-side guide to reading female hair loss patterns, understanding shedding vs. thinning, and having better conversations with clients about density and growth."
	},
	{
		id: 32,
		slug: "french-open-tennis-hairstyles",
		tag: "Cut & Style",
		title: "Game, Set, Hair",
		excerpt: "Clay-court season has a very specific beauty mood. From double-anchor ponytails to ribbon braids and boxer braids, these are the tennis-inspired sport hairstyles to wear now and into U.S. Open season.",
		author: "Nora Bell",
		date: "Jun 4, 2026",
		readTime: "8 min",
		image: "/image/french-open-tennis-hairstyles.avif",
		category: "Cut & Style",
		section: "Trends",
		body: `Clay-court season has a very specific beauty mood: sun, sweat, red clay, crisp tennis whites, slicked-back hair, braided ponytails, and hair accessories that actually have a job.

With Roland-Garros running through June 7 and the U.S. Open already on the late-summer calendar, tennis hair is moving from the court into everyday summer styling. Think less "perfect blowout," more court-ready, sweat-proof, still looks good after the match.

## Why Athlete Hair Works So Well for Summer

A match-day hairstyle has to survive running, serving, jumping, sweating, wind, visors, towels, and warmups. It cannot fall apart five minutes in and cannot pull so hard that your scalp hurts before the first set is over.

That is why tennis players keep coming back to a few reliable shapes: high ponytails, braided ponytails, bubble ponies, headbands, slick buns, visor-friendly styles, and face-framing tendrils. Coco Gauff, Serena Williams, Venus Williams, Aryna Sabalenka, and Ons Jabeur all show different versions of the same idea: athletic hair can be practical and still have personality.


## The Bubble Ponytail

For long hair, a regular ponytail can swing, tangle, hit your face, and pull on the scalp. A bubble ponytail keeps the length controlled.

Tie your hair into a ponytail, then add small elastics every few inches down the length. Gently pull each section outward to create soft bubbles. It gives shape without needing braiding skills.

- **Best for:** long hair, thick hair, high-impact movement
- **Works well with:** tennis skirts, oversized jerseys, summer dresses
- **Why it works:** controls hair movement and keeps the ponytail from whipping around
- **Style tip:** use clear or color-matched elastics for a clean look, or bright elastics for U.S. Open energy

:::image-row
![Bubble ponytail with evenly spaced soft sections on long hair](/image/bubble1.webp)
![Bubble ponytail from the side showing shape](/image/bubble2.webp)
![Bubble ponytail with brightly colored elastics](/image/bubble3.webp)
:::


## The Braided Ponytail

The braided ponytail is a classic athlete hairstyle for a reason. It keeps the hair together, limits tangling, and still gives movement. It also looks good with visors, headbands, and tennis dresses.

Serena and Venus Williams made braids one of the most iconic beauty signatures in tennis, especially with beaded styles early in their careers. Their influence is still part of how we talk about hair, sport, and self-expression on court.

- **Best for:** tennis, training, long hair, textured hair, protective styling
- **Works well with:** headbands, ribbons, beads, wrapped elastics
- **Why it works:** keeps the length controlled while still looking strong
- **Style tip:** start with a secure ponytail base first, then braid the length so the base does not loosen

:::image-row
![Braided ponytail secured with a ribbon at the base](/image/braided1.webp)
![Double Braided ponytail on textured hair with beaded ends](/image/braided2.webp)
![Braided ponytail worn under a cap](/image/braided3.webp)
:::

## Boxer Braids

Boxer braids, also known as double Dutch braids, are one of the most secure sport hairstyles. They sit close to the scalp, keep layers controlled, and work for everything from tennis to boxing to dance workouts.

This is the style to choose when you do not want to think about your hair again for the rest of the day.

- **Best for:** high-impact workouts, layered hair, thick hair, long days outside
- **Works well on:** straight, wavy, curly, and textured hair
- **Why it works:** maximum hold with minimal loose hair
- **Style tip:** add a little dry shampoo or texture spray before braiding so the hair has grip

:::image-row
![Boxer braids sitting close to the scalp on straight hair](/image/boxer1.webp)
![Double Dutch braids on thick textured hair](/image/boxer2.webp)
![Boxer braids tied off with bright elastics](/image/boxer3.webp)
:::

## The Ribbon Ponytail

A ribbon is the easiest way to make a plain ponytail feel French Open-inspired. Tie your hair into a ponytail or braid, then add a ribbon at the base or around the end.

For Roland-Garros energy, choose clay red, cream, espresso brown, dusty pink, or navy. For U.S. Open energy, go brighter: cobalt, white, yellow, metallic silver, or black.

- **Best for:** simple ponytails, braids, low buns, half-up hair
- **Works well with:** tennis dresses, polos, pleated skirts, sporty summer outfits
- **Why it works:** inexpensive, easy, and instantly styled
- **Style tip:** choose a grosgrain ribbon if you want it to hold better than satin

:::image-row
![Ribbon ponytail in clay red for Roland-Garros styling](/image/ribbon1.webp)
![Cream grosgrain ribbon tied at a low ponytail base](/image/ribbon2.webp)
![Bright cobalt ribbon on a braided ponytail for U.S. Open energy](/image/ribbon3.webp)
:::


## How to Make Sport Hair Actually Stay

Start with hair that has grip. Freshly washed, silky hair can slip out faster, so a little dry shampoo, texture spray, or light styling cream helps.

Use strong elastics. Do not tie every style at maximum tension. A hairstyle can feel secure without pulling at the hairline. If your scalp hurts before you leave the house, redo it.

For outdoor tennis or summer workouts, keep a mini kit in your bag: extra elastics, a few bobby pins, a small brush, dry shampoo, and a soft headband.

## The Takeaway

The best athletic hairstyles are not complicated. They are secure, clean, and easy to refresh.

French Open-inspired hair gives you clay-court polish: braids, ribbons, visors, slick buns, and soft sporty details. U.S. Open season brings the late-summer version: brighter colors, harder hold, sweat-proof styling, and a little New York attitude.

Whether you are playing tennis, watching from the stands, or just wearing the tennis-core outfit because it looks good, the rule is simple: your hair should stay out of your face and still look like part of the look.`,
		metaTitle: "Game, Set, Hair: French Open-Inspired Sport Hairstyles for Summer 2026",
		metaDescription: "From double-anchor ponytails to ribbon braids and boxer braids, these are the tennis-inspired sport hairstyles to wear through French Open and into U.S. Open season."
	},
	{
		id: 33,
		slug: "what-your-hair-says-about-you-sex-and-the-city",
		tag: "Style & Culture",
		title: "Your Hair Is Already Talking. Are You Listening?",
		excerpt: "From Nicole Kidman's iconic curls making a comeback to the four women of Sex and the City, here's why a haircut says more about who you are—and who you're becoming—than almost anything else.",
		author: "Nora Bell",
		date: "Jun 7, 2026",
		readTime: "10 min",
		image: "/image/change-hair-1.webp",
		category: "Style & Culture",
		section: "Inspiration",
		body: `A new hairstyle really does change your face. Not metaphorically, literally.

There's a reason Nicole Kidman's golden curls set off a whole internet moment not long ago. She'd just made headlines for her first solo Christmas post-divorce, but what people couldn't stop talking about wasn't her relationship status, it was her *energy*. Silk Doen dress, a Chanel wicker bag, Manolo Blahnik gold sandals, effortlessly cool and completely unbothered. And then those curls.

"Those curls are back and suddenly she looks 25 again," someone wrote. And honestly? Not wrong.

The classic "transformation" arc almost always plays out the same way: frizzy curls smoothed into sleek straight hair signals a character's arrival, her polish, her upgrade. It's the *Princess Diaries* makeover in visual shorthand.

:::image-row
![Nicole's curly hair](/image/nicole1.webp)
![Nicole in Princess Diaries](/image/nicole2.webp)
:::

There was also a different kind of reading going around, photos from other recent appearances, her hair loose and a little undone. Some people saw that look and called it messy. Others called it freedom.

Same person, two different hairstyles, two completely different conversations.

## Hair Changes More Than Your Look

People say a new haircut changes everything. But it's not really that the cut changes *you*, it's that the cut reflects something that was already shifting inside. Nicole Kidman stepping out with her signature curls wasn't just a styling choice. It was a signal.

Film directors have known this forever. When a character needs to evolve on screen, the costume department gets involved, but the hair department goes first.

:::image-row
![Sarah Snook in Succession](/image/succession1.webp)
![Sarah Snook in Succession](/image/succession2.webp)
:::

When a character crosses into power, really starts playing the game, the hair gets shorter. Sharper. Think *Succession*: the longer something stays in the family, the more aggressive the lines become.

And then there's the moment that hits differently every time you see it. The mirror scene. The scissors. A character cutting off her own hair is never just about hair. *Gone Girl*, *Blue Is the Warmest Color*, dozens of others, the haircut is the turning point, the declaration, the thing that says: *I'm done being who I was.*

:::image-row
![Gone Girl](/image/Gone Girl.webp)
![Blue Is the Warmest Colour](/image/Blue Is the Warmest Colour.webp)
![Eternal Sunshine of the Spotless Mind](/image/eternal.webp)
:::

Hair doesn't need a line of dialogue. It's already telling the whole story.

## Which Brings Us to Sex and the City

If there's one piece of television that turned the idea of "hair equals personality" into an actual philosophy, it's *Sex and the City*. Four women, four hairstyles, four completely different ways of moving through the world.

The show invented a template for a certain kind of urban women's story, and it did it as much through hair as through plot. Each character's relationship to her own hair was a direct reflection of her relationship to herself.

:::image-row
![](/image/sex1.webp)
![](/image/sex2.webp)
:::

## Carrie: The Curl Is the Character

Carrie Bradshaw's curls are the most iconic hair in the show, possibly in all of 90s and early 2000s television. But here's the thing: they were never *styled*. That's exactly the point.

The hair always looked like she'd just woken up. Or like she'd been walking fast in the wind and didn't care. Untamed. Impractical. Alive.

One look and you already knew: this woman runs on feeling. She doesn't follow rules because she finds rules less interesting than the exception.

:::image-row
![](/image/sex3.webp)
![](/image/sex4.webp)
![](/image/sex5.webp)
:::

Carrie wrote a sex and relationships column in New York City without a stable income, without a steady relationship, and without a consistent sense of whether she was making the right choices. Her apartment was rent-controlled and barely affordable. Her closet was full of things she couldn't afford. Her love life was chaos.
She was drawn to Mr. Big precisely *because* he was wrong. The danger, the ambiguity, the sense that she could never quite pin him down, that was the appeal. She walked away from Aidan, who was good and stable and kind, more than once.

The hair reflected all of it.

The only times Carrie straightened her hair were the moments she was trying to become someone else, someone more upper-east-side, more controlled, more acceptable to a world that made her feel like she wasn't quite enough. It never lasted. The curls came back. Because *she* came back.

Carrie once said: "I will never be the woman with the perfect hair who can wear white and not spill on it." She said it like it was a flaw. It wasn't. It was the whole point.

:::image-row
![](/image/sex6.webp)
![](/image/sex7.webp)
![](/image/sex8.webp)
:::

## Miranda: The Bob That Doesn't Apologize

Miranda's auburn bob said everything before she opened her mouth. Short. Precise. Not interested in softening itself for anyone.

She was a lawyer in the 1990s, in a field that was still overwhelmingly male. The cut made sense as a strategic choice, but Miranda was never purely strategic. She chose an arresting shade of orange-red, a color that refused to disappear into the background. The logic was sharp; the execution was bold. That tension ran through everything she did.

:::image-row
![](/image/sex9.webp)
![](/image/sex10.webp)
![](/image/sex11.webp)
:::

Miranda was the most rational one at the table, the one who'd say, in the middle of a conversation about men, "Can we please talk about something else for five minutes?" But she was also the one who consistently chose Steve, a man the world told her was below her grade. She hated loneliness more than she hated anything else. That was the crack in the armor, and she knew it.

Watch the hair change over the seasons. When she leaned into vulnerability, pregnancy, single motherhood, learning to be a partner without disappearing into it, the bob got softer. The color went deeper, more burnished. Less attack, more depth.

The bob never fully relaxed. But it learned to breathe.

## Charlotte: The Perfect Hair, the Imperfect Life

Charlotte York's hair was always immaculate. Center-parted, glossy, the exact right amount of wave, never too much, never too little. It looked like it had been brushed 100 times before she left the apartment. It probably had.

She dressed the same way: Chanel suits, silk blouses, ladylike cuts that telegraphed Upper East Side good breeding even before she said a word. She was the one who still believed in The Right Man, The Right Marriage, The Right Life, and she was going to look the part while she waited for it.

:::image-row
![](/image/sex12.webp)
![](/image/sex13.webp)
![](/image/sex18.webp)
:::

Here's the thing, though: Charlotte's perfectionism wasn't confidence. It was anxiety wearing a silk blouse.

She couldn't walk into a sauna without her robe. She couldn't deviate from the plan because the plan was the only thing holding everything together. She married a man who was objectively correct on paper, handsome, wealthy, old family, and moved into an apartment so tasteful it looked like a magazine spread. And then she found out her perfect husband had a problem he'd never told her about, and the magazine-spread life didn't have a chapter on what to do next.

She divorced him. She converted religions for a man she actually loved. She stopped performing perfection and started living through imperfection instead.

The hair, in those later seasons, became a little less lacquered. Not messy, Charlotte would never be messy, but *breathing*. Human. That was the whole arc, visible in the gloss level of a blowout.

:::image-row
![](/image/sex17.webp)
![](/image/sex15.webp)
![](/image/sex16.webp)
:::

## Samantha: Controlled, Maximalist, Unapologetic

Samantha Jones's hair was the opposite of Carrie's in almost every technical sense. Where Carrie's was all movement and chaos, Samantha's was engineered. The cut, the volume, the shine, nothing was accidental.

And yet the spirit behind it was the same energy dialed up to eleven: *I am exactly who I want to be, and I dressed for myself, not for you.*

Samantha wore high-saturation color, leopard print, sequins, things with architectural shoulders. Her style wasn't soft sexy, it was what you might call *dominant* sexy. She built an image the way a publicist builds a brand, which made sense, because she was a publicist. She lived by the same principle she applied to her clients: you are the message.

:::image-row
![](/image/sex19.webp)
![](/image/sex20.webp)
![](/image/sex21.webp)
:::

What the show did with Samantha that felt genuinely subversive was this: she didn't perform sexuality for men's benefit. She exercised it for her own. She didn't want to be chosen. She chose. Every time.

The season six breast cancer storyline is where it all landed. When chemo took her hair and she had to remove the wig in front of her partner, Samantha stood there, no constructed image, no performance, no product, and she was still entirely herself. The glamour turned out to be the least interesting thing about her. The life force underneath it was the real story.

:::image-row
![](/image/sex22.webp)
![](/image/sex24.webp)
![](/image/sex23.webp)
:::

## Hair as a Language You're Already Speaking

Four women, four hairstyles, four ways of being a person in the world.

What *Sex and the City* understood, and what every good stylist already knows, is that hair isn't decoration. It's communication. Before anyone reads your bio or hears your voice or learns your name, they've already received a signal. The question is whether the signal you're sending matches the one you meant to send.

In real life, most of us are somewhere in the middle. Not fully Samantha, not fully Charlotte, maybe a bit Carrie on a good day, a bit Miranda on a deadline. But we're all doing the same thing: constantly editing our hair to match who we're becoming. Sometimes the cut leads the change. Sometimes it just confirms what was already happening.

There's a reason finding a stylist who actually *gets you* feels so rare and so good. Because a great haircut isn't just technique. It's someone seeing you clearly enough to make you look like yourself, maybe even a version of yourself you hadn't quite met yet.

What's your current hair doing for you? And has there been a cut, or a moment of not cutting, that felt like a turning point?`,
		metaTitle: "What Your Hair Is Already Saying About You, From Nicole Kidman to Sex and the City",
		metaDescription: "Carrie's curls, Miranda's sharp bob, Charlotte's perfect blowout, Samantha's engineered glamour: how the four women of Sex and the City turned hairstyles into character studies, and what that means for the rest of us."
	},
	{
		id: 32,
		slug: "novogro-vs-minoxidil",
		tag: "Hair Thinning",
		title: "Minoxidil vs. Proprietary Molecules: Is NOVOGRO™ the Industry's Best Kept Secret?",
		excerpt: "For years, minoxidil has been the established benchmark in hair-loss topicals. One name landed in our stylist circle this week: NOVOGRO™ (NV), a fresh class of ingredients designed to tackle multiple drivers of hair thinning at once.",
		author: "Lauren Chavez",
		date: "Jun 13, 2026",
		readTime: "10 min",
		image: "/image/mino-cover.avif",
		category: "Hair Thinning",
		section: "Hair Care",
		body: `Hair serums are everywhere. From pharmacy shelves to premium cosmetic lines, the number of hair and scalp serums have expanded rapidly as consumers look for convenient, topical solutions to thinning hair. As stylists, we have a responsibility to our clients to provide them with solutions that actually live up to their promises. For decades, minoxidil serums have been the go-to active: widely recognized, FDA-approved, with deep roots in many medical spas and salons.

But the category is changing quickly. New products keep appearing, and most do not deserve a second look. Recently, though, one name started moving through our stylist network: [NOVOGRO™ (NV)](https://www.biorxiv.org/content/10.64898/2026.06.09.728282v1). It came through a research paper being shared in professional circles, and the science goes deep. The short version: NOVOGRO™ is a proprietary class of molecules designed around follicle biology, and it is the technology behind [RE:YOU](https://getreyou.com/), an emerging brand taking a more biology-first approach to female hair thinning.

## Minoxidil: The Benchmark That Defined the Category

It may be a surprise to you, but Minoxidil wasn't originally designed for hair at all. It began as a treatment for ==hypertension==, before its hair growth effects were accidentally discovered and it was repurposed into one of the most widely used topical solutions today.

It works, but for some clients, it comes with real trade-offs. Our clients often report itching, irritation, and devastatingly, initial shedding.

:::quote-carousel
The growth was not the only thing I noticed. I also had to deal with itching and irritation, which made the routine feel like part-time maintenance work.
— Salon client, 32, using topical minoxidil for 6 months
---
I'm also not a great responder to the medication so far. I basically stagnated for about a year even though my shedding definitely ramped up.
— Hair-loss client, 29, using minoxidil for 1.5 years
---
Get ready for the under eyes that look like you haven't slept in a week.
— New York salon client, 34, using oral minoxidil for 8 months
---
Minoxidil is lethally toxic to cats and dogs. I had one of my cats die suddenly of acute liver failure and couldn't figure out what happened until months later. Be VERY careful with storage and handling in pet households!
— Pet owner and hair-loss client, 34, using oral minoxidil for 9 months
:::

And sometimes, the trade-off can become part of the hairstyle.

:::case-study-separator:::

After four years, one of my clients decided to stop using minoxidil. In January 2021, she started using topical 5% liquid minoxidil and in June 2023, she reduced the minoxidil strength to 2% because of side effects.

:::split-table
left-heading: What improved
- Hair count increased
- Some strands became thicker in diameter

right-heading: What became difficult
- Unwanted facial hair growth and facial swelling (improved after switching from 5% to 2%)
- Texture change in applied area; the hair became much curlier, hairline changed into tighter ringlets
- Constant frizz; some hairs only grew a few inches before shedding, while others grew longer. Made styling difficult.
- Had to shampoo every morning (liquid formula was greasy). Made the curls even puffier.
:::

> The curliness is the last straw and why I'm pulling the plug. It became curly slowly over the years and I only recently realized what was happening ... It's ridiculous looking and absolutely impossible to style. I literally haven't had a good hair day in years.
> — Female hair-loss client, diagnosed with pattern hair loss, using topical minoxidil for 4 years


Clients do not just ask what grows hair. They ask what will actually make their hair easier to live with.

Minoxidil results typically depend on consistent, long-term use, often across six months or more. Even then, outcomes vary. A lot.

A key limitation lies in its design. Minoxidil primarily operates through a single biological pathway (or so scientists think), which can leave other causes of hair thinning unaddressed.


## NOVOGRO™: A Multi-Pathway Approach to Hair Support

NOVOGRO™ represents a shift in how hair serums are developed and positioned. Rather than relying on a single mechanism, it is built around a multi-target strategy to address several root causes of hair thinning at once.

Our team was able to get in touch with the researchers behind NOVOGRO™ to better understand how they went about their discovery. What stood out to us was not just that they found new ingredients, it was how intentionally they searched for them.

1. First, they used AI-enabled screening to search through a massive ingredient universe and hone in on molecules that can actually support the hair follicle.
2. Second, they tested candidates in models that behave more like real hair follicles.
3. Third, they evaluated safety, specificity, and performance before treating the ingredients as serious candidates.

At a functional level, NOVOGRO™ works across three follicle-relevant pathways:

:::cascade-list
- Supports oxygen-response, metabolic signaling, VEGF-related activity, and the local environment around the follicle. This partly associates with minoxidil’s blood-flow logic, but goes broader.
- Helps reduce DHT production, the major driver of hair follicle miniaturization. 
- Works with the other pathways to support the health and vitality of hair follicle cells responsible for growing new hair, especially the cellular environment that helps determine whether hair grows stronger, weaker, or not at all.
:::

No client needs to remind us how complex hair thinning can be, and how it can vary so significantly between one client and another. Across dozens of experts we spoke to, they agreed that this is the most comprehensive approach they've ever seen across dozens of other brands (e.g., Vegamour, KilgourMD, Nutrafol, etc.). This approach is one that actually aligns the most closely with the complex biology of hair growth, according to our medical experts.

> I am never looking at just one thing when a client sits in my chair with thinning hair. I am looking at density, scalp condition, breakage, miniaturization, styling habits, stress, and how the hair is behaving week to week. A multi-pathway approach makes sense because thinning rarely shows up as a single-pathway problem.
> — Amy Wisney, Senior salon educator and trichology-trained stylist

## What Sets NOVOGRO™ Apart

The distinction between Minoxidil and NOVOGRO™ reflects a broader shift in the category.

| Category | Minoxidil | NOVOGRO™ |
|---|---|---|
| Where it came from | A repurposed medical active originally developed as a blood pressure medication | A newer ingredient system discovered and optimized around real hair follicle biology |
| Main approach | A focused hair-growth active with a long history of use | A multi-pathway system designed to support several causes of thinning at once |
| What it supports | Hair regrowth for some users with consistent long-term use | Follicle-cell vitality, DHT-related miniaturization support, and oxygen/nutrient-related follicle signaling |
| Client experience | Can be effective, but some clients struggle with irritation, shedding, greasiness, unwanted hair growth, or styling disruption | Designed as a lightweight, water-based serum system that may fit more easily into a daily routine |
| Testing behind it | Decades of use and strong category recognition | Early research using primary follicle cells, 3D mini-follicle models, and side-by-side serum comparisons; [a double-blind study with 150+ participants comparing NOVOGRO™ against minoxidil is also ongoing](https://getreyou.com/). |
| Stylist read | Still the category benchmark | One of the more interesting new approaches because it treats thinning like a multi-cause problem |

But a product story only matters if the results show up. In early lab testing, NOVOGRO™ (NV) showed stronger HIF-1α activation than the minoxidil-based formula. HIF-1α helps regulate important pathways in the follicle environment tied to oxygen demand, nutrient support, and repair. Some of these follicle-support pathways are associated with minoxidil, while NOVOGRO™’s signal here points to a broader follicle-support pathway.

:::bar-chart
title: HIF-1α activation % change vs. untreated control
- NV: 52
- Minoxidil: 7
footnote: NV showed about ~~7.9x~~ higher HIF-1α activation than the minoxidil-based formula.
:::

But NOVOGRO™ is designed to go further. It also supports dermal papilla cells, which help drive hair growth, and targets 5α-reductase, the DHT-related enzyme involved in follicle miniaturization.

The researchers behind NOVOGRO™ also built 3D mini hair follicles in the lab to see whether a treatment is actually encouraging follicle activity. These are not the same as real hair growing from a scalp, but they are one of the more realistic lab tools for studying early follicle behavior because the cells can interact and form follicle-like structures instead of sitting flat in a dish.

In the comparison, they tested three groups: vehicle, meaning the base formula without the active growth ingredients; a minoxidil-based formula; and NOVOGRO™. The minoxidil-treated mini follicle showed outgrowth close to the vehicle group, while the NOVOGRO™-treated mini follicle showed the clearest elongation: ~~40.9%~~ more follicle-like outgrowth than the 2% minoxidil formula, suggesting a more active response.

![Preclinical hair follicloid imaging gives a visual snapshot of early growth activity, with the NOVOGRO™-treated mini follicle extending farther in the lab model (D4=Day 4, D6=Day 6; D10=Day 10).|full](/image/mino-follicle.png)

For clients, the data takeaway is simple: this early data suggests NOVOGRO™ may help support stronger follicle-like growth activity than a traditional minoxidil-based formula. It does not prove real-world results yet, but it gives us a reason to pay attention.

Of course, what matters most is what happens on actual scalps. NOVOGRO™ is currently being evaluated in == a double-blind, head-to-head study against minoxidil with 150+ participants==, and that is the data I am waiting for. As soon as we know more, I will share it.

## Tying it Together

Minoxidil helped define the modern hair serum category and will remain the gold standard. But hair science has moved forward, and the industry is overdue for ingredients developed specifically around the complexity of thinning hair.

NOVOGRO™ is early, but it has already started moving through the hair professionals we pay attention to based on its strong scientific data. Is it the industry’s best kept secret? Too soon to call, but it is one of the few new names we are actually watching. We are waiting to see how RE:YOU brings the technology into a real serum, and we will share updates as more product details and clinical data become available.

The new generation of hair serums will feature ingredients developed specifically for hair thinning. They won't be designed around a single pathway, but multiple pathways to tackle hair thinning in a comprehensive, systematic way.

:::references
- Rossi A, Cantisani C, Melis L, Iorio A, Scali E, Calvieri S. Minoxidil use in dermatology, side effects and recent patents. Recent Pat Inflamm Allergy Drug Discov. 2012;6(2):130-136.
- DailyMed. Minoxidil Topical Aerosol 5% Foam, for women: Drug facts and consumer information. U.S. National Library of Medicine. 
- DailyMed. Minoxidil Topical Solution 2%: Drug facts and consumer information. U.S. National Library of Medicine. 
- Qu Z, Li Y, Cho SE, Doğan L, Yao Q, Tang L, Zhao G, Li A, Omori S, Wong F, Zhao EM, Zhang DKY. AI-enabled discovery of small molecules targeting complementary pathways for hair follicle rejuvenation. bioRxiv preprint. 2026. doi: https://doi.org/10.64898/2026.06.09.728282.
:::`,
		metaTitle: "Minoxidil vs. NOVOGRO™: Is This the Industry's Best Kept Secret?",
		metaDescription: "For years, minoxidil has defined the hair-loss topical category. A new ingredient system called NOVOGRO™ is making the rounds in salon networks — here's what the science says."
	},
	{
		id: 34,
		slug: "wet-look-hair-chic-not-greasy",
		tag: "Cut & Style",
		title: "Wet-Look Hair Can Be Chic. It Just Can't Look Greasy.",
		excerpt: "A stylist's guide to the difference between editorial shine and oily hair, and how to place product so the finish looks polished, not unwashed.",
		author: "Ji-Woo Park",
		date: "Jun 15, 2026",
		readTime: "9 min",
		image: "/image/wet-hair.jpg",
		category: "Cut & Style",
		section: "Trends",
		body: `Wet-look hair has lived on runways and magazine covers for years.

In editorials, it almost always works. The lighting is controlled. The makeup is intentional. The clothes are styled around it. The whole look says fashion.

In real life, the same finish can go wrong very fast.

Once wet-look hair leaves the runway, clients may read it differently. Instead of cool, it can look oily. Instead of effortless, it can look flat. Instead of styled, it can look like the client skipped wash day.

That does not mean the wet look is off-limits. It just needs control.

For salon clients, the goal should be soft shine, clean separation, and a slightly damp-looking finish. The hair should look polished, fresh, and intentional, never greasy.

## Why Wet-Look Hair Goes Wrong

Most wet-look mistakes come down to product placement.

Too much product at the root can make the hair look oily. Too much shine through the entire head can make the style feel heavy. On fine hair, the finish can collapse the shape and make the scalp more visible.

For stylists, the conversation should start with this:

Wet-look styling is about placing shine where it helps the haircut. It should not coat the whole head by default.

| What Goes Wrong | What Clients See |
|---|---|
| Too much product at the root | Oily or dirty-looking hair |
| Hair is slicked too flat | Less volume, more visible scalp |
| Long hair has too much wet surface area | Heavy, weighed-down finish |
| Wet bangs separate into strips | Stringy, greasy-looking fringe |
| Skin is also very dewy | Overall look becomes too shiny |
| Fine hair loses lift | Hair looks thinner than it is |

The best wet finish still has air, movement, and shape.

:::image-row
![](/image/wet-look-1.webp)
![](/image/wet-look-2.webp)
![](/image/wet-look-3.jpg)
:::

## Rule 1: Keep the Wet Area Smaller

Wet-look hair usually works better when the shiny area is controlled.

That is why short hair, bobs, lobs, and collarbone-length cuts tend to handle this trend better than very long hair. Shorter shapes already have movement and lightness. A little shine can make them look sharper.

On very long hair, a full wet finish can make the style feel dense, heavy, and harder to wear.

**Stylist note:**
For long-haired clients, keep the wet texture on the ends, face frame, or selected surface pieces. Avoid coating the full head from root to tip.

:::image-row
![](/image/wet1.webp)
![](/image/wet2.webp)
![Megan Fox's wet-hair look might be a bit too much for the average person.](/image/wet3.webp)
:::

## Rule 2: Go Slightly Wet, Not Soaked

The soaked red-carpet version belongs on editorials, campaigns, and stage looks.

For clients, a micro-wet finish is much easier to wear.

A little shine can smooth frizz, define layers, and make the haircut look more styled. Too much shine makes the hair look heavy and unwashed.

**What to tell clients:**
"You want a few glossy, polished pieces. You do not need the whole head to look wet."

This small language shift helps clients understand the difference between fashion shine and greasy hair.

:::image-row
![](/image/wet4.png)
![](/image/wet5.png)
![](/image/wet6.png)
:::

## Rule 3: Be Careful With Bangs

Wet bangs are one of the easiest places to lose control.

Once the fringe separates into thin strips, the whole look can turn oily. This is especially risky on fine hair, sparse bangs, oily skin, or clients with a cowlick at the front hairline.

If the client wants a wet finish but has bangs, use one of these safer options:

| Safer Option | Best For |
|---|---|
| Keep the bangs mostly dry and add shine only to the ends | Airy bangs, soft fringe, fine hair |
| Sweep the bangs back completely | Slick bobs, short cuts, stronger styling looks |
| Add product only to side pieces | Face-framing layers, curtain bangs |

**Stylist note:**
When in doubt, leave the fringe softer and cleaner. A dry fringe with a polished bob often looks more expensive than wet bangs that separate.

:::image-row
![](/image/wet7.webp)
![](/image/wet8.webp)
![Mitsuki Kimura's wet hair with bangs looks less sleek and polished.](/image/wet9.webp)
:::

## Rule 4: Balance the Makeup

Wet-look hair already reflects light.

If the skin is also very glossy, highlighted, or dewy, the whole look can become too shiny under real lighting. Even a beautiful client can look greasy if the hair, forehead, cheeks, and lips are all competing for shine.

**Best pairing:**
Wet-look hair with satin skin or soft matte skin.

**Risky pairing:**
Wet-look hair with heavy highlighter, glossy forehead, and shiny cheeks.

**What to tell clients:**
"If the hair has shine, keep the skin cleaner."

This is especially important for event styling, bridal trials, photo shoots, and red-carpet-inspired looks.

## Rule 5: Fine Hair Needs Lift at the Root

Wet-look styling naturally makes hair sit closer to the head.

For clients with fine hair, low density, or a wider part, product at the root can make the hair look thinner. The scalp becomes more visible, and the cut loses its shape.

These clients can still wear the trend, but the wet finish needs to stay away from the root area.

**Best placement for fine hair:**
Mid-lengths, ends, face frame, and selected outer pieces.

**Avoid:**
Root-heavy product, slick center parts, and wet fringe.

A lifted crown, airy front section, or soft side part can completely change the result.

:::image-row
![](/image/wet13.webp)
![](/image/wet14.webp)
![For fine, soft hair like Victoria Song’s, the wet-hair look can make the hair appear much thinner, so it’s important to keep volume at the roots.](/image/wet15.webp)
:::

## What Stylists Should Tell Clients

Wet-look hair can be chic in real life, but the salon version needs to be much softer than the runway version.

The most wearable finish has:

| Detail | Why It Matters |
|---|---|
| Clean roots | Keeps the hair from looking oily |
| Light shine | Adds polish without heaviness |
| Lift at the crown | Protects volume |
| Defined ends | Makes the cut look intentional |
| Controlled frizz | Keeps the finish clean |
| Minimal product on bangs | Prevents stringy separation |

The line is thin. A little shine can make a haircut look modern and expensive. Too much product can make the same hair look unwashed.

## Stylist Takeaway

Wet-look hair works best when shine is used as a detail.

Keep the roots clean. Protect the volume. Use less product than you think. Place the gloss only where it improves the haircut.

For everyday clients, the best version is simple:

Wet enough to look styled. Clean enough to look fresh.`,
		metaTitle: "Wet-Look Hair Can Be Chic. It Just Can't Look Greasy. | Stylist Guide",
		metaDescription: "A stylist's guide to the difference between editorial shine and oily hair — product placement, bang management, fine hair tips, and what to tell clients."
	},
	{
		id: 35,
		slug: "finasteride-vs-novogro-women-hair-loss",
		tag: "Hair Thinning",
		title: `Finasteride vs. NOVOGRO™: Why I'm Tired of Watching Women Borrow Men's Hair-Loss Drugs`,
		excerpt: `Finasteride is still a serious medical option, but its side-effect profile and off-label use in women deserve a more careful conversation. A stylist's case for why female thinning needs its own solution like NOVOGRO™, not another "just try this."`,
		author: "Lauren Chavez",
		date: "Jun 22, 2026",
		readTime: "12 min",
		image: "/image/finasteride-novogro-cover.jpg",
		category: "Hair Thinning",
		section: "Hair Care",
		body: `I have been a stylist long enough to know when a client is pretending to be fine.

A longtime customer of mine came in a few months ago, sat in my chair, and before I even touched her hair, I knew something was off. She had always been bright and talkative. That day, she was quiet. Eventually, she told me she had started taking finasteride for hair loss. Her shedding might have been improving, she said, but then came the part I hear too often: "I don't feel like myself anymore."

She described depression, headaches, and a drop in libido. She was not being dramatic. She was scared, and honestly, I was angry for her. Because she was not the problem. The product category was.

As stylists, we see the emotional side of hair thinning long before most people talk about it openly. So when a product adds more stress to an already sensitive situation, I have very little patience for it. 

Women do not need more guilt, more guessing, or more side effects brushed off as the cost of caring about their hair. They need options that were actually designed with them in mind.

## Finasteride Was Not Built for Women

Finasteride works by turning down a hormone signal called ==DHT==.

Here is the simplest way I explain it to clients: there is an enzyme in the body that acts like a little conversion station. It helps turn testosterone into DHT. In people whose follicles are sensitive to DHT, that signal can tell the follicle to slowly shrink, produce finer strands, and spend less time in the active growth phase. Finasteride blocks that conversion station, so less DHT gets made.

But we need to know that finasteride has a serious medical history. This is not some cute little scalp booster you casually add between shampoo and conditioner.

The 5 mg version, Proscar, was approved in the U.S. in 1992 for benign prostatic hyperplasia, the medical term for an enlarged prostate. The 1 mg version, Propecia, was approved later for male pattern hair loss.

![Finasteride 1 mg film-coated tablet box printed with "For use by men only."|full](/image/finasteride-box-men-only.png)

The FDA label is very clear: Propecia is indicated for male pattern hair loss in men only, and it is not indicated for use in women.

Still, some women take finasteride off-label, often because the emotional burden of hair loss is real. I understand why. When a woman starts seeing her part widen, her ponytail shrink, or her scalp show under bright light, it can feel like losing control over her identity.

> "Hair is never 'just hair' to the person losing it."
> — Salon client, 52, using off-label finasteride for 2 months

So when someone offers an off-label prescription that might help, many women are willing to try. Not because they are careless, but because fear becomes very easy to market when the product aisle is thin, confusing, and full of treatments that were never built around women's real experience.

We hear the same questions all the time when finasteride comes up:

:::quote-carousel
Can I use the topical and the oral together?
---
What if I just try a low dose?
---
What if the side effects don't happen to me?
---
What if this is the only thing that works?
:::

But willingness does not erase risk. And a disclaimer like "use with proper counseling and medical supervision" does not magically make a medication casual or safe for everyone.

![Propecia (finasteride) 1 mg label showing the warning that women who are or may become pregnant should not handle crushed or broken tablets.|full](/image/propecia-pregnancy-warning.png)

The FDA label warns that women who are pregnant or may become pregnant should not handle crushed or broken tablets because of the potential risk to a male fetus.

Finasteride is contraindicated in pregnancy because it can interfere with male fetal development. That is not a small footnote. That is a major biological warning.

And then there are the side effects, especially in women, where the data is thinner and the conversation is often way too casual. In published studies and reviews on women using finasteride, reported side effects have included headache, menstrual irregularities, dizziness, increased body hair growth, dry skin, mild acne, breast swelling or tenderness, gastrointestinal discomfort, and decreased libido. More recently, regulators from different regions added ==depression and suicidal ideation== as side effects of finasteride tablets, although the frequency is unknown.

So yes, finasteride may help some people. But let's not pretend it belongs in the same conversation as a leave-in conditioner or a "just try this" serum. And it should not be treated like another product women are expected to tolerate just because the industry has not given them enough better options.

## NOVOGRO™ Feels Like a Different Direction

Recently, [NOVOGRO™](https://www.biorxiv.org/content/10.64898/2026.06.09.728282v1) has been coming up in stylist circles. It is not one ingredient but a set of active molecules, each targeting a different part of the hair-growth environment, and it is the technology behind [RE:YOU](https://getreyou.com/), an emerging brand taking a biology-first approach to female hair thinning. In the finasteride conversation, the molecule that matters is NV-1065.

NV-1065 is NOVOGRO™'s answer to DHT. Like finasteride, its job is to lower DHT, the hormone signal that pushes follicles to shrink. To see how well it actually does that, the NOVOGRO™ team tested it head-to-head against dutasteride, the stronger, more aggressive cousin of finasteride.

They compared the two across a full range of doses. NV-1065 kept pace with dutasteride almost the whole way up the curve, and at the highest doses it matched and even edged ahead. On the enzyme that builds DHT, ==NV-1065 is as effective as dutasteride==.

:::line-chart
title: NV-1065 vs. dutasteride: DHT-Building Enzyme Blocked by dose
x-label: Concentration (µM)
y-label: % DHT-Building Enzyme Blocked
series: NV-1065
series: Dutasteride
- 9.375: 41.7, 50.2
- 18.75: 41.0, 58.3
- 37.5: 56.6, 73.0
- 75: 64.6, 77.3
- 150: 79.3, 77.8
- 300: 96.6, 88.4
:::

Which is exactly where the next comparison comes in. Once you line the finished NOVOGRO™ serum up against the cosmetic serums clients actually buy off the shelf, the gap is hard to unsee. The serum sits with the dutasteride; the others sit near baseline.

:::bar-chart
title: DHT-building enzyme blocked vs. control (%)
- NOVOGRO™ serum: 47
- Dutasteride: 51
- Minoxidil: 3
- KilgourMD: 1
- Vegamour: 0
- Nutrafol: 2
- Ordinary: 3
- Kerastase: 4
:::

The second reason matters even more: NV-1065 is non-steroidal. The researchers tested this using steroid-sensitive cells, a model designed to flag steroid-like activity. Testosterone, DHT, and dutasteride showed strong steroidal responses, while NV-1065 did not trigger the same steroidal signal.

:::bar-chart
title: Steroidal activity signal, average (%)
- NV-1065: 4
- Dutasteride: 18
- Testosterone: 35
footnote: Average of three replicates. Lower means a cleaner, less steroidal signal: NV-1065 ~~3.6%~~ barely registers next to dutasteride ~~18.0%~~ and testosterone ~~35.2%~~.
:::

That is important because the goal is to reduce DHT-related follicle stress without unnecessarily disturbing other hormone-linked biological pathways. 

The team also tested NV-1065 in a tiny lab-grown follicle model made from human skin and follicle cells. When testosterone or DHT was added, the mini follicle's growth slowed, almost like it was receiving a shrink signal. When NV-1065 was added, that growth recovered. In the [research data](https://www.biorxiv.org/content/10.64898/2026.06.09.728282v1) shared, NV-1065 performed ==34.3% better== than dutasteride at helping the mini follicle push back against DHT-related stress.

![Preclinical hair follicloid imaging at Day 4, Day 6, and Day 10 across vehicle, testosterone, DHT, and NV-1065, with a length-ratio plot showing NV-1065 outperforming the comparators.|full](/image/nv1065-follicloid.png)

Human data is still needed, but this is a cleaner and more targeted direction than the older hormonal drug approach.

## More Than DHT: Treating the Whole Follicle

NOVOGRO™ does not stop at DHT. Based on what the team presented, it treats the follicle more like a full growing system. For healthy hair to appear on the scalp, three things need to work together: the follicle has to resist shrinkage signals, the cells that coordinate growth need to stay active, and the surrounding root environment needs to support that growth.

| Follicle problem | Stylist translation | NOVOGRO™ angle |
|---|---|---|
| DHT pressure | The follicle is being pushed toward miniaturization | NV-1065 |
| Weak dermal papilla cells | The cells that coordinate growth are losing strength | NV-623 + NV-624 |
| Poor root environment | The surrounding support system is not strong enough | NV-273 |

We have already covered how NV-623, NV-624, and NV-273 may help in different contexts in our [NOVOGRO™ vs. minoxidil breakdown](/article/novogro-vs-minoxidil/), so we will avoid repeating that discussion here. The key point is that this class of molecules appears to create a better overall growth system, which is exciting in itself.

> "The goal is not just to chase new growth today. The goal is to create better conditions for hair to keep growing well tomorrow."
> — Mara Ellis, Scalp-Care Educator & Master Stylist

## The Texture Matters Too

Here is something scientists sometimes overlook but stylists never do: if a product feels terrible, people stop using it.

A greasy serum can ruin a blowout. A sticky formula can make fine hair look even thinner. A heavy oil can force extra wash days, irritate the scalp, or make someone quit by week two.

![A comb dragging through wet, oily-looking dark hair, the strands clumped and flattened at the root.|full](/image/oily-serum-thin-hair.png)

An oily formulation might make hair look thinner. When the roots collapse, the scalp shows more. That is the opposite of what a nervous client wants to see in the mirror. That is another reason NOVOGRO™ stood out.

In the research, the lead molecules were formulated into a ==water-based formula==, and after 150 days under normal storage conditions, more than 90% of each compound remained. I still want to see the final consumer product format, but a lightweight, stable formula suitable for daily use is the difference between a product someone actually uses and one that sits in the cabinet.

## My Stylist's Take

Finasteride can be a serious medical option, but for women, it comes with a lot of baggage. NOVOGRO™ represents a different kind of DHT strategy, led by its NV-1065 molecule: non-steroidal, enzyme-targeted, and tested in hair-relevant lab models. And because NOVOGRO™ is built as a multi-molecule system rather than a single drug, it works on the broader follicle environment at the same time. It still needs human clinical proof, but as hair professionals, this is the kind of science we want to see more of.

:::references
- Review on finasteride and androgen-pathway therapy in female hair loss. PubMed Central (PMC5803857), U.S. National Library of Medicine. https://pmc.ncbi.nlm.nih.gov/articles/PMC5803857/
- Review on finasteride use and reported adverse effects in women. PubMed Central (PMC10172713), U.S. National Library of Medicine. https://pmc.ncbi.nlm.nih.gov/articles/PMC10172713/
- Qu Z, Li Y, Cho SE, Doğan L, Yao Q, Tang L, Zhao G, Li A, Omori S, Wong F, Zhao EM, Zhang DKY. AI-enabled discovery of small molecules targeting complementary pathways for hair follicle rejuvenation. bioRxiv preprint. 2026. doi: https://doi.org/10.64898/2026.06.09.728282.
:::`,
		metaTitle: `Finasteride vs. NOVOGRO™: Why Women Shouldn't Borrow Men's Hair-Loss Drugs`,
		metaDescription: `A stylist on why finasteride was built for men, the side effects women face off-label, and how NOVOGRO™'s non-steroidal NV-1065 offers a cleaner DHT strategy.`
	},
	{
		id: 36,
		slug: "french-bob-every-face-shape",
		tag: "Cut & Style",
		title: `Short Without the Hard Edges: The French Bob I Reach For`,
		excerpt: `Soft, lived-in layers, length that lands right at the jaw, and zero attitude. Here's how I cut and consult the French bob that flatters round, square, and diamond faces alike, and why it keeps walking out of my chair looking expensive.`,
		author: "Nora Bell",
		date: "Jun 18, 2026",
		readTime: "7 min",
		image: "/image/bob-cover.jpg",
		category: "Cut & Style",
		section: "Trends",
		body: `Every stylist knows this consult. A client sits down, says she wants to go short, and then immediately walks it back: "But I don't want to look harsh. Or older. Or like I'm trying too hard." What she's really telling you is that the last short cut she had was too sharp, too blunt, too much edge and not enough softness.

That's the gap this cut fills. The soft-layered French bob, the one half the European editorial feeds have been running for two seasons now, splits the difference perfectly. It reads clean and intentional, but it moves. And here's the part I love behind the chair: it doesn't fight the face shape. Round, square, diamond, it doesn't matter. The shape wraps the face instead of exposing it, so even a bare-faced client heading to the office walks out looking pulled together and quietly expensive. It's the kind of cut that doesn't date.

![The soft-layered French bob: jaw-length, lived-in, and built to wrap the face|full](/image/bob1.jpg)

## Why I Keep Recommending It

Three things make this cut earn its keep.

1. **It does the face-flattering work for the client.** I build curved, face-framing layers down the sides and keep the perimeter sitting somewhere between the cheekbone and the jaw. That curve softly drapes over a high cheekbone or a wider jaw and creates that natural hair-hugging-the-face effect, which visually narrows the width of the face. You're not relying on the client to style around her features—the cut handles it.
2. **It's genuinely low-maintenance, which clients only believe after they try it.** No perm required. A round brush with a slight inward turn at the finish is all the shape needs. Fine, flat hair gets its lift from those side layers propping up the crown instead of collapsing. Coarse, thick hair gets softened with careful thinning so it doesn't blow out wide. Either way, it's a five-minute styling job, and a client who can actually replicate the look at home is a client who rebooks.
3. **It flexes across them whole life.** This is where color and parting come in. A blue-black or cool brown keeps it office-appropriate and quietly flatters warmer skin tones. A lighter chestnut brown gives it that softer, daytime-date energy. A center part reads cool and a little intellectual; a side part softens everything and takes years off. I've put this cut on clients from their twenties to their mid-forties and it lands every time.

## Four Versions, Depending on Who's in the Chair

I don't cut this one identical on everybody. There are really four variations, and matching the right one to the client is most of the job.

:::card-grid
title: Clean Center-Part
tag: Sharpest · most office-forward
The minimalist take, no extra face-framing pieces, just a precise line. Save it for clients with strong, balanced features and a good amount of height at the crown.
---
title: Curtain Bang
tag: Most forgiving · youthful
My go-to for anyone nervous about going short. Those soft, parted-down-the-middle fringe pieces quietly fill in hollow temples and shave width off a rounder face, exactly what I reach for with a first-time short-hair client.
---
title: Side-Part Layered
tag: Best for fine, flat hair
Built to add lift. The extra texture and the deeper part create movement, which fixes that pressed-to-the-scalp, flat-on-top problem fine hair tends to have.
---
title: Soft Inward-Curl
tag: Effortless · no-makeup friendly
Lets the ends collect a little weight and bend gently toward the face. It gives you that rounded, lived-in finish that looks great even on a bare-faced day.
:::

![Curved face-framing layers and a soft fringe doing the shaping work|full](/image/bob2.jpg)

## How I Actually Cut It

If you're cutting this, or coaching a newer stylist through it, here's the part that keeps it from going wrong.

Set the length between the jaw and the middle of the collarbone, and leave weight in the ends. Resist the urge to over-thin. A French bob that's been point-cut into oblivion loses the soft body that makes it work.

Build curved, soft layers around the cheeks and pair them with a light curtain or side fringe. No heavy, blunt, straight-across bangs—that's what tips it from "soft and modern" into "severe."

And don't forget the back. A little stacked weight through the occipital gives you a full, rounded head shape. Skip it and you get that flat, heavy look at the back that ages the whole cut.

![Stacked weight through the back for a full, rounded silhouette|full](/image/bob3.jpg)

## The Takeaway

The thing I want every client, and every stylist, to understand is that the "expensive" look in short hair was never about a harder, more dramatic line. It's about soft layers placed exactly where they need to be. That's the whole trick.

So next time a client says she wants short but soft, you already know the cut. What's your go-to French bob variation chairside, and which face shapes are you matching it to? Drop it in the comments.`,
		metaTitle: `The French Bob That Flatters Every Face Shape: A Stylist's Cutting & Consult Guide`,
		metaDescription: `A salon pro breaks down the soft-layered French bob: why it flatters round, square, and diamond faces, the four variations to match to your client, and how to cut and consult it without it reading severe.`
	},
	{
		id: 37,
		slug: "shedding-vs-breakage-chairside-test",
		tag: "Hair Thinning",
		title: "Shedding vs. Breakage: The 2-Minute Chairside Test Every Stylist Should Know",
		excerpt: "A client says \"I'm losing so much hair.\" Here's how to tell in two minutes whether it's shedding or breakage, and what to recommend for each.",
		author: "Kasia Nowak",
		date: "Jun 24, 2026",
		readTime: "7 min",
		image: "/image/stylist-notices-thinning.jpg",
		category: "Hair Health",
		section: "Hair Care",
		body: `A client sits down, lifts a section at her crown, and says the line every one of us has heard: "I'm losing so much hair. Is something wrong with me?"

Here's the thing most clients don't know, and honestly something a lot of newer stylists get tangled up on too: "losing hair" and "losing length" are two completely different problems. One is happening at the root. The other is happening somewhere along the strand. And if you treat breakage like shedding, or shedding like breakage, you'll send your client home with the wrong routine and watch them get frustrated when nothing changes.

The good news is you can tell the difference at the chair in about two minutes, without any special tools. Here's exactly how I do it.

## First, Get Clear on What You're Actually Looking At

**Shedding** is hair leaving the scalp at the follicle. It's a whole-strand event, root and all. We shed 50 to 100 hairs a day normally, so "I see hair in my brush" is not, by itself, a problem. Shedding becomes worth a conversation when the volume jumps noticeably or stays elevated for weeks.

**Breakage** is the strand snapping somewhere along its length. The follicle is fine and still anchored. The hair is just failing structurally, usually from mechanical stress, heat, chemical services, or a compromised cuticle.

**Why it matters:** Shedding is a follicle/cycle conversation (and sometimes a medical one). Breakage is a hair-integrity conversation you can usually fix in the salon and at home. Same symptom (hair "everywhere"), totally different fix.

![Comparison of shed hair with bulb vs broken hair without bulb|full](/image/shedding-breakage-comparison.jpg)

## The 2-Minute Chairside Test

### 1. Pick up a few of the lost hairs

Ask the client to bring you what's in their brush, or pull a few strands you find on the cape. Look at the ends.

- **A tiny white or translucent bulb on one end** = shed hair. That bulb is the root; the hair completed its cycle and released. This points to shedding.
- **Both ends blunt or frayed, no bulb** = breakage. The strand snapped. This points to mechanical or chemical damage.

### 2. Check the lengths

Shed hairs are usually full-length and fairly uniform. A pile of short, uneven pieces, especially little broken bits around the hairline, part, or crown, is the signature of breakage.

### 3. Do a gentle stretch test on a single strand

Hold one hair between your fingers and stretch slightly. Healthy hair has give and bounces back. Hair that snaps immediately with almost no stretch is telling you the cuticle and cortex are compromised (breakage territory).

### 4. Look at the scalp and the line

Part the hair in a few places. Widening at the part or diffuse thinning across the top leans toward a shedding/density issue. Breakage tends to show up as flyaways, a "halo" of short regrowth-looking pieces, or spots that line up with tension (extensions, tight ponytails) or heat habits.

**Two minutes, no magnification needed.** You'll be right the large majority of the time.

![Stylist performing chairside hair assessment with client](/image/chairside-hair-test.avif)

## What You Tell the Client (For Each Path)

### If it reads like breakage

This is your wheelhouse, and it's reassuring news for them. Walk through the likely culprits (over-processing, hot tools without protection, aggressive brushing, tight styles) and build a repair plan:

- Bond-building treatments
- Lower heat settings
- A wide-tooth comb on wet hair
- Looser styling

They'll often see improvement within a few weeks, which builds enormous trust.

### If it reads like shedding

Set expectations honestly. Some shedding is cyclical and self-resolving (post-stress, postpartum, seasonal). Persistent or heavy shedding, a rapidly widening part, or any patchiness deserves a referral to a dermatologist or trichologist. Say so, kindly and clearly.

For the cosmetic, maintenance side of a shedding phase, a consistent scalp-and-growth routine helps clients feel proactive while the cycle sorts itself out. This is where I'll talk through a daily growth serum like re:you as the "treat" step (not a cure, but a low-effort way to support the scalp environment and stay consistent during the regrowth phase). I frame it exactly that way with clients, because over-promising is how you lose them.

**A quick note on scope:** We are not diagnosing medical hair loss at the chair. Our job is to tell cosmetic from structural, support what's in our lane, and refer out confidently when something looks medical. Clients respect that line. It's part of why they trust us.

## Quick Reference: Shedding vs. Breakage

| | Shedding | Breakage |
|---|---|---|
| **What you see** | Full-length hairs with white/translucent bulb at one end | Short, uneven pieces with blunt or frayed ends (no bulb) |
| **Where it happens** | At the follicle/scalp | Along the hair shaft |
| **Common causes** | Stress, postpartum, hormones, seasonal cycles, medical conditions | Heat damage, chemical over-processing, tight styles, aggressive brushing |
| **What it feels like** | Hair feels normal to the touch but more comes out | Hair feels dry, brittle, snaps easily when stretched |
| **Scalp appearance** | Widening part, diffuse thinning | Halo of short broken pieces, damage concentrated around tension points |
| **Your lane** | Support + refer out when needed | Fix it: bond builders, heat control, gentler handling |
| **Timeline** | May resolve on its own (weeks to months); medical intervention if persistent | Often improves within 2 to 4 weeks with proper care |

## Keep This Where You Can Reach It

Print the four-step test and tape it inside a station drawer for your newer team members. The strand-end check alone (bulb vs. blunt) resolves most of these conversations, and getting it right in front of the client is one of those small moments that turns a worried guest into a loyal one.

## Chairside FAQ

**How much daily shedding is normal?**
Roughly 50 to 100 hairs a day. Volume that's clearly higher than the client's normal, sustained over weeks, is what's worth a closer look.

**Can someone have both at once?**
Absolutely, and it's common. A postpartum client with heat-damaged ends, for example. Address the breakage you can fix and set realistic expectations on the shedding side.

**When should I refer out instead of recommending a routine?**
Patchy or circular loss, a fast-widening part, scalp pain, redness or scaling, or shedding that doesn't settle. When in doubt, refer. It protects your client and your credibility.

**Will a growth serum fix breakage?**
No. Breakage is a strand-integrity issue (that's bond-builders, heat control, and gentler handling). Growth serums belong to the scalp/shedding conversation, not the breakage one.`,
		metaTitle: "Shedding vs. Breakage: The 2-Minute Chairside Test Every Stylist Should Know",
		metaDescription: "A client says \"I'm losing hair.\" Here's how to tell in two minutes whether it's shedding or breakage at the chair, and what to recommend for each path."
	},
	{
		id: 38,
		slug: "head-spa-salon-revenue-opportunity",
		tag: "Business",
		title: "The Head Spa Opportunity: Turning Viral Interest Into Real Salon Revenue",
		excerpt: "Head spas are trending everywhere online. Here's how to turn that client curiosity into a profitable service menu addition, from lite builds to full spa setups.",
		author: "Dana Reeves",
		date: "Jun 24, 2026",
		readTime: "10 min",
		image: "/image/head-spa.jpg",
		category: "Business",
		section: "Hair Care",
		body: `If you have been on social media in the past year, you have seen head spa content. The scalp massage videos, the satisfying extraction shots, the ASMR-style treatment reveals. Millions of views, comment sections full of "where can I get this done," and an entire aesthetic built around relaxation, luxury, and scalp health.

The demand is real. The question is: how do you turn viral curiosity into actual revenue in your chair?

I run a six-figure solo suite, and I added a head spa offering eight months ago. It now accounts for 18% of my service revenue and has a 72% rebook rate. It brings in new clients who have never been to a salon for anything other than a cut, and it turns existing color clients into regulars who come in between appointments just for the treatment.

Here is what I have learned about building a head spa service that actually makes money.

## What a Head Spa Actually Is

A head spa is a scalp-focused treatment built around massage, cleansing, exfoliation, and hydration. The experience matters as much as the technique. Clients are paying for relaxation, care, and visible results (clean scalp, less buildup, healthier-looking hair).

The treatment typically includes:

- **Deep scalp cleansing** to remove buildup, oil, and dead skin
- **Exfoliation or detox** using scrubs, brushes, or steam
- **Scalp massage** for circulation and relaxation (this is the part that goes viral)
- **Treatment masks or serums** tailored to scalp condition
- **Finishing rinse and style**

Total service time ranges from 45 minutes (lite) to 90 minutes (full spa experience). Pricing runs from $75 to $200+ depending on your market and what you include.

![Head spa treatment setup with massage tools](/image/head-spa-setup.avif)

## The Business Case: Why This Works

Head spa services hit three revenue goals at once:

### 1. New client acquisition

These treatments bring in people who would not otherwise book with you. They are not looking for color or a major cut. They saw a video, got curious, and want to try it. Many become long-term clients once they experience your space and your work.

### 2. Increased service frequency

Your color client who comes every 10 weeks? She might add a head spa at week 5. Your cut-and-go client who stretches appointments to 8 weeks? He might book a standalone scalp treatment in between. You are adding visits without cannibalizing your core services.

### 3. Retail attachment

Head spa clients leave wanting to maintain the results. Scalp serums, exfoliating shampoos, massage tools, and treatment masks all become easy retail add-ons. My head spa clients have a 60% retail conversion rate, compared to 35% across my other services.

## Build Options: Lite vs. Full

You do not need to invest thousands upfront. Start small, test demand, and scale as the service proves itself.

### Lite Build ($200 to $500 setup cost)

This is where I started. You are adding the service with minimal equipment investment.

**What you need:**
- Silicone scalp massager or brush ($15 to $30)
- Exfoliating scalp scrub ($20 to $40)
- Treatment mask or serum ($30 to $50)
- Warm towels (you already have these)
- A relaxing playlist and dimmed lighting

**Service structure:**
- 45 to 60 minutes
- Priced at $75 to $100
- Basic scalp massage, cleanse, treatment, style

This setup lets you test client interest without a major financial commitment. If it books consistently for three months, consider upgrading.

### Mid-Tier Build ($800 to $1,500 setup cost)

This adds specialized tools and a more polished experience.

**What you add:**
- Handheld scalp massager with heat or vibration ($80 to $150)
- Steamer for deeper product penetration ($150 to $300)
- Scalp camera or scope for before/after documentation ($100 to $400)
- Upgraded product line with multiple treatment options

**Service structure:**
- 60 to 75 minutes
- Priced at $120 to $150
- Includes scalp analysis, customized treatment, extended massage

The scalp camera is a game-changer for client buy-in. Showing before-and-after close-ups of their scalp makes the results tangible and drives retail and rebooking.

### Full Build ($2,000 to $5,000+ setup cost)

This is the premium experience, closest to what clients see in viral videos.

**What you add:**
- Professional-grade massage chair or shampoo bowl with built-in massage ($1,000 to $3,000)
- High-end steamer with adjustable settings ($300 to $600)
- Complete product suite (multiple scrubs, masks, serums, oils) ($300 to $500)
- Aromatherapy diffuser and curated scent library ($50 to $100)
- Noise-canceling headphones or guided meditation audio

**Service structure:**
- 75 to 90 minutes
- Priced at $150 to $200+
- Full sensory experience with customized treatment protocols

This level works best if you have consistent demand, a client base willing to pay premium prices, or you are positioning your salon as a wellness destination.

## Pricing Strategy That Actually Works

Your pricing should reflect three things: your market, your experience level, and what you include. Get this wrong and you either price yourself out of the market or work hard for margins that don't make sense.

**Start by anchoring to your local market.** Look at what spas, nail salons, and massage studios charge in your area. Head spa pricing tends to land between a luxury manicure and a one-hour massage. If massages in your market run $90 to $120, your signature head spa should sit in that range or just above, because the results are visible and the retail follow-through makes the experience feel like more than a massage.

**Your experience level matters too.** If you are adding head spa to your menu for the first time, start soft. You are learning the service flow, building your confidence, and collecting testimonials. A lower introductory price during the first few months lets you iterate without the pressure of justifying a premium rate before you have earned it.

**Introductory pricing (first 3 months)**

Price 10% to 15% below your target rate while you build demand and gather reviews. A $90 to $95 introductory rate on your signature service can move to $110 to $120 once you have strong word-of-mouth, consistent bookings, and before-and-after content that proves your results. Communicate the price increase in advance ("launching at introductory pricing through July") so clients feel like they caught something, not that they were undercharged.

Do not stay at introductory pricing longer than 3 months. Underpricing long-term trains clients to expect low rates and makes it harder to raise prices without pushback.

**Build a tiered menu**

Offer at least two options. Clients want to choose based on their budget and how much time they have. A single price point leaves money on the table from clients who would happily pay more for a longer experience.

| Service Level | Time | Price Range | What's Included |
|---|---|---|---|
| **Express Scalp Treatment** | 30-45 min | $65-$85 | Scalp cleanse, focused massage, treatment mask, quick blowout |
| **Signature Head Spa** | 60-75 min | $110-$140 | Scalp analysis, exfoliation, extended massage, customized mask, style |
| **Luxury Head Spa Experience** | 90 min | $160-$200 | Full sensory experience with aromatherapy, hot towel compress, premium product protocol, extended massage, style |

Price the top tier at roughly 2x your entry-level option. That gap gives clients a clear sense of value progression and makes the middle tier feel like a smart choice, which is often your highest-volume seller.

**Add-ons are easy upsells** once clients are already booked. Common options include a hot stone scalp massage ($20 to $30), a CBD or nourishing oil upgrade ($15 to $25), or a take-home mini treatment kit ($25 to $40). Introduce one or two add-ons at booking or during the consultation, not mid-service.

**Package pricing and pre-sells**

Pre-sold packages drive rebooking, stabilize your cash flow, and give clients a reason to commit to the scalp health journey rather than treating it as a one-time thing.

A 3-session package priced at 10% off and a 6-session package at 15% off is a simple starting point. The math works in your favor: you collect cash upfront, fill future appointments, and dramatically increase the likelihood of retention. Clients who buy a package almost always see results because they complete the treatment series.

Example package pricing based on a $120 Signature Head Spa:

- 3-session package: $324 (saves $36, 10% off)
- 6-session package: $612 (saves $108, 15% off)

You can also bundle a package with a retail starter kit. Offer the 3-session package plus a home scalp maintenance kit (serum, exfoliating shampoo, massager tool) at a combined price that saves them $20 to $30 off retail. The kit reinforces results between visits and pre-empts the "what should I use at home" conversation.

Limit packages to your top two service tiers. There is no reason to discount your express service, and a package should feel like an investment, not a coupon.

## Retail Tie-In: Where the Real Margin Lives

Head spa services are profitable, but the real money is in retail attachment. Clients leave relaxed, their scalp feels clean and healthy, and they want to keep that feeling going.

### High-conversion retail items:

- **Scalp serums** (daily maintenance, $30 to $60)
- **Exfoliating shampoo** (weekly use, $25 to $45)
- **Scalp massagers** (at-home tool, $15 to $35)
- **Treatment masks** (weekly or bi-weekly, $30 to $50)

Frame it as a home care routine, not a product pitch. I say: "The scalp treatment we did today works best when supported at home. Here is what I would use between visits." My conversion rate on that exact line is over 60%.

### Sample retail menu:

- Scalp serum: $45 (cost: $18, margin: 60%)
- Exfoliating shampoo: $32 (cost: $13, margin: 59%)
- Handheld massager: $22 (cost: $9, margin: 59%)

If 60% of your head spa clients buy one product at an average of $35, and you are doing 15 head spa services per month, that is $315 in retail revenue with roughly $190 in profit. Over 12 months, that is $2,280 in additional profit from retail alone.

## Equipment Breakdown: What to Buy First

Start with the essentials. Add specialized equipment only after you have consistent bookings.

### Phase 1: Essentials (under $300)

1. **Silicone scalp brush** ($15 to $25) – for manual massage and exfoliation
2. **Scalp scrub or detox treatment** ($30 to $50) – removes buildup
3. **Hydrating or soothing scalp mask** ($30 to $50) – treatment step
4. **Scalp oil or serum** ($25 to $40) – finishing product
5. **Warm towel warmer** (if you don't already have one, $80 to $120)

### Phase 2: Mid-Tier Upgrades ($500 to $1,200)

1. **Handheld electric scalp massager** ($80 to $150) – adds vibration or heat
2. **Facial steamer** ($150 to $300) – improves product penetration
3. **Scalp camera** ($100 to $400) – shows before/after, builds trust and retail sales

### Phase 3: Premium Add-Ons ($1,000+)

1. **Massage chair or upgraded shampoo bowl** ($1,000 to $3,000)
2. **Professional-grade steamer** ($300 to $600)
3. **Aromatherapy system** ($50 to $150)

Do not buy everything at once. Test with Phase 1, track your bookings and revenue, then upgrade when demand justifies it.

Essential head spa equipment laid out on salon counter](/image/head-spa-equipment.jpg)

## Marketing: How to Fill Your Books

Head spa services market themselves if you do two things right: post the experience and make booking easy.

### What to post:

- **Before-and-after scalp shots** (scalp camera footage is gold for this)
- **ASMR-style massage clips** (no sound, just visuals and ambient music)
- **Client testimonials** focused on relaxation and results
- **Behind-the-scenes setup** (products, tools, the experience you are creating)

Post these as Reels, TikToks, and Stories. Head spa content performs exceptionally well because it is visually satisfying and taps into the wellness trend.

### Booking tips:

- Add the service to your online booking system immediately
- Offer a "first-time head spa" discount to lower the barrier
- Create a package deal (e.g., "Try it twice, save 15%")
- Cross-promote to existing clients via email or text

One stylist I coach added a single Instagram Reel of her doing a scalp massage. It got 47,000 views and booked her head spa menu solid for six weeks. This content works.

## Common Mistakes to Avoid

### 1. Overbuilding before testing demand

Do not spend $3,000 on equipment before you know clients will book. Start lite, prove demand, then scale.

### 2. Underpricing to compete

If you price too low, clients will not value the service and your margins disappear. Price for the experience and your expertise, not just the time.

### 3. Skipping the consultation

Even a 2-minute scalp check builds trust and lets you customize the treatment. Clients pay more when they feel seen and cared for.

### 4. Not tracking retail conversion

If you are doing head spas but not selling retail, you are leaving 40% of potential revenue on the table. Track what you recommend and what converts.

### 5. Treating it like a side service

If you add head spa to your menu but never talk about it, never post it, and only offer it when someone asks, it will not grow. Promote it like you would any other signature service.

## Real Numbers: What to Expect

Here is what head spa revenue looked like for me in the first year:

| Month | Services Booked | Service Revenue | Retail Revenue | Total Revenue |
|---|---|---|---|---|
| **Month 1-3** | 8/month avg | $880 | $210 | $1,090 |
| **Month 4-6** | 15/month avg | $1,650 | $420 | $2,070 |
| **Month 7-12** | 22/month avg | $2,420 | $630 | $3,050 |

By month 12, my head spa offering was generating over $3,000 per month in combined service and retail revenue, with roughly $2,100 in profit after product and labor costs.

That is an extra $25,000+ per year from a service I did not offer 12 months earlier.

## Is It Right for Your Salon?

Head spa services work best if you have:

- **Clients interested in wellness and self-care** (not just cuts and color)
- **Time in your schedule** to offer 60 to 90-minute services
- **A private or semi-private space** where clients can relax
- **Willingness to promote the service** through social media and in-person
- **A retail mindset** (this service thrives when paired with product sales)

If you are booked solid with color and cutting and have no capacity, head spa might not be the right move yet. But if you have gaps in your schedule, want to attract new clients, or are looking for a service that drives retail, this is one of the strongest opportunities in the industry right now.

## Start Small, Scale Smart

You do not need a complete spa setup to get started. You need a scalp brush, a treatment product, and the willingness to test the market.

Start with the lite build. Book five clients. Track your revenue, your retail conversion, and your rebook rate. If the numbers work, upgrade your tools and raise your prices.

Head spas are not a fad. Clients want them, they pay well, and they rebook at rates most other services cannot match. The only question is whether you are going to be the stylist in your area offering them, or the one watching your competitors fill their books with something you could have added months ago.`,
		metaTitle: "The Head Spa Opportunity: Turning Viral Interest Into Real Salon Revenue",
		metaDescription: "Head spas are trending everywhere. Here's how to turn client curiosity into profitable revenue with lite builds, full spa setups, pricing strategy, and retail tie-ins that actually work."
	},
	{
		id: 39,
		slug: "pp405-vs-novogro",
		tag: "Hair Thinning",
		title: "PP405 vs. NOVOGRO™: Why Salon Pros Are Questioning the Dormant Follicle Hype",
		excerpt: "PP405 is still waiting on fuller proof, while NOVOGRO™ is already showing a more data-backed path toward stronger, visible hair growth. A salon-side look at what each treatment is actually trying to do for the follicle.",
		author: "Dr. Elena Marsh",
		date: "Jun 28, 2026",
		readTime: "8 min",
		image: "/image/hair science.jpg",
		category: "Hair Thinning",
		section: "Hair Care",
		body: `Between color consults, scalp treatments, blowouts, and the usual "is my part getting wider?" conversations, new hair-growth treatments are coming up more than ever.

PP405 is one of the names clients keep asking about. Some have even mentioned trying supplier-sourced molecules they believe act like PP405. The appeal is easy to understand: PP405 is being talked about as a topical that may wake up dormant follicles without directly touching hormones. For clients who are tired of minoxidil or finasteride, or not ready for PRP or transplant conversations, that sounds like a dream.

[NOVOGRO™](https://www.biorxiv.org/content/10.64898/2026.06.09.728282v1) is also part of this next wave, but it approaches thinning hair differently. Built around a science-led, multi-pathway system, NOVOGRO™ looks at hair support from several cellular angles. New growth is only meaningful if the follicle has the right conditions to produce hair that looks thicker and more lasting.

From the chair, we have learned to be careful with anything that promises a big hair comeback too quickly. So in this article, we are looking at both approaches with a clearer lens. We brought the science team into the conversation to compare PP405 and NOVOGRO™ more systematically, by what each one is actually trying to do for the follicle.

## What PP405 Is Trying to Do

PP405 is being developed by [Pelage Pharmaceuticals](https://pelagepharma.com/) as a topical treatment for androgenetic alopecia. The idea is different from the usual hair-loss playbook. It is not positioned as a DHT blocker like finasteride, and it is not just another minoxidil-style growth stimulant.

Instead, PP405 is being talked about as a way to help "wake up" sleeping hair follicles. The thinking is that it may change how follicle cells use energy, which could help inactive follicles become active again.

That is why people are excited. Many people with thinning hair like the idea of potentially restarting hair growth without using hormone-related treatments.

## The Data Sounds Exciting Until You Read It Closely

A lot of people online are repeating the idea that ==31% of trial participants saw more than 20% hair growth in eight weeks==. That sounds incredible. But that is not exactly what the reported language says.

The key result appears to apply to only a subset of participants, men with a higher degree of hair loss, not the entire trial population. The study included men and women, and different levels of hair loss. So when the strongest number is reported only for a subgroup, we have to ask what happened with everyone else.

There is also a second issue: the result is reported as a percentage increase in hair density. Percentages can sound more dramatic than they are, especially when someone starts with very little hair in the measured area.

![If a nearly bald patch goes from 5 hairs to 7 hairs, that is a 40% increase. On paper it looks big. In the mirror, it may mean almost nothing.|full](/image/pp405-density.webp)

There is another issue with hair-density claims: what kind of hairs were counted?

In the salon, we see a lot of baby hairs. Some are promising. Some stay soft, short, and barely visible. These are often called vellus-like hairs. They can show up under close scalp imaging but may not add real coverage. That is why serious hair studies usually separate vellus hairs from non-vellus or terminal hairs.

![Terminal hairs are the thicker, stronger hairs that actually change how full the scalp looks. Vellus hairs are fine, wispy, and often not cosmetically meaningful.|full](/image/pp405-vellus-terminal.webp)

If a study counts both types together, the number can look better than the result feels.

That is one of the biggest unanswered questions with the PP405 density data. We need to know whether the reported density increase came from thicker terminal hairs or mostly fine, early-stage hairs.

Hair-growth marketing can get very creative with counting. Measure a nearly bald spot, and a few new hairs create a large percentage gain. Include wispy vellus hairs, and the count can rise without the client looking fuller. Skip absolute counts, and the percentage can sound bigger than the actual change.

So the real question is not just whether PP405 increased hair density. It is whether it increased the kind of density clients can actually *see*. Right now, the public information does not fully answer that.

## Why the PP405 Mechanism Still Makes Us Cautious

PP405's "follicle wake-up" story sounds exciting, but from the salon side, waking a follicle up is only the first step.

What we really care about is what happens after that. The follicle also needs strong cellular support, good growth signaling, blood-flow support, and a scalp environment that can keep the growth cycle going. If those pieces are weak, early activity may not turn into lasting density.

That is the concern with PP405. It may create early movement, but we still do not know if that turns into real long-term density.

## Why NOVOGRO™ Feels More Practical From the Salon Side

That is why more salon professionals are starting to pay attention to approaches like NOVOGRO™, the technology that powers [RE:YOU](https://getreyou.com/), an emerging brand taking a biology-first approach to thinning hair. From conversations with trusted hair professionals, we understand it is built more like a long-term support system for thinning hair, working across multiple pathways that matter to the follicle. Instead of focusing only on waking the follicle up, NOVOGRO™ looks at whether the follicle has the right conditions to keep producing stronger, thicker hair.

We were also able to review a preclinical data disclosure on NOVOGRO™. To be clear, this is not a direct head-to-head comparison with PP405. But compared with untreated controls and several products already on the market, the early signals are promising.

**It supports the dermal papilla cells.** These are the control center at the base of the follicle that helps tell hair how to grow. When dermal papilla cells slow down, the follicle gets weaker signals and hair can start coming in finer and softer, like baby hairs. NOVOGRO™ supports dermal papilla cell activity directly, with lab testing showing stronger dermal papilla cell growth compared with other leading serums.

![Lab testing showed stronger dermal papilla cell viability with NOVOGRO™ compared with other leading serums.|full](/image/pp405-dermal-papilla.webp)

**It activates the HIF-1α pathway.** Think of this as the follicle's oxygen sensor. When this pathway is active, it helps support VEGF, tiny blood vessels, and the local environment hair needs to keep growing. It creates better conditions around the follicle, so the hair has more support once growth begins.

![The HIF-1α pathway helps support VEGF and the blood-vessel environment the follicle needs to keep growing.|full](/image/pp405-hif1a.webp)

**It addresses DHT-related stress.** DHT is a hormone linked to gradual follicle shrinking in people prone to pattern hair loss. NOVOGRO™ addresses this through NOVOGRO-1065, a non-steroidal molecule shown in preclinical testing to strongly inhibit the conversion to DHT. This helps reduce one of the pressures that can make follicles produce thinner hair over time.

![NOVOGRO-1065, a non-steroidal molecule, strongly inhibited the conversion to DHT in preclinical testing.|full](/image/pp405-dht.webp)

**It is built to survive real life.** A serum only matters if the actives stay active when the client is actually using it. NOVOGRO™'s molecules and formulation strategy are built for real-life use, through washing, styling, coloring, and daily routines, so the formula can hold up beyond the lab and into the salon chair.

What ties all of this together is the way NOVOGRO™ was developed. It uses AI screening to look across multiple follicle needs at once, then advances the strongest candidates into lab testing, including the preclinical data shown above.

## The First Clinical Data Is In

The lab work above is preclinical. NOVOGRO™ has now moved onto real heads of hair: NOVOGRO™-powered serums in a double-blind study against minoxidil, the current gold standard, and the three-month interim readout is the first look at how it actually performs.

:::clinical-trial:::

The full study is still ongoing, and we'll share more as later results come in. But even at this interim mark, that is more human data than PP405 has made public.

## The Salon Verdict

We are not writing off PP405. The science is interesting, and if larger trials show strong, lasting, visible results, salon pros will pay attention.

But right now, PP405 is still a wait-and-see story. NOVOGRO™ is the one more salon people are starting to watch, because it fits what we actually see: hair needs more than activation.

Hair growth is about helping that hair stay, thicken, cycle properly, and become visible enough to change the way the client feels when they look in the mirror.`,
		metaTitle: "PP405 vs. NOVOGRO™: Why Salon Pros Question the Dormant Follicle Hype",
		metaDescription: "PP405 promises to wake up dormant follicles, but the data has gaps. A salon-side breakdown of PP405 vs. NOVOGRO™: what each does for the follicle, and which has more proof."
	},
	{
		id: 40,
		slug: "hair-extensions-what-to-know",
		tag: "Technique",
		title: "What I Wish Clients Knew Before They Sat Down for Extensions",
		excerpt: "Extensions can be the best thing you ever do for your hair, or the most expensive mistake. After years of installing them, here is the honest version no consultation has time for.",
		author: "Bianca Russo",
		date: "Jun 30, 2026",
		readTime: "9 min",
		image: "/image/extensions-cover.webp",
		category: "Technique",
		section: "Hair Care",
		body: `The first thing I tell anyone who sits in my chair asking for extensions is that they are not buying hair. They are buying a second standing appointment, a new routine at home, and a relationship with me for the next year.

If that part scares you a little, good. It should. The clients who end up loving their extensions are almost always the ones who understood the commitment before they ever saw the result. The ones who end up miserable usually wanted the look without the routine that keeps it looking that way. So before you book anything, let me tell you the things I find myself explaining in every single consultation.

## Extensions Are a Commitment, Not a Quick Fix

A lot of people think of extensions the way they think of a manicure. Something pretty you get done before an event and then stop thinking about. That is not what this is. Good extensions need maintenance every six to eight weeks, a specific way of washing and drying, and an honest conversation about your actual lifestyle before a single strand goes in. If you travel constantly, live at the gym, or know in your heart you will not change how you wash your hair, I need to know that on day one, not three weeks in when things start to feel off.

## A Good Stylist Will Sometimes Tell You No

If you ask me for extensions and I start asking about your scalp, your workouts, how often you really blow dry, and what your hair has been through this year, I am not being nosy. I am deciding whether extensions will help you or hurt you. Sometimes the honest answer is not yet. If your hair is still recovering from bleach, or your scalp is irritated, or you genuinely will not keep up with the upkeep, a responsible stylist will tell you to wait. Be a little suspicious of anyone who says yes to absolutely everything. That person is selling, not consulting.

## They Do Not Damage Your Hair. Bad Installs and Bad Aftercare Do.

This is the myth I spend the most time correcting. Extensions on their own do not wreck your hair. What wrecks your hair is too much weight on fine strands, a method that pulls, leaving them in far too long, or skipping the home care entirely. Placed properly by someone who matched the method to your hair and distributed the weight correctly, your own hair sits happily underneath and grows just fine. The horror stories almost always trace back to a cheap install, a heavy hand, or a client who never came back for her maintenance appointment and let the tension build for six months.

## The Methods Are Not Interchangeable

Tape-ins, hand-tied wefts, K-tips, clip-ins. These are not the same product in different packaging, and the right one depends entirely on your hair. Fine hair and heavy beaded wefts are usually a bad marriage. Thick, coarse hair will barely notice a few tape-ins. A real consultation is mostly me working out which method your specific hair can carry without strain, then being straight with you about how each one looks, lasts, and feels when you sleep on it. If a salon only offers one method, understand that you are getting whatever they happen to know how to do, which is not always what is best for you.

![Tape-ins, hand-tied wefts, K-tips, and clip-ins are not the same product in different packaging. The right method depends entirely on your hair.|full](/image/extensions-methods.webp)

## The Match Matters More Than the Length

Length is the easy part. Anyone can add length. What separates an install that looks like your own hair from one that announces itself across a room is the color blend and the placement. I will spend more time customizing the color of the hair and mapping where each piece sits than I do on the install itself. If the dimension falls flat or a line sits too high, it does not matter how expensive the hair was. It will read as fake, and you will feel it every time you catch your reflection.

## Nobody Warns You About the Upkeep

Here is the part that gets left out of the pretty before and afters. You will learn to wash your hair differently, usually less often and far more carefully. You will dry the bonds or the wefts fully every time, because trapped moisture at the root is how things quietly go wrong. You will sleep with your hair in a loose braid. You will buy a particular brush and a few particular products, and you will actually use them. And you will come back every six to eight weeks for a maintenance appointment that is not optional. Skip it and you risk matting, tension, and the exact damage everyone loves to blame on the extensions themselves.

## Be Honest With Yourself About the Budget

Good extensions are expensive, and the hair is only the first cost. There is the install, then the ongoing maintenance appointments, then replacing the hair when it eventually wears out. If that total makes you wince, that is genuinely useful information. I would much rather a client walk away than commit to something she cannot keep up, because neglected extensions look worse than no extensions at all. There is no shame in deciding the math does not work for you right now. It is a far better outcome than resenting your hair in two months.

## How to Be the Client Who Gets the Best Result

If you do go for it, the women who walk out happiest all do the same handful of things. They are honest in the consultation about how much effort they will really put in. They book their maintenance before they leave the salon. They follow the home care even on the nights they are tired. And they tell me the moment something feels off, instead of waiting until the next appointment to mention it. Extensions are a partnership. The hair on your head is only ever as good as the routine around it. Get that part right and they genuinely can be one of the best things you do for yourself. Get it wrong and they are an expensive lesson. I would always rather you hear that from me now than learn it the hard way.`,
		metaTitle: "Hair Extensions: What I Wish Clients Knew Before Booking",
		metaDescription: "A stylist's honest guide to hair extensions: the real commitment, why the methods are not interchangeable, aftercare, budget, and how to get a result that looks like your own hair."
	},
	{
		id: 41,
		slug: "summer-hair-damage",
		tag: "Hair Care",
		title: "The Real Damage Summer Does to Your Hair (and How Stylists Undo It)",
		excerpt: "Sun, chlorine, and salt are quietly rewriting your hair all season. Here is what is actually happening, and how to enjoy summer without paying for it in September.",
		author: "Gemma Vaughn",
		date: "Jul 1, 2026",
		readTime: "8 min",
		image: "/image/summer-hair-cover.webp",
		category: "Hair Care",
		section: "Hair Care",
		body: `Every year, right around late August, my chair fills up with the exact same appointment.

A client sits down, lifts a handful of dry, faded, slightly crispy ends, and says some version of the same sentence. I do not understand, I did not do anything to it. And that is exactly the problem. Summer does the damage for you, quietly, a little every day, while you are busy having a good time. So let me tell you what is really going on up there, because once you understand it, it is genuinely easy to prevent.

## The Sun Does More Than You Think

Start with the sun, because it is the one everyone underestimates. The same UV that burns your skin breaks down the protein your hair is built from and fades your color from the inside out. Hair does not have the luxury of healing the way skin does. It is technically dead the moment it leaves your scalp, so every hour in direct sun is cumulative and stays there until you cut it off. That is why hair that felt perfectly healthy in June can feel like straw by the end of the season, even if you never once touched a hot tool.

## Chlorine Is the Real Villain

Then there is chlorine, which in my opinion is the true troublemaker. It does not simply dry your hair out. It binds to it and keeps working long after you have climbed out of the pool. On lighter hair it can pull that faint green tint everyone panics about, which, for the record, is not the chlorine itself but the copper in the water that chlorine helps deposit onto the strand. On any hair it strips moisture and roughs up the cuticle, so your hair tangles more, feels coarse, and drinks up conditioner without ever feeling satisfied.

## Salt Water Is Not as Innocent as It Feels

Salt water tends to get a pass because it feels natural and gives you those loose, pretty waves. It is quietly dehydrating too. Salt draws water out of the strand, which is exactly why beach hair has that gritty, matte, slightly stiff texture. One day of it is fine. A week of it, left in and never properly rinsed, and you are essentially curing your hair like a piece of fish.

## And Then We Make It Worse Without Meaning To

Here is where a lot of the real damage happens. Hot weather means we sweat, so we wash more. More washing with a stripping shampoo removes the little moisture that survived the pool and the sun. Add daily heat styling to fight the humidity, and now your hair is being attacked from four directions at once. By the time it reaches my chair it is rarely one problem. It is a stack of them sitting on top of each other.

## Lightened and Colored Hair Takes the Worst of It

If your hair is lightened or colored, you need to know that you take the hardest hit from all of this. Lightened hair is more porous, which is a gentle way of saying it has more open doors for moisture to escape and for chlorine and minerals to walk straight in. Your gorgeous summer blonde is the most vulnerable hair in the building, and it needs the most protection, not the least. Most people give it the least.

## The Good News: Almost All of It Is Preventable

None of this requires giving up your summer. The single most effective thing you can do costs nothing at all. Wet your hair with clean water before you get into the pool or the ocean. Hair behaves like a sponge. If it is already full of fresh water, it simply cannot absorb as much of the chlorinated or salty water around it. Follow that with a leave-in conditioner as a barrier, and you have stopped most of the damage before it ever starts.

After you swim, rinse right away and do not let salt or chlorine dry on your hair. Wear a hat on the days that are really about the sun. Switch to a gentler, sulfate free shampoo so your washes stop stripping. And once a week, clarify to lift out the buildup of minerals and product, then immediately follow with a proper deep conditioning treatment. Clarifying on its own leaves the hair thirsty, so the order matters. Clarify first, then flood the moisture back in.

## If the Damage Is Already Done

If you are reading this in August and the season has already had its way with your hair, do not panic and please do not reach for the scissors in a rage. Come and see your stylist. A surprising amount of what looks like ruined hair is really surface damage and buildup that a proper clarifying treatment, a gloss to revive tired color, and a light dusting of the very worst ends can largely reset. You do not always need to lose length. You need to strip out what the summer deposited and put the moisture back.

![A clarifying treatment followed by a deep conditioning mask can reset a surprising amount of summer damage without losing length.|full](/image/summer-hair-salon.webp)

The clients who glide into fall with hair that still looks expensive are not lucky, and they are not doing anything dramatic. They rinse before they swim. They never let salt and chlorine sit. They wash a little less. And they book a treatment at the end of the season the way other people book a dentist. So enjoy your summer completely. Just do not hand your hair the entire bill in September.`,
		metaTitle: "Summer Hair Damage: What Sun, Chlorine & Salt Really Do",
		metaDescription: "A stylist explains what sun, chlorine, and salt water actually do to your hair over summer, why colored hair takes the worst of it, and how to prevent and reverse the damage."
	},
	{
		id: 42,
		slug: "smarter-way-to-go-gray",
		tag: "Color",
		title: "There Is a Smarter Way to Go Gray, and Most Women Never Hear It",
		excerpt: "The transition does not have to be two years of a harsh line and regret. A colorist on how to grow out your grays and actually enjoy the process.",
		author: "Vivienne Marsh",
		date: "Jul 2, 2026",
		readTime: "9 min",
		image: "/image/going-gray-cover.jpg",
		category: "Color",
		section: "Trends",
		body: `The clients who struggle most with going gray are almost never the ones with the most gray. They are the ones nobody gave a plan.

They wake up one morning, decide they are done coloring, stop, and then spend the next year fighting a hard line of silver at the roots and a length of old color that no longer matches anything. That is not going gray. That is quitting color with no strategy, and it is miserable. There is a far better way to do this, and I wish more women heard about it before they started rather than a year into the mess.

## Why the grow-out feels so brutal

When you stop coloring, your natural gray grows in at the root while the previously colored hair stays exactly where it is on the lengths. The place where the two meet is called the line of demarcation, and it is the single reason the transition earned its bad reputation. On someone who colored dark, that line can be stark, a band of bright silver sitting against a wall of brown. Left completely alone, it takes most people well over a year to grow out, sometimes closer to two depending on length. Nobody warns you about that timeline, and that gap is usually exactly where the panicked relapse happens.

## The decision is emotional, and that is completely fine

Before we get technical, here is something I say to everyone in my chair. Choosing to go gray is not only a hair decision, it is a personal one, and there is no wrong answer. Some women feel powerful and free the moment they commit. Others quietly grieve their old color for a while, and that is normal too. You are allowed to change your mind halfway through. My job is not to talk you into it or out of it. My job is to make whichever path you choose look intentional instead of accidental.

## There is more than one way to do it

The bluntest route is cold turkey, simply stopping and growing it all out. That works best if your hair is short or you honestly do not mind the line while it happens. The most comfortable route for most people is blending, where I weave lowlights and highlights through the lengths so the incoming gray and the old color melt together and that harsh line softens into something you can barely find. For darker hair, we sometimes lighten the lengths gradually across several appointments to meet the gray in the middle and shrink the contrast. And then there is the big chop, cutting the colored hair off entirely to start fresh with your natural silver, which is by far the fastest way through if you are feeling brave.

![Blending lowlights and highlights through the lengths softens the line of demarcation so the incoming gray and the old color melt together.|full](/image/going-gray-blending.jpg)

## Please stop chasing your roots with box dye

This is the one habit that will quietly sabotage everything. I understand the urge completely. The regrowth feels glaring and you just want it gone before the weekend. But box color builds up on the hair, coats it unevenly, and can react in genuinely unpredictable ways when a professional later tries to lighten or blend over it. Every colorist alive has a story about a beautiful transition plan that got derailed by one panicked purchase at the drugstore. If you are committing to gray, the entire point is to stop fighting your roots, not to fight them with the worst possible tool.

## Silver is a color you maintain, not the absence of one

The myth I hear most is that going gray finally frees you from the salon. Not quite. Natural silver and white hair is stunning, but it is also porous and it loves to grab onto tones you do not want, especially yellow and brass from your water, your products, and the air around you. Keeping silver looking crisp and bright usually means a purple toning shampoo used correctly, the occasional gloss to neutralize warmth, and yes, still seeing your stylist now and then. Think of it less as quitting color and more as switching to a new color that happens to be your own.

## Your haircut matters as much as your color

People forget that going gray changes how your hair behaves, not only what shade it is. Gray hair often has a different texture. It can be coarser, wirier, or a little more prone to wave than the hair you remember. A cut that flattered your old color may not flatter the new texture at all. This makes it the perfect moment to rethink your shape, because the right cut makes silver look chic and deliberate, while the wrong one lets it read as simply grown out and tired. I treat a gray transition as a fresh start for the whole look, not just the color.

![A fresh cut built for the new texture is what makes a silver transition read as chic and deliberate rather than simply grown out.|full](/image/going-gray-mirror.jpg)

## What actually keeps silver looking expensive

At home, a few small things make an outsized difference. A good purple shampoo, used once or twice a week and no more, keeps the yellow in check. A clarifying wash every so often lifts out the mineral buildup that dulls silver, which matters a lot if you have hard water. And moisture becomes more important than ever, because that coarser gray texture drinks it up fast. Overdo the purple and you drift slightly lilac. Skimp on the moisture and you drift toward straw. It is a balance, and a good stylist will dial in the exact routine for your specific hair.

Going gray is one of the very few beauty decisions that is genuinely yours. It is not a trend and it is not fixing anything. Done with a plan, it is one of the most elegant things a woman can do with her hair. Done by accident, with a hard line and a drawer full of box dye, it simply looks like you gave up, which is a shame, because you did the exact opposite. So if you are even thinking about it, come and talk to a colorist before you stop coloring, not a year after. We would so much rather help you design the transition than rescue it.`,
		metaTitle: "The Smarter Way to Go Gray: A Colorist's Grow-Out Guide",
		metaDescription: "A colorist explains how to grow out your grays without the harsh line and regret, from blending and the big chop to why box dye sabotages the whole transition."
	},
	{
		id: 43,
		slug: "hard-water-hair",
		tag: "Hair Care",
		title: "Your Shower Water Might Be the Real Reason Your Hair Feels Off",
		excerpt: "Dull, rough, oddly heavy hair that no product seems to fix. Before you buy another mask, a stylist wants you to look at what is coming out of your shower head.",
		author: "Tessa Lindqvist",
		date: "Jul 2, 2026",
		readTime: "8 min",
		image: "/image/hard-water-cover.jpg",
		category: "At-Home Tips",
		section: "Hair Care",
		body: `Every so often a client sits in my chair with hair that makes no sense on paper.

She uses good products. She does not overwash. Her cut is fine. And yet her hair feels dull, a little rough, and strangely heavy, like it is wearing a coat it cannot take off. Nine times out of ten, before I reach for a single product, I ask her one question that surprises her. How is the water where you live? Because far more often than people suspect, the problem is not on the shelf at all. It is coming straight out of the shower head.

## What hard water actually is

Hard water simply means water carrying a high level of dissolved minerals, mostly calcium and magnesium, picked up as it moves through rock and pipes. Most of the country has some degree of it, and a lot of people have it badly without ever knowing. It is completely harmless to drink. It is not nearly so harmless to your hair, because every single time you wash, those minerals deposit onto the strand and build up like limescale on a kettle. Over weeks and months that film grows heavier, and your hair slowly starts to behave like it belongs to someone else.

## The signs that make me suspect water first

There is a specific cluster of complaints that points me at water before anything else. Hair that feels dull no matter how you treat it. A rough, straw like texture on hair that used to feel soft. Tangling that appeared out of nowhere. Shampoo that will not lather the way it once did. Color that fades or turns brassy far faster than it should. And an itchy, tight, sometimes flaky scalp that no dandruff shampoo seems to touch. Any one of these can have other causes. All of them together, especially if they crept in gradually, and I am already thinking about your pipes.

![The telltale sign: a rough, straw-like texture on hair that used to feel soft, with buildup you can almost feel between your fingers.|full](/image/hard-water-signs.jpg)

## You cannot condition your way out of it

Here is the part that frustrates people the most. Conditioner cannot fix a mineral problem. It adds softness on top, but the buildup is still sitting underneath, coating the hair and blocking moisture from getting in. So you reach for more mask and more oil, the hair gets heavier and flatter, and the real issue never moves. It is a little like moisturizing over a layer of dried glue. The problem is not that your hair is thirsty. The problem is that something is standing between your hair and everything you are trying to feed it.

## It quietly sabotages your color

If you color your hair, hard water is working against you the entire time. The mineral film makes color grab unevenly and fade faster, and it is a major reason blondes go brassy or dull so quickly and why a fresh gloss never seems to last. Minerals like copper and iron in the water can even react with light hair and throw unwanted tones into it. Colorists who work in hard water regions build their whole approach around this. Clients who move from a soft water city to a hard water one often assume their colorist suddenly lost the magic. The colorist did not change. The water did.

## Why your hair changed when you moved

This is the detail that finally convinces people. I cannot count the times a client has said some version of the same thing. I do not understand, my hair was perfect at my old place, and now it is a disaster, and nothing else changed. Nothing else did change. The water did. Hair is an incredibly sensitive record of its environment, and moving from soft water to hard, or the reverse, can transform how it behaves within a few weeks. Once you know to look for it, it is obvious. Before you know, it genuinely feels like your hair turned on you for no reason at all.

## What actually fixes it

The good news is that this is very fixable, and the fix is not more conditioner. The single most useful thing is a chelating shampoo, which is not the same as a regular clarifying one. A normal clarifying shampoo strips oil and product. A chelating shampoo contains ingredients that actually bind to metals and minerals and lift them off the hair, which is exactly what this situation calls for. Used every week or two, never every day, it can bring dull, coated hair back to life quite dramatically. For a longer term solution, a shower head filter cuts how much mineral reaches your hair in the first place, which is the closest thing to fixing the problem at the source. And in a hard water area, a professional mineral removing treatment before a color service is worth every cent.

![A professional mineral-removing treatment at the bowl lifts the buildup a chelating shampoo starts on, and it is worth every cent before a color service.|full](/image/hard-water-treatment.jpg)

One quick word on the internet's favorite remedy. A well diluted apple cider vinegar rinse can help a little by gently dissolving some buildup, and plenty of people enjoy it. But it is mild, it is not a real substitute for a proper chelating treatment, and using it too strong or too often can dry the hair out or disturb your color. Treat it as a pleasant occasional extra, not the main event. And please do not attack your scalp harder to fix that tight, itchy feeling. That is buildup, not a lack of washing, and scrubbing only irritates skin that is already unhappy.

I love a beautiful product as much as anyone, but part of my job is telling people when the answer is not on the shelf at all. If your hair has quietly turned on you and you cannot work out why, look past the bottles for a moment and think about your water. It is one of the most common hidden culprits I see, and one of the most satisfying to fix, because the day a client washes with the right treatment and feels her real hair come back, she always says the exact same thing. I forgot it could feel like this.`,
		metaTitle: "Hard Water and Your Hair: Why It Feels Off and How to Fix It",
		metaDescription: "A stylist explains how hard water minerals build up on your hair, why conditioner cannot fix it, and how a chelating shampoo and shower filter bring dull, coated hair back to life."
	},
	{
		id: 44,
		slug: "how-often-wash-hair",
		tag: "Hair Care",
		title: "How Often Should You Really Wash Your Hair? Let Me Settle This.",
		excerpt: "Everyone wants a number. A stylist explains why the number does not exist, why you cannot train your scalp, and what actually decides how often you should wash.",
		author: "Marisol Reyes",
		date: "Jul 7, 2026",
		readTime: "8 min",
		image: "/image/wash-frequency-cover.jpg",
		category: "At-Home Tips",
		section: "Hair Care",
		body: `If I had to name the single question I have been asked most in twenty years behind the chair, it would not be about color or cuts. It would be this. How often should I actually be washing my hair?

Everyone wants a number, a clean little rule they can follow forever. And every time, I have to gently disappoint them, because the number everyone is chasing does not exist. But there is a real answer sitting underneath it, and it is far more useful than a rule ever could be. Let me walk you through it.

## There is no universal number, and there never was

The reason there is no single correct frequency is that your scalp is not the same as anyone else's. How much oil you produce, your hair's texture and thickness, how sensitive your scalp is, how much you sweat, the products you use, even the season, all of it changes the math. Someone with fine, straight, oily hair might genuinely need to wash daily to not look greasy by lunch. Someone with thick, curly, or coily hair might wash once a week and be doing exactly the right thing, because that same oil takes days just to travel down the strand. Telling both of those people to wash three times a week, the number the internet loves, would be wrong for both of them.

## No, you cannot train your hair to be less oily

Here is the myth I have to bust almost weekly. You cannot train your scalp to produce less oil by washing it less. I understand why people believe it. They read that if they just push through a few greasy weeks, the scalp will get the message and slow down. It will not. Oil production is controlled by your hormones and your genetics, not by how often you reach for a shampoo bottle. Your oil glands are not watching your schedule. What actually happens during those greasy weeks is that you get used to seeing your hair oilier and quietly lower your standards, and buildup starts to mask that just washed feeling. The gland did not change. Your tolerance did.

## Overwashing is real, but the fix is usually gentler, not less

You can absolutely overwash, and I see the results of it constantly. Washing too often, especially with a harsh stripping shampoo, pulls the natural oils off your scalp and your lengths faster than they can be replaced. The scalp feels tight and irritated, the ends turn dry and brittle, and color fades quicker. Some people even notice their scalp feeling oily faster after a strong strip, not because they trained it, but because they briefly knocked it off balance and it is scrambling to catch up. The answer is rarely to just wash less. Far more often, it is to wash gentler.

## But underwashing is not virtuous either

On the other side, washing too rarely is not automatically clean living, whatever the wellness internet implies. Your scalp is skin, and skin that sits under days of oil, sweat, dead cells, and old product gets flaky, itchy, and inflamed. A congested scalp is not a happy place for hair to grow from. Weighed down, unwashed roots also simply look and feel heavy. Clean scalp, healthy hair. There is nothing pure or beneficial about letting buildup sit and marinate.

## Dry shampoo is a delay, not a wash

This is where dry shampoo needs a serious word. It is a wonderful tool for stretching an extra day or two between washes, and a genuinely terrible substitute for washing. It does not clean anything. It absorbs oil and adds a little product to disguise it, which means every time you reach for it instead of washing, you are laying another layer onto a scalp that is already asking to be cleaned. I see what dry shampoo looks like when it is used as a lifestyle rather than a bridge, and it is usually a clogged, itchy scalp and hair that will not hold a style. Use it to buy time. Do not use it to avoid the shower for a week.

## Different hair, different needs

So, roughly, and only roughly. Fine, straight, or oily hair usually needs washing more often, sometimes daily, and does best with a lighter shampoo. Thick, wavy, curly, or coily hair usually needs washing less often, because the oil travels slowly and the hair is thirstier, and it often thrives with gentler cleansing or a conditioner wash between shampoos. Older and colored hair tends to run drier, so it can usually stretch washes further than it could in its twenties. None of these are laws. They are only starting points, and your own scalp gets the final say.

![If your roots are greasy the day after washing, you probably need to wash more often or more thoroughly, not less. Your scalp gets the final say.|full](/image/wash-frequency-roots.jpg)

## How to actually find your number

The way to find your frequency is to stop chasing a rule and start paying attention. Wash when your scalp genuinely feels dirty, oily, itchy, or heavy, not on a calendar and not because a video handed you a number. If your roots are greasy the day after washing, you probably need to wash more often, or wash your scalp more thoroughly, not less. If your ends feel like straw, you are likely washing too aggressively, and a gentler shampoo will help you far more than skipping days will. Your hair is constantly telling you what it needs. Most people simply are not listening, because they are too busy following someone else's schedule.

And here is the part almost nobody gets told. How you wash matters more than how often. Shampoo is for your scalp, not your lengths. Work it into the roots where the oil actually lives, and let the runoff clean the rest as you rinse. Keep the water warm rather than scalding, because heat strips and irritates. Save conditioner for the mid lengths and ends and keep it off the scalp. Do that consistently, and you will often find you can wash less anyway, simply because your scalp and hair are both in better balance to start with.

![Shampoo is for your scalp, not your lengths. Work it into the roots where the oil actually lives and let the runoff clean the rest.|full](/image/wash-frequency-scalp.jpg)

So the real answer to how often you should wash your hair is not a number I can hand you across the chair. It is this. As often as your particular scalp needs it, washed gently and correctly, and no more or less than that. It is less satisfying than a rule, I know. But your hair is not a rule. It is yours. The moment you stop outsourcing the decision to the internet and start reading your own scalp, the whole question gets a great deal simpler.`,
		metaTitle: "How Often Should You Wash Your Hair? A Stylist Settles It",
		metaDescription: "A stylist explains why there is no universal wash frequency, why you cannot train your scalp to be less oily, and how to read your own hair to find the right number."
	},
	{
		id: 45,
		slug: "split-ends-trims-truth",
		tag: "Hair Care",
		title: "No, You Cannot Repair a Split End. Here Is What Actually Happens.",
		excerpt: "Why no product truly mends a split end, why ignoring one costs you length, and the trim myths a stylist wishes would finally die.",
		author: "Delaney Cross",
		date: "Jul 8, 2026",
		readTime: "8 min",
		image: "/image/split-ends-cover.jpg",
		category: "At-Home Tips",
		section: "Hair Care",
		body: `I have had the same gentle argument hundreds of times. A client with splitting, frayed ends tells me she does not want to lose any length, and asks whether there is a product that will just repair the ends instead.

I always wish I could say yes. But I would be lying, and part of my job is telling people the truth about their hair even when it is not the answer they were hoping for. So here it is, plainly. You cannot repair a split end. Not with any product, at any price. What you can do instead is far more useful, and it starts with understanding what a split end actually is.

## What a split end really is

Every strand of your hair is wrapped in a protective outer layer called the cuticle, a little like the shingles on a roof or the coating on a wire. When that outer layer wears away at the tip, from heat, brushing, coloring, friction, and simple time, the soft inner part of the hair is left exposed, and the strand begins to fray and split apart. That is a split end. It is structural damage to something that is, crucially, not alive and cannot heal itself. Your skin repairs. Your hair does not. Once a strand has split, that strand is split for good.

![A split end is structural damage to something that cannot heal itself. Once a strand has split, it is split for good.|full](/image/split-ends-frayed.jpg)

## Why no product can mend it

This is why nothing in a bottle can truly fix it, whatever the packaging promises. Serums and so called repair treatments can temporarily glue the split closed and coat the strand so it looks and feels smoother for a wash or two. That is genuinely pleasant, and there is nothing wrong with using them for a smoother finish. But be clear about what is happening. You are not repairing the hair, you are briefly binding a broken thing back together. The moment you wash it out, the split is still there, and often slightly worse, because the damaged end keeps catching and fraying. A repair product on a split end is makeup, not medicine.

## Ignore it and it climbs

Here is the part that makes leaving them alone genuinely expensive. A split end does not politely stay at the tip. Left to its own devices it travels up the strand, exactly like a run climbing up a stocking. The split works its way higher, the strand keeps fraying, and eventually it snaps somewhere up the length, leaving you with breakage far above where the damage began. So the client who refuses a trim to protect her length is very often the reason she keeps losing it. The damage she would not let me remove at the tip climbs upward and takes even more with it.

## The trim myth, cleared up

Now let me settle the myth that causes half the confusion. Trims do not make your hair grow. They cannot. Hair grows from the follicle in your scalp, and your ends have no idea whether they were cut last week or last year. Anyone who tells you a haircut speeds up growth is simply mistaken. But here is the part people miss. Regular trims absolutely help you keep and even gain length, because they remove the split and weakened ends before those can travel up and break off higher. Growth happens at the root. Length is protected at the ends. You need both to actually end up with longer hair, and skipping trims quietly sabotages the second half of that equation.

## So how often do you actually need one?

Not on the rigid schedule most people assume. Every six to eight weeks is a fine rule for someone with a short, precise cut who wants to keep the shape sharp. For someone growing their hair out, trimming that often can work against them. The honest answer is that it depends on your damage, not the calendar. Fine, colored, heat styled hair splits faster and needs attention sooner. Healthy, gently handled hair can go much longer between visits. A good stylist looks at your actual ends, not a date on a card, and tells you when they truly need it. If your ends are splitting, tangling, and starting to look wispy and see through, they are ready, whatever the calendar says.

## If you are scared to lose length, ask about dusting

If your real fear is losing length, ask your stylist about dusting. It is a technique where we take off only the very tips, sometimes just a couple of millimeters, enough to remove the split ends while keeping essentially all of your length. Done carefully it lets someone who is growing their hair keep their ends healthy without the grow out ever feeling like it has stalled. It does not suit every situation, and it is not a substitute for a real shape when the cut needs one, but for the length obsessed it is often the compromise they never knew existed.

![Dusting removes only the very tips, sometimes just a couple of millimeters, so growing-out hair keeps its ends healthy without the length ever feeling like it stalled.|full](/image/split-ends-healthy.jpg)

## The best trim is the one you prevent

The surest way to need fewer trims is to create fewer split ends in the first place, and the culprits are the usual suspects. Heat styling with no protection, brushing aggressively or brushing soaking wet hair, tight elastics that snap the strand in the same spot every day, rough towels, and skipping conditioner on the ends where you need it most. Your ends are the oldest and most fragile part of your hair, sometimes several years old, and they have quietly survived everything you have ever done to your hair. Treat them like the antiques they are and they will split far more slowly.

So the next time you are tempted to stretch a trim for a few more months to protect your length, picture the stocking. The damage is not staying put. A little taken off now protects the rest, and as counterintuitive as it sounds, the person who trims sensibly almost always ends up with longer, healthier hair than the one who refuses to part with a single inch. I am not trying to take your length. I am trying to help you keep it.`,
		metaTitle: "You Cannot Repair a Split End: What a Stylist Wants You to Know",
		metaDescription: "A stylist explains why no product truly repairs a split end, how ignoring one costs you length as it climbs the strand, and the truth about how often you really need a trim."
	},
	{
		id: 46,
		slug: "flat-iron-heat-damage",
		tag: "Hair Care",
		title: "Your Flat Iron Runs Hotter Than Your Oven. Your Hair Notices Before You Do.",
		excerpt: "A colorist explains what really happens to your hair at 430 degrees, why hotter is never faster, and the small habit changes that save more hair than any bottle you can buy.",
		author: "Simone Ellery",
		date: "Jul 10, 2026",
		readTime: "7 min",
		image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=1600&q=80&auto=format&fit=crop",
		category: "Hair Health",
		section: "Hair Care",
		body: `I can tell how someone styles their hair before they say a word. I take a section between two fingers, run down to the ends, and the story is right there. The mid-lengths feel fine. The last two inches feel like dry straw and the section snaps instead of bends. Nine times out of ten, that person owns a flat iron, uses it most days, and has no idea it is running at a temperature that would cook an egg on contact.

Heat is the damage almost nobody counts. Clients will agonize over whether their shampoo has sulfates, then press a 430-degree plate onto wet-ish hair every morning without a second thought. I am not here to take your styling tools away. I use them on clients daily. But I want you to understand what is actually happening at that temperature, because once you do, a few small changes will save you more hair than any bottle you can buy.

## What the number on the dial actually means

Most flat irons and curling wands go up to somewhere between 400 and 450 degrees Fahrenheit. People assume those top settings exist because hair needs them. They do not. Those settings exist for professional use on very coarse or resistant hair, in trained hands, for a single fast pass. Your oven roasts a chicken at 375. Your flat iron on high is hotter than that, and you are holding it against a protein fiber that is far more delicate than it feels.

Human hair starts to suffer real, permanent change to its internal structure at temperatures well below where most people style. Push past roughly 350 and you begin to break down the keratin and, worse, you can hit the moment where any water still trapped in the strand flashes to steam. That is the tiny crackle or hiss you sometimes hear. That sound is not the sizzle of good styling. It is a small blister forming inside the hair. Stylists call the result a bubble hair, and once a strand has bubbled, it is a weak point that will snap. There is no undo.

## Hotter is not faster, and fine hair is not tougher

The instinct is that a higher temperature gets the job done in fewer passes, so it must be gentler overall. It is the opposite. The right approach is the lowest temperature that gives you the result, with a clean single pass, not the highest temperature you can stand rushed over the same section five times. Five nervous passes at 450 does far more damage than one confident pass at 360.

Fine and light-colored hair is where I see this go wrong most. Fine strands have less mass to absorb the heat, so they reach a damaging temperature faster than thick, coarse hair. Blondes and anyone lifted with color have already had the cuticle chemically opened, which makes the strand thirstier and more heat-sensitive. If your hair is fine, highlighted, or both, the high setting is not for you, full stop. That is the exact combination that lands in my chair frizzing halfway down and breaking at the ends.

## Heat protectant is a seatbelt, not a force field

Here is the thing brands will not put on the front of the bottle. A heat protectant does not make your hair heatproof. It buys you a margin. A good one forms a thin barrier that slows how fast heat transfers into the strand and helps the surface glide, which reduces friction damage. It genuinely helps, and you should use it every single time. But it is a seatbelt, not a force field. It lowers the odds of catastrophe. It does not let you drive into a wall.

And it only works if you use it correctly, which most people do not. It has to be applied evenly and, for most spray formulas, on hair that is dry or nearly dry, because ironing sopping wet hair through a product is how you get that steam-explosion damage regardless of what you sprayed on. A quarter-sized amount clumped on one side of your head is not protecting the sections that actually meet the plate.

## The tells I read in a consultation

You do not need a stylist to run this diagnostic on yourself. Take a small section near your face, where heat tools land most, and compare it to hair from the nape underneath, which usually gets styled least. If the top section feels rougher, looks lighter or more washed-out, frizzes while the underneath stays smooth, that gap is your heat damage. Healthy hair and heat-stressed hair on the same head is the single clearest sign.

The other tell is the tiny white node. Run a strand through your fingers and feel for a minuscule swelling partway down, or look for a little white dot on the end. Those are the bubble points and split beginnings I mentioned. They mean a break is coming whether you cut it or not. The only real fix is to remove the damaged length and change the habit that made it, because a strand cannot be healed, only prevented.

## What I actually tell clients to do

I am not going to pretend anyone is giving up their tools, so here is the realistic version. Drop your temperature to the lowest setting that still holds your style, and for most fine to medium hair that is somewhere in the 300s, not the 400s. Coarse or very resistant hair can go higher, but it is a smaller club than the dial suggests. Always dry hair fully before a flat iron touches it. One slow, deliberate pass beats five fast ones. Use the protectant every time, on properly dried hair, evenly.

And give your hair days off. The clients with the healthiest lengths are not the ones with the fanciest products. They are the ones who let their hair air-dry two or three days a week and save the hot tools for when it matters. Your hair keeps a running total of every degree it has ever met. The kindest thing you can do is simply hand it a smaller bill.`,
		metaTitle: "Flat Iron Heat Damage: What Really Happens to Your Hair at 430 Degrees",
		metaDescription: "A colorist with 16 years behind the chair explains what heat really does to your hair, why hotter is never faster, and the small habit changes that prevent breakage."
	},
	{
		id: 47,
		slug: "hair-oiling-trend",
		tag: "Technique",
		title: "Everyone Is Oiling Their Hair Right Now. Half of Them Are Doing It Backwards.",
		excerpt: "Hair oiling is having a viral moment, but the trend videos leave out the technique that decides whether it works. A stylist breaks down the three mistakes that ruin it.",
		author: "Renata Voss",
		date: "Jul 13, 2026",
		readTime: "7 min",
		image: "/image/hair-oiling-trend-cover.png",
		category: "Technique",
		section: "Trends",
		body: `Every few years an old technique puts on new clothes and comes back as a trend, and my clients start asking me about it like it was invented last Tuesday. Right now it is hair oiling. Slugging your hair, they call it, borrowed from the skincare version. Overnight oil, a shower cap, a video of someone with impossibly glossy strands. My chair has been full of women either swearing by it or convinced it ruined their hair, and the strange part is they are often doing almost the same thing. The difference between the two outcomes is technique, and technique is exactly what the trend videos leave out.

So let me do what the fifteen-second clips will not. Oiling is not new, it is not magic, and it is not for everyone. It is a genuinely useful technique that gets ruined by three predictable mistakes. Here is how it actually works, and how to tell within a week whether it belongs in your routine at all.

## What oil can and cannot do

First, honesty, because that is the whole point of doing this properly. Oil does not feed your hair from the outside and it does not make it grow. Your hair is not alive. It cannot absorb nutrients through the strand the way the ads imply. What the right oil can genuinely do is real and worth having anyway. It coats the strand, smooths the cuticle so light bounces off it as shine, reduces the friction that causes breakage, and slows how quickly water leaves the hair, which is why oiled hair holds its moisture and looks less frizzy.

So this is a technique for managing the hair you already have, not for growing more. The women who come in disappointed almost always expected the second thing. The women who are thrilled wanted the first. Sort out which one you are before you start, and you will not be one of the disappointed ones.

## Mistake one: oiling the scalp when you meant to oil the hair

This is the big one, and it is where the trend does real harm. There are two completely different practices getting blended into one word. Oiling the lengths of your hair, mid-shaft to ends, is about shine and protection and is safe for basically everyone. Oiling the scalp is a different thing with a different purpose and different risks, and the trend videos smear the two together.

For a lot of people, sitting heavy oil on the scalp overnight under a cap is a recipe for clogged follicles, buildup, and in some cases a flare of the very flaking they were trying to fix. If your scalp is oily or acne-prone to begin with, this is not your technique. Keep oil on the lengths, keep it off the roots, and you avoid the most common way this goes wrong. If you specifically want to work on your scalp, that is a targeted, lighter, rinse-in-a-reasonable-time practice, not a heavy overnight slug.

## Mistake two: the wrong oil, drowned on in the wrong amount

Not all oils behave the same and the difference is not marketing. Some oils actually penetrate the strand and genuinely condition, which is the group you want for real benefit rather than just a surface coat. Others mostly sit on top and add shine and slip, which is fine but is a different job. And a few of the trendiest bottles are barely oil at all once you read the back. The point is that the oil you grabbed because it went viral may not be doing what you think.

Then there is amount, and this is where most home attempts fail. Hair oil is a few drops warmed between the palms and pressed through the mid-lengths and ends, not a dressing you pour on a salad. Too much and no shampoo on earth will fully remove it in one wash, so you strip and strip and end up drier than when you started. If it takes three lathers to feel clean, you used at least three times too much.

## Mistake three: no plan to get it back out

An oil treatment is only as good as your ability to remove it cleanly, and nobody in the videos shows the wash-out because it is not aspirational. Fine hair especially will look flat and greasy for a day or two if the removal is wrong. The fix is simple once someone tells you: apply shampoo to the oily hair before you add water, emulsify it, and only then rinse. Adding water first just makes the oil bead up and refuse to leave. Done right, one or two gentle washes clears it. Done wrong, you are back to square one and blaming the oil.

## So should you actually do it

Here is my honest, behind-the-chair verdict. If your hair is dry, coarse, curly, or chronically frizzy, a lengths-only oiling once or twice a week is one of the best low-cost things you can do for shine and breakage, and I recommend it happily. If your hair is fine or your scalp runs oily, do it lightly, on the ends only, and do not expect a miracle. If you are doing it because a video promised regrowth, save your money, because that is the one thing it cannot deliver.

The test is the same as it is for every trend that lands in my chair. Try the corrected version for two weeks, watch how your actual hair behaves rather than how the ritual feels, and keep only what earns its place. Oiling is a good technique wearing a silly new name. Do it the boring, correct way and it works. Do it the way the algorithm showed you, and you become one of the clients I spend an afternoon fixing.`,
		metaTitle: "The Hair Oiling Trend, Explained: 3 Mistakes That Ruin It",
		metaDescription: "A stylist with 15 years behind the chair explains what hair oiling can and cannot do, the three mistakes that ruin it, and how to tell in two weeks if it is right for your hair."
	},
	{
		id: 48,
		slug: "modern-perm-trend",
		tag: "Texture",
		title: "The Perm Is Back, and It Is Nothing Like the One That Scared Your Mother",
		excerpt: "The perm returned quietly, under new names, doing a much gentler job. A texture specialist explains what it actually is now, and the honest version of who should and should not get one.",
		author: "Talia Brenner",
		date: "Jul 14, 2026",
		readTime: "7 min",
		image: "/image/modern-perm-soft-wave.png",
		category: "Texture",
		section: "Trends",
		body: `The word perm still makes people flinch. I watch it happen at the chair. A client will describe exactly what she wants, soft bends, that lived-in undone wave, hair that does something on its own instead of falling flat by noon, and then I say the word for what would actually give her that, and her face drops. She is picturing 1986. Tight poodle curls, a helmet of frizz, that unmistakable smell. I get it. But the thing she is imagining and the thing I would actually do to her hair have almost nothing in common anymore.

Texture is the biggest trend in my chair right now, and a real chunk of the undone, effortless hair people are asking for is not achievable with a curling iron every morning forever. So the perm came back. It just came back quietly, under new names, doing a much gentler job. Here is what it actually is now, and the honest version of who should and should not get one.

## Why it looks nothing like the eighties version

The old perm was built to do one thing as aggressively as possible, which was to take straight hair and force it into tight, uniform curl and hold it there for dear life. The solutions were harsh, the rods were small, and the goal was maximum, permanent, unmistakable curl. That is the image burned into everyone's memory, and it is a fair thing to be afraid of.

What has actually changed is the intention, not just the chemistry. Today the point of most of these services is a loose, natural-looking wave, not a defined curl. Bigger rods and rollers make bigger, softer bends. The trend names you have seen floating around, the beach-wave perm, the digital or so-called hot perm, the K-beauty styles, are mostly different tools aimed at the same modern goal, which is texture that looks like you were simply born with slightly better hair. The results are gentler, less uniform, and far more forgiving than what your mother sat through.

![Bigger rods and rollers create the soft, loose bends of a modern perm, a world away from the tight uniform curl of the eighties.|full](/image/modern-perm-rollers.png)

## What a perm can and cannot give you

Let me be a stylist and not a salesperson for a second. A perm restructures the actual bonds inside your hair, so it genuinely changes your texture rather than just styling it. That is the appeal and the catch in one sentence. The upside is enormous for the right person. If you are tired of heat-styling waves every single morning only to watch them fall out, a soft wave built into the hair itself gives you volume and movement that survives your commute and your workout. For fine, flat hair especially, it can add the body a round brush never keeps.

What it cannot do is be temporary or be undone on a bad day. It grows out, it does not wash out, and you will have a line where new straight hair meets waved hair as it does. It also will not fix damaged hair or make thin hair thick. It changes the shape of the strand, not the health or the amount of it. Anyone promising you that a perm is a hair-growth or repair treatment is selling, not advising.

## The part the trend videos skip: it is still a chemical service

However soft and pretty the modern version is, a perm is a chemical process that breaks and reforms the bonds in your hair, and that is not a small thing to do to a strand. Done well, on suitable hair, by someone who knows what they are doing, it is safe and the hair stays healthy. Done on the wrong hair, or overprocessed, it is exactly the frizzy, straw-like disaster the reputation is built on. The difference is almost entirely the condition of your hair going in and the skill of the person doing it.

This is why the honest answer to can I perm my hair is sometimes no. If your hair is already heavily bleached, badly heat-damaged, or fragile and breaking, layering a bond-breaking chemical service on top is asking for trouble, and a good stylist will tell you to wait and repair first rather than take your money today. When someone declines to perm compromised hair, that is not them being difficult. That is the single clearest sign they actually know what they are doing.

## If you are tempted, do this first

Go in for a consultation before you book the service, and treat how the stylist talks to you as part of the test. You want someone who asks to feel your hair, asks what you have done to it chemically, and talks about rod size and the specific wave you want rather than just saying yes to everything. Bring photos, and be honest that what you are usually showing is a loose wave, not a tight curl, because those are two very different services and the mix-up is where disappointment starts.

![A stylist who asks to feel your hair and talks through the specific wave you want is showing you they know what they are doing.|full](/image/modern-perm-consultation.png)

Then ask about the aftercare before you commit, not after, because a perm changes how you have to treat your hair. Waved hair is thirstier and needs gentler, more moisturizing care and a break from the very heat tools you were hoping to retire. If a salon is eager to book the appointment but vague about how you will care for it afterward, that tells you something. The perm earned its comeback because the modern version is genuinely good. It still only works when the person doing it respects that it is chemistry, not a curling iron with commitment issues.`,
		metaTitle: "The Modern Perm, Explained: Nothing Like the One That Scared Your Mother",
		metaDescription: "A texture specialist explains how the modern perm creates soft, natural waves, what it can and cannot do, and the honest signs of a stylist who will do it right."
	},
	{
		id: 49,
		slug: "scalp-service-gap",
		tag: "Business",
		title: "Your Clients Are Already Buying Scalp Care. Just Not From You.",
		excerpt: "Scalp products make up 3.4% of salon retail. Scalp services make up 0.1% of salon time. That gap is the most obvious money on the table in 2026, and the stylists closing it are booking at a frequency colour never could.",
		author: "Dana Reeves",
		date: "Jul 16, 2026",
		readTime: "9 min",
		image: "/image/scalp-service-bowl.png",
		category: "Business",
		section: "Inspiration",
		body: `Scalp-care products account for roughly 3.4% of salon retail sales. Scalp treatments account for roughly 0.1% of salon services.

Sit with that for a second.

Your clients are buying scalp care. They're buying it in volume, at your front desk, off your shelf, with your name on the bag. And then they're going home and doing the service themselves, badly, in the shower, in four minutes, with wet hands and no mirror.

You sold them the product. You gave away the service. That's the whole problem in two numbers.

## The eight minutes you've been giving away for free

Think about what actually happens at your shampoo bowl.

You've got a client reclined, warm water running, your hands on her scalp. She's quiet. Half your clients close their eyes. A few of them tell you it's the best part of the appointment, and if you've been behind the chair more than a year, you've heard some version of "honestly, I'd pay just for this" said as a joke.

It wasn't a joke. It was market research.

Here's what most of us were trained to believe: the bowl is prep. It's the thing that happens before the service. It's overhead, a cost center you absorb so you can get to the part you actually bill for. Some salons don't even let the stylist do it.

That framing was always wrong. It's now expensively wrong.

![The eight minutes at the bowl were never overhead. They were the service your clients keep telling you they would pay for.|full](/image/scalp-service-bowl.png)

## Why now, when the bowl has been there forever

The head spa did it.

The global head spa market sits around $1.5 billion and is tracking toward $2.8 billion by 2033, call it 8.5% compounding, which in this industry is a rocket. #headspa videos have been going viral on TikTok for two straight years. Dedicated scalp studios are opening in markets that didn't have a single one in 2023.

The concept is Japanese and it's not new. What's new is that American clients now have a reference point. Three years ago, "scalp treatment" meant nothing to your client, it sounded like something for dandruff, faintly medical, vaguely embarrassing. Today she's seen forty videos of someone getting a warm oil scalp massage under a microscope camera and she has a word for what she wants.

That's the shift. Not demand, demand was always there, sitting in your bowl with her eyes closed. Vocabulary. She can finally ask for it. And most salons still don't have anything to sell her when she does.

## The math nobody runs

Everyone reads the head spa headlines and thinks nice trend, cute add-on. Then they price it as a $15 upgrade and wonder why it didn't move the needle.

You're looking at the wrong number. It's not the ticket. It's the frequency.

Run your own book:

- **Colour:** every 6 to 8 weeks
- **Cut:** every 8 to 12 weeks
- **Scalp treatment:** every 2 to 4 weeks

That's the entire argument. Everything on your menu is capped by biology, hair grows at a fixed rate and you cannot make her roots come in faster to fill your Tuesday. Scalp service has no such ceiling. It's a wellness cadence, not a maintenance cadence. It behaves like a facial, not a haircut.

Take one client at $95, every three weeks, versus that same client at $180 every eight. The colour ticket looks bigger. Annually, the scalp client is worth more, and she's worth it on chair time you were previously giving away, with product cost in the single digits per treatment, no formulation risk, no redo, no colour correction at 7pm on a Saturday.

And these aren't either/or clients. It's the same woman. You're not replacing the colour appointment. You're filling the five dead weeks between them.

That's the part that should keep you up: it's incremental revenue from existing clients on existing equipment. You're not buying a book. You already have the book.

## What it actually costs to start

Less than you're assuming, which is why the salons that move early are going to look very smart in about eighteen months.

You already own the expensive part. You have a bowl, a water line, towels, and hands that know what they're doing. What you're adding:

- **A treatment line.** Cleanser, exfoliant, a serum or two, a mask. One good professional line, not six.
- **A scalp camera.** $80 to $200. This is the single highest-ROI purchase on the list and I'll come back to it.
- **A steamer or hot towel setup.** Optional at first. Adds real perceived value.
- **Time on the books.** The genuinely scarce resource. A real treatment is 30 to 45 minutes and cannot be squeezed into a processing window.

![The expensive part you already own. The rest, a treatment line, a camera, a few tools, costs less than a slow week.|full](/image/scalp-service-tools.png)

The camera deserves its own paragraph. A scalp camera turns an invisible service into a visible one, and invisible services are the hardest thing in the world to sell twice. Your client cannot see her own scalp. She has never seen her own scalp. Show her the before, show her the after, and you have converted a feeling into evidence. Every stylist I know who's added one says the same thing: rebooking stopped being a conversation.

![A scalp camera turns an invisible service into a visible one. She has never seen her own scalp, until you show her.|full](/image/scalp-service-camera.png)

## Build the menu properly

Four rules. Break them at your own cost.

**1. It is a booking, not an add-on.** The moment it lives as a $20 upgrade at the bowl, you've told her it's worth $20. It goes on the menu as its own service, with its own duration and its own line. Clients book what's bookable.

**2. Three tiers, not one.** An express (20 min), a signature (45 min), an intensive (60 to 75, with the camera and a full consultation). People don't buy a thing, they buy a choice between things. The express exists to make the signature look reasonable.

**3. Price it against facials, not shampoos.** This is where almost everyone flinches. Your anchor is not your shampoo-and-style price, it's what the med spa two doors down charges for 45 minutes of someone touching a face. Look it up. Then stop apologizing.

**4. Never bundle it free to fill a slow week.** You will teach your entire book that it's a giveaway and you will never charge for it again. If you need to move slow inventory, discount something you've already commoditized. Not this.

## The four ways this goes wrong

**Rebranding a shampoo.** Calling your existing 8-minute wash a "scalp ritual" and charging $40. Clients aren't stupid. This burns the category in your salon permanently and you only get to do it once.

**Undertraining.** Scalp work is technique. Pressure, sequence, the actual anatomy under your fingers. A bad head spa is worse than no head spa, it's forty-five minutes of a client deciding this was a waste of money while she's trapped in your chair being reminded of it.

**Skipping the consult.** The whole service is diagnostic. If you're not looking, assessing, and telling her what you see, you're selling a massage. Which is fine, but it isn't this, and it doesn't rebook the same way.

**Ignoring your state board.** This is the boring one that gets people. Scope of practice around scalp treatments, exfoliation, and anything with a device varies enormously state to state, and "it's just a scalp thing" is not a defense. Ten minutes on your board's website before you build a menu, not after.

## The part nobody mentions

Something changes in the relationship when you start looking at scalps.

Right now, your consultation is about what she wants, length, tone, the photo on her phone. A scalp consult is about what she has. It's the first conversation in the appointment that isn't aspirational. And it opens a door that has been sitting closed in your salon for years: the clients who are quietly worried about their hair.

They're in your chair every eight weeks. They've been counting strands in the shower drain since February. They have not said a word to you about it, because bringing it up means saying it out loud, and saying it out loud makes it real. So instead they ask you for more layers, or a shorter cut, or they mention offhand that they think their part looks "weird lately" and change the subject before you can answer.

A scalp service gives that conversation a legitimate front door. She's not booking because she's scared. She's booking a treatment. And somewhere in minute twenty, with the camera on and your hands where they are, she tells you the real thing.

That's not a revenue line. That's the client who stays with you for eleven years.

## Who this isn't for

I'd be doing you a disservice if I pitched this as universal.

If your book is 80% quick-service and your average ticket is under $60, the frequency math doesn't rescue you, you need pricing work first, not a new menu. If you're in a market where the nearest wellness spend is forty minutes away, the anchor isn't there and you'll be educating a client base at your own expense. If you're already at capacity and turning people away, adding a labour-intensive 45-minute service to a full book is a burnout plan wearing a growth costume.

And it is labour. Your hands are already the first thing to go in this career. Adding thirty minutes of deep manual work per client is a real conversation to have with yourself before it's a real conversation to have with your accountant.

## The bottom line

The gap between 0.1% and 3.4% is not a mystery. It's not a trend piece. It's a demand signal that has been sitting in your own sales reports for three years, and it says the same thing every quarter: your clients want this, they're already paying for it, and they're paying someone else.

The equipment is bought. The clients are booked. The demand is documented.

The only thing missing is a line on your menu.

## Sources

- Kline Group, ["The Scalp Care Boom: Are Brands Unlocking Growth From The Root Up?"](https://klinegroup.com/beauty-and-wellbeing/professional-hair-care/the-scalp-care-boom-are-brands-unlocking-growth-from-the-root-up/)
- Salon Today, ["Why Head Spa Services Are the Scalp-Care Trend Every Salon Should Explore."](https://www.salontoday.com/articles/why-head-spa-services-are-the-scalp-care-trend-every-salon-should-explore)
- Forbes, ["The Japanese Head Spa And The $5 Trillion Wellness Opportunity."](https://www.forbes.com/sites/katehardcastle/2026/03/23/the-japanese-head-spa-and-the-5-trillion-wellness-opportunity/)`,
		metaTitle: "The Salon Scalp Service Gap: The Most Obvious Money on the Table in 2026",
		metaDescription: "Scalp products are 3.4% of salon retail but scalp services just 0.1% of salon time. A salon business coach breaks down the frequency math, the menu, and how to close the gap."
	},
	{
		id: 50,
		slug: "wet-vs-dry-cutting",
		tag: "Technique",
		title: "Your Hair Was Cut Wet. That's Why It Never Looks Like It Did In The Chair.",
		excerpt: "Wet hair stretches up to 50% of its own length. That means the version of your hair your stylist cut existed for about forty minutes and then never again. Here's what the good ones do instead.",
		author: "Tom Harley",
		date: "Jul 17, 2026",
		readTime: "7 min",
		image: "/image/wet-dry-cutting-wet.png",
		category: "Technique",
		section: "Trends",
		body: `You know the feeling. Saturday afternoon, you walk out of the salon and you'd genuinely consider paying double. It moves. It sits. The layers do the thing.

Wednesday you wash it yourself and a stranger's haircut shows up on your head.

You've probably filed this under stylists have magic hands and I don't, which is partly true and mostly not. Something more specific happened, and it happened before a single hair was cut.

Your hair was wet.

## What water actually does

Water breaks hydrogen bonds, the temporary bonds that hold your hair in its shape. Break them and hair becomes elastic and biddable. Dry it and they reset, and the hair springs back into whatever it actually is.

The numbers are bigger than most people expect. Healthy dry hair stretches roughly 20 to 30% before it returns. Wet hair can stretch 30 to 50% of its own length.

Read that again with a pair of scissors in your hand.

When your stylist combs a section straight down at the shampoo bowl and cuts a clean line across it, they are cutting a version of your hair that exists for about forty minutes and then never again. It's longer than your hair. It's straighter than your hair. It's heavier and flatter and better behaved than your hair.

Then it dries, the bonds reset, and it goes home as itself.

## The prediction problem

Here's what a good stylist is actually doing when they cut you wet: compensating. They know it'll lift. They know roughly how much. They're running a mental model of your hair's dry behaviour and cutting against it.

That's a real skill and the good ones are frighteningly accurate.

It is still a prediction. And the accuracy of the prediction collapses in three situations:

**Curl.** Obviously. But the part that isn't obvious: not all sections shrink at the same rate. Your crown and your nape have different curl patterns, different density, different porosity. Cut them all wet at the same tension and they dry to different lengths. That's the origin of about half the "one side is shorter than the other" conversations in this industry, and the other side wasn't shorter, it shrank more.

**Fine or thinning hair.** Wet hair clumps. It goes stringy and slick and reads as less than it is. A stylist looking at wet fine hair is looking at hair pretending to be thinner than it is, and hair that looks thin invites removal. This is the most expensive version of the mistake and I'll come back to it.

**Layers.** Anything internal, anything face-framing, anything designed to fall a particular way. Fall is a dry-hair property. You cannot see fall on wet hair, because wet hair doesn't fall, it hangs.

## Wet cutting isn't wrong

This is where the internet loses its mind and starts insisting every haircut should be dry, and that's not true either.

Wet cutting is genuinely, technically better for some things:

- **Precision lines.** Blunt bobs, one-length cuts, anything geometric. Wet hair holds tension and lies flat, and you cannot get a clean architectural line without that.
- **Sectioning and control.** Wet hair stays where you put it. Dry hair has opinions.
- **Removing bulk.** Fast, even, efficient. On thick straight hair it's simply the right tool.

The dogma isn't "wet bad." The dogma should be narrower and it should be this: a haircut that is only ever wet is a haircut nobody has actually looked at.

## What the good ones do

Ask around behind the chair and you'll find most experienced stylists have quietly landed in the same place: hybrid.

Wet to shape. Wet to remove bulk, establish the line, get the architecture in. Then blow it out. Then, and this is the part that separates a good haircut from a great one, pick the scissors back up and finish it dry.

Dry finishing is where the haircut becomes yours. It's where you see the actual fall, the actual curl pattern, the actual true length. It's where face-framing gets refined against a face instead of against a wet rope. It's where split ends get taken out, because you genuinely cannot see them wet.

Ten to fifteen extra minutes. That's the entire difference.

![Dry, the hair finally shows its true fall, curl pattern, and length, the version you actually wear home.|full](/image/wet-dry-cutting-dry.png)

## So why doesn't everyone?

Time. That's the honest answer and it isn't a moral failing.

Salons book in blocks. A cut is 45 minutes because the column says 45 minutes. Dry finishing adds 10 to 15, which across seven clients is a client and a half of lost revenue, every single day. The stylist isn't being lazy. They're being scheduled.

Which means this is quietly a pricing conversation dressed as a technique conversation, and if you've ever wondered what you're paying for at a higher price point, a meaningful chunk of it is somebody having the time to look at your hair dry before you leave.

## The fine-hair thing, specifically

I said I'd come back to it.

If your hair has been getting finer, and if you're a woman over forty, there's a decent chance it has, wet cutting stops being a preference and starts being a risk.

Wet fine hair looks sparse. It clumps into strands, shows scalp, reads as thin. And the instinct, looking at that, is to reduce: take weight out, thin the ends, blend it away. Then it dries, and it turns out you had more than the wet version suggested, and now you have less.

The other half of it is that thinning hair is often fine at the ends and denser at the root, new growth, shorter regrowth, different textures at different lengths. Wet, that's invisible. It all combs down into one obedient sheet. Dry, it's the whole picture, and it's the picture that determines whether your haircut makes your density look better or worse.

A stylist who looks at your hair dry is a stylist who can see what's actually happening on your head. That matters well beyond the haircut.

## What to ask for

You don't need to know any of this to use it. Three things:

1. **"Can you finish it dry?"** That's it. That's the whole ask. Most stylists will say yes and quite a few will be pleased you asked.
2. **Come in with your hair how you wear it.** Not freshly washed and scraped into a bun. Not slicked back. Day-two, styled the way it lives. Your stylist can't cut for your real hair if they never meet it.
3. **Don't leave without seeing it dry.** Not "dried." Dry, and styled the way you'd style it. If something's off, the fix is thirty seconds while you're still in the chair and a whole new appointment once you're not.

## The bottom line

Your haircut didn't change between Saturday and Wednesday. You just finally saw it.

Somewhere in that appointment your hair was longer, straighter, flatter and more cooperative than it has ever been in its life, and that's the version that got cut. Everything after was the correction.

Ask to be cut as you are. Dry, difficult, and actually yours.`,
		metaTitle: "Wet vs. Dry Haircut: Why Your Cut Never Looks the Same at Home",
		metaDescription: "Wet hair stretches up to 50%, so a wet cut is made on a version of your hair that lasts forty minutes. A technique editor explains dry finishing and what to ask your stylist for."
	},
	{
		id: 51,
		slug: "are-straight-perms-bad-for-hair",
		tag: "Technique",
		title: "Are Straight Perms Bad for Your Hair? Experts Explain.",
		excerpt: "A straight perm can trade your daily flat iron for smooth, low-maintenance hair, but it's a chemical service, not a shortcut. Here's what actually determines whether it helps your hair or harms it.",
		author: "Renata Voss",
		date: "Jul 30, 2026",
		readTime: "6 min",
		image: "/image/straight-perm-before-after.png",
		category: "Technique",
		section: "Trends",
		body: `Straight, sleek hair has remained a timeless look, and for many people, a straight perm offers a way to achieve it without reaching for a flat iron every morning. But if you've spent any time researching the treatment, you've probably come across one recurring question: are straight perms bad for your hair?

The short answer? Not necessarily, but they aren't risk-free either. Like any chemical hair service, the results largely depend on your hair's current condition, the products used, your stylist's expertise, and how well you care for your hair afterward.

Here's what you should know before booking your appointment.

![A professionally performed straight perm can take hair from wavy and frizz-prone to smooth and sleek, the results depend on the hair's starting condition.|full](/image/straight-perm-before-after.png)

## What Is a Straight Perm?

Despite the name, a straight perm is essentially the opposite of a traditional curling perm. Instead of creating curls, the treatment uses chemical solutions to break down the hair's natural bonds before restructuring them into a straighter shape.

This process permanently alters the treated hair, meaning it won't return to its previous texture. Only new hair growth will retain your natural pattern, so touch-ups are typically needed every few months if you want to maintain consistently straight hair.

## Can Straight Perms Damage Hair?

Yes, but it's important to understand what "damage" actually means.

Chemical straightening works by changing the internal structure of the hair. Because the process intentionally breaks and reforms protein bonds, some degree of structural stress is unavoidable. However, that doesn't mean every straight perm leaves hair feeling dry, brittle, or unhealthy.

When performed on healthy hair by an experienced professional, many people achieve smooth, shiny results with minimal visible damage. Problems are more likely to occur when hair has already been weakened or when the service isn't performed correctly.

## Who Is Most at Risk?

Not every hair type responds to chemical straightening the same way.

Your hair may be more susceptible to damage if it is:

- Bleached or heavily lightened
- Extremely dry or brittle
- Severely heat damaged
- Frequently colored or chemically processed
- Already experiencing significant breakage

In these situations, your stylist may recommend waiting until your hair is healthier or suggest a different smoothing treatment instead.

![Hair that is already dry, brittle, or split at the ends is far more likely to react badly to chemical straightening.|full](/image/straight-perm-damage.png)

## Signs Your Hair May Not Be Ready

One of the most important parts of any straight perm appointment happens before the chemicals are even applied: the consultation.

A professional stylist will assess your hair's elasticity, strength, previous chemical history, and overall condition before determining whether you're a good candidate.

If your hair stretches excessively when wet, snaps easily, or feels rough from previous processing, postponing the service may be the healthiest choice.

![Frizzy, over-processed hair that stretches or snaps easily is a sign to wait, not to book.|full](/image/straight-perm-frizz.png)

## How to Keep Hair Healthy After a Straight Perm

Aftercare plays a major role in maintaining both the look and health of chemically straightened hair.

To help minimize dryness and breakage:

- Wait the amount of time recommended by your stylist before washing your hair.
- Use moisturizing, sulfate-free shampoos and conditioners.
- Incorporate a weekly deep conditioning treatment.
- Limit unnecessary heat styling whenever possible.
- Apply a heat protectant before blow drying or using hot tools.
- Schedule regular trims to remove dry or split ends.

Hydrated hair tends to remain smoother, shinier, and more manageable between appointments.

## Straight Perm vs. Daily Heat Styling

Many people assume a straight perm is automatically more damaging than using a flat iron every day, or vice versa. In reality, both approaches have trade-offs.

A straight perm involves a single intensive chemical process that permanently changes the treated hair. Daily heat styling doesn't alter the hair chemically, but repeated exposure to high temperatures can gradually weaken the cuticle, increase dryness, and lead to breakage over time.

For someone who relies on a flat iron every morning, a professionally performed straight perm may actually reduce overall heat exposure. On the other hand, someone with healthy natural texture who only occasionally straightens their hair may not benefit from permanent chemical processing.

## Is a Straight Perm Worth It?

If your goal is smoother, lower-maintenance hair, a straight perm can be an excellent option, provided your hair is healthy enough for the treatment.

Before making a decision, ask yourself:

- Is my hair currently healthy?
- Am I willing to invest in proper aftercare?
- Have I chosen an experienced stylist?

Answering "yes" to these questions can help improve your chances of achieving beautiful, long-lasting results.

## The Bottom Line

Straight perms aren't inherently "bad" for your hair, but they are a chemical service that requires careful consideration. Healthy hair, an experienced stylist, and a consistent aftercare routine all play a role in minimizing damage and maximizing results.

If you're unsure whether a straight perm is right for you, schedule a consultation first. A professional assessment can help determine whether your hair is ready, or whether another smoothing treatment would be a better fit.`,
		metaTitle: "Are Straight Perms Bad for Your Hair? What Experts Want You to Know",
		metaDescription: "Straight perms aren't automatically damaging, but they're a chemical service. A stylist explains who's at risk, the signs your hair isn't ready, and how to protect it afterward."
	},
	{
		id: 52,
		slug: "fall-2026-hair-color-trends",
		tag: "Color",
		title: "The Hair Colors Stylists Predict Will Dominate Fall 2026",
		excerpt: "Fall 2026 is taking a softer approach. Stylists are seeing clients move away from high-maintenance platinum and harsh contrast toward glossy, dimensional color that looks healthy, expensive, and effortlessly wearable.",
		author: "Leila Fernandez",
		date: "Jul 31, 2026",
		readTime: "8 min",
		image: "/image/fall-2026-colors-cover.png",
		category: "Color",
		section: "Trends",
		body: `As temperatures drop and wardrobes shift toward cozy knits, leather jackets, and rich textures, hair color follows suit. But if previous years were all about dramatic transformations, Fall 2026 is taking a softer approach.

Stylists are seeing clients move away from high-maintenance platinum blondes and ultra-contrasting highlights in favor of glossy, dimensional colors that look healthy, expensive, and effortlessly wearable. Think rich brunettes, warm blondes, sophisticated reds, and subtle tonal shifts that enhance natural beauty rather than completely changing it. Industry experts across major salons have consistently highlighted shine, depth, and personalized color as the defining themes for late 2026.

Whether your clients are ready for a dramatic seasonal refresh or simply want to elevate their current shade, these are the colors poised to dominate salon chairs this fall.

## Soft Copper Glow

Copper isn't disappearing, it's simply becoming more refined.

Instead of bright orange or vibrant cowboy copper, Fall 2026 favors softer, more lived-in copper shades with auburn and cinnamon undertones. These warmer hues complement autumn wardrobes while still feeling natural enough for everyday wear.

The beauty of soft copper lies in its versatility. It can be customized to lean more brunette, strawberry blonde, or auburn depending on skin tone and maintenance preferences.

Why clients love it:

- Adds warmth to the complexion
- Looks especially beautiful in natural light
- Creates incredible dimension without heavy highlighting

![Soft copper glow: lived-in auburn and cinnamon undertones that catch the light without tipping into bright orange.|full](/image/fall-2026-soft-copper-glow.png)

## Teddy Bear Bronde

Bronde continues to evolve.

Rather than cool ash blondes, Fall 2026 introduces what many stylists are calling "teddy bear bronde," a perfectly balanced blend of warm blonde and light brunette that feels cozy, soft, and luxurious.

The color features buttery ribbons of blonde woven into caramel and honey brown bases, creating movement without harsh contrast.

For blonde clients nervous about going darker, this is often the perfect transitional shade.

![Teddy bear bronde: buttery ribbons of blonde woven into caramel and honey brown, movement without harsh contrast.|full](/image/fall-2026-teddy-bear-bronde.png)

## Cherry Auburn

Red continues its momentum into late 2026, but with a richer twist.

Instead of vivid cherry reds, expect to see deep cherry auburn shades that combine mahogany, burgundy, and warm red pigments for a sophisticated finish.

The shade photographs beautifully under indoor lighting while maintaining vibrant dimension outdoors, making it especially popular for clients wanting something bold without feeling fashion-forward.

Growing interest in natural-looking reds has been one of the biggest color shifts this year.

![Cherry auburn blends mahogany, burgundy, and warm red for a shade that reads bold indoors and dimensional in daylight.|full](/image/fall-2026-cherry-auburn.png)

## Cinnamon Brown

Warm brunettes continue gaining popularity, and cinnamon brown may be one of the most requested shades this fall.

This medium brunette combines chocolate, chestnut, and subtle copper undertones that create movement without reading as red.

It's an ideal option for clients wanting warmth without making the full commitment to copper.

The result is soft, rich, and exceptionally flattering under both natural and indoor lighting.

![Cinnamon brown layers chocolate, chestnut, and a whisper of copper, warmth that never reads as red.|full](/image/fall-2026-cinnamon-brown.png)

## Gloss-Enhanced Natural Hair

Sometimes the biggest color trend isn't changing color at all.

Many stylists report clients requesting gloss services that simply enhance their natural shade rather than covering it entirely. These treatments boost shine, deepen existing tones, reduce frizz, and give hair a healthier appearance without committing to permanent color.

As healthy hair becomes the ultimate luxury, gloss appointments are becoming one of the fastest-growing salon services.

## Why Fall 2026 Is All About Healthy Hair

The biggest takeaway isn't a single color, it's the overall direction of hair color.

Across salons, stylists are seeing demand shift toward shades that prioritize shine, softness, and natural dimension over dramatic contrast. Glossy brunettes, warm blondes, refined reds, and customized tones are replacing overly processed looks, reflecting a broader emphasis on hair that feels healthy, touchable, and effortlessly luxurious.

For salon professionals, that means focusing not only on color placement but also on treatments that maintain strength, hydration, and shine. Because in Fall 2026, the most beautiful hair color isn't just about the pigment, it's about how healthy the hair looks wearing it.`,
		metaTitle: "The Hair Colors Stylists Predict Will Dominate Fall 2026",
		metaDescription: "Soft copper, teddy bear bronde, cherry auburn, cinnamon brown, and gloss-enhanced natural hair. A senior color editor on the shades set to dominate salon chairs this fall."
	},
	{
		id: 53,
		slug: "gloss-or-full-color",
		tag: "Technique",
		title: "Gloss or Full Color? Here's How to Know Which Appointment You Actually Need",
		excerpt: "Not every color appointment needs to be a full color service. If your hair still looks good but feels dull, slightly brassy, or just flat, a gloss may be all you need, and it's faster, gentler, and cheaper than starting over.",
		author: "Michelle Torres",
		date: "Aug 3, 2026",
		readTime: "6 min",
		image: "/image/gloss-vs-full-color-cover.png",
		category: "Technique",
		section: "Trends",
		body: `Not every color appointment needs to be a full color service.

If your hair still looks good but feels a little dull, slightly brassy, or just lacks that fresh-from-the-salon shine, a gloss might be exactly what you need. In fact, many professional colorists recommend gloss appointments between major color services because they're faster, gentler, and often much more affordable than starting over with permanent color. Glosses enhance what you already have, they don't replace it.

## Here's Why

A full color service is designed to create a noticeable change. It deposits new pigment throughout your hair, covers gray, refreshes faded roots, or completely shifts your shade.

A gloss has a different job.

Most salon glosses are demi-permanent formulas that gently deposit sheer pigment while smoothing the hair cuticle. Instead of dramatically changing your color, they refine it, neutralizing unwanted tones, boosting richness, and creating that reflective, healthy-looking shine people often mistake for naturally perfect hair. They typically last around four to six weeks before gradually fading.

Think of it like polishing furniture.

The wood doesn't change, but it suddenly looks richer, smoother, and newer.

## Book a Gloss If...

### Your Color Has Lost Its Shine

Hair naturally becomes less reflective after weeks of washing, heat styling, sun exposure, and hard water.

If your color still looks accurate but feels flat or lifeless, a gloss can restore that glassy finish without altering your overall shade.

![Same shade, restored finish. A gloss brings back the reflectivity lost to washing, heat styling, and hard water.|full](/image/gloss-restored-shine.png)

### Your Blonde Is Looking Brassy

One of the most common reasons stylists recommend a gloss is to cancel unwanted yellow, orange, or gold tones.

Instead of recoloring your hair completely, a toner-style gloss can rebalance the shade while leaving your highlights intact.

![Before and after a toner-style gloss on blonde: yellow and gold tones neutralized, highlights left fully intact.|full](/image/gloss-brassy-blonde-toned.png)

### Your Brunette Looks Faded

Rich brunette shades slowly lose depth over time.

A brown gloss can make chocolate, espresso, or chestnut tones appear deeper and more dimensional again, without the commitment of another permanent color appointment.

![A brown gloss returns depth and dimension to faded chocolate and espresso tones, no permanent color required.|full](/image/gloss-brunette-depth.png)

### Your Red or Copper Has Lost Vibrancy

Red pigments fade faster than almost any other hair color.

Rather than applying permanent color every few weeks, many stylists refresh reds with a tinted gloss to revive brightness while minimizing unnecessary chemical processing.

### You're Between Highlight Appointments

If your highlights still look good but aren't as bright or blended as they were a month ago, a gloss is often the perfect maintenance appointment.

It refreshes the tone, softens harsh contrasts, and makes older highlights look newly done.

### You Want to Try a New Tone Without Committing

Curious about warmer brunette? Interested in trying cooler blonde?

A gloss lets you experiment with subtle tonal changes that gradually fade, making it an excellent option if you're unsure about making a permanent switch.

## Book Full Color If...

A gloss isn't the answer for every appointment.

You'll likely need a full color service if you want to:

- Go significantly lighter
- Go significantly darker
- Cover gray hair completely
- Change your hair color dramatically
- Color new root growth
- Correct uneven or patchy color

Unlike permanent color, glosses cannot dramatically lighten hair because they simply deposit tone rather than lifting existing pigment.

## Why Stylists Love Gloss Appointments

Many clients assume glosses are just an "extra" salon service.

In reality, they're one of the healthiest ways to maintain color.

Because most gloss formulas are ammonia-free or low in alkalinity, they help smooth the cuticle instead of aggressively opening it. That means hair often feels softer, shinier, and less frizzy immediately after the appointment.

It's also why many colorists recommend glosses between major color services, they help extend the life of your existing color while reducing how often you need more intensive chemical treatments.

## The Bottom Line

If you love your current color and simply wish it looked fresher, shinier, or more vibrant, book a gloss.

If you're looking for a dramatic transformation, root coverage, or a completely new shade, book a full color service instead.

Sometimes the healthiest hair isn't the result of coloring more, it's the result of coloring smarter.`,
		metaTitle: "Gloss or Full Color? How to Know Which Appointment You Need",
		metaDescription: "A gloss refines your color; full color changes it. A color educator breaks down exactly when to book each, and why stylists recommend glosses between major services."
	},
	{
		id: 54,
		slug: "bedtime-routine-ruining-hair",
		tag: "At-Home Tips",
		title: "Is Your Bedtime Routine Ruining Your Hair? The Sleep Habits Stylists Want You to Know",
		excerpt: "You spend money on shampoo, masks, oils, and salon treatments. But what happens to your hair during the eight hours you're asleep? A few small changes before bed can make your hair much happier by morning.",
		author: "Simone Ellery",
		date: "Aug 7, 2026",
		readTime: "7 min",
		image: "/image/bedtime-hair-routine-cover.png",
		category: "At-Home Tips",
		section: "Hair Care",
		body: `You spend money on shampoo, masks, oils, and salon treatments. But what happens to your hair during the eight hours you're asleep?

From sleeping on cotton pillowcases to going to bed with wet hair, some of your nighttime habits could be contributing to the frizz, tangles, and breakage you're trying to fix during the day.

The good news? You don't need to completely overhaul your routine. A few small changes before bed can make your hair much happier by morning.

## Your Pillowcase Might Matter More Than You Think

If you wake up with a tangled mess at the back of your head, your pillowcase could be part of the problem.

Traditional cotton pillowcases create more friction against the hair as you move around during the night. That repeated rubbing can contribute to tangling, frizz, and mechanical wear, especially if your hair is already dry, bleached, curly, or prone to breakage.

This is where silk pillowcases come in.

Silk has a naturally smooth surface, allowing your hair to glide across the pillow instead of catching against it. The result isn't magically healthier hair overnight, but reducing unnecessary friction can be a useful part of a hair-protection routine.

![Think of it as less tugging while you sleep.|full](/image/bedtime-hair-pillowcase-friction.png)

## Silk vs. Satin: Do You Really Need Silk?

Not necessarily.

Silk and satin are often talked about interchangeably, but they're not the same thing. Silk is a natural fiber, while satin describes a type of weave that can be made from different materials.

The important factor for your hair is the smooth surface.

A satin pillowcase can also reduce friction and may give you many of the same practical benefits as silk. If genuine silk is outside your budget, a smooth satin option can still be worth trying.

For anyone with fine, fragile, curly, textured, or chemically treated hair, reducing friction overnight may be especially helpful.

## What About Sleeping in a Bonnet?

If you really want to level up your nighttime hair routine, a silk or satin bonnet can be another option.

Unlike a pillowcase, which only changes the surface your hair rests against, a bonnet keeps your hair contained while you sleep. This can help reduce friction, tangling, and the amount of movement your hair experiences throughout the night.

Bonnets can be particularly useful for curly, coily, textured, or longer hair that tends to tangle or lose its shape overnight. Keeping your curls tucked away can also help preserve your hairstyle so you don't have to completely restyle it in the morning.

The material matters, too. Look for a bonnet with a smooth silk or satin interior rather than rough or absorbent fabrics that can create more friction or pull moisture from the hair.

And don't make it too tight. A bonnet should feel secure without putting pressure around your hairline or creating tension at the roots.

The goal isn't to trap your hair, it's to protect it.

If you don't like wearing a bonnet, a silk or satin pillowcase can still give your hair a smoother surface to move against. You can even use both for an extra layer of protection.

:::image-row
![A smooth satin bonnet keeps hair contained overnight](/image/bedtime-hair-silk-bonnet.png)
![Secure without pressure around the hairline or tension at the roots](/image/bedtime-hair-satin-bonnet-sleeping.webp)
:::

## The Biggest Bedtime Mistake? Going to Sleep With Wet Hair

We've all done it.

You take a late shower, tell yourself your hair will dry while you sleep, and wake up with a strange combination of flat roots, frizz, and hair pointing in approximately twelve different directions.

But the styling struggle isn't the only issue.

Hair is more fragile when it's wet, making it more susceptible to stretching and breaking. Tossing and turning against a pillow while your hair is still damp can add even more friction.

If you regularly shower at night, try giving your hair some time to dry before getting into bed. If you need to speed things up, a blow dryer on a low or cool setting is preferable to blasting your hair with high heat.

And if your hair is still damp? Avoid pulling it into a tight ponytail or bun. Wet hair is already vulnerable, and adding tension can make matters worse.

## Your Hairstyle Matters, Too

Sleeping with your hair completely loose isn't always the best option, particularly if you have long or highly textured hair that tangles easily.

But there's a difference between protecting your hair and putting it under tension.

A loose braid, low ponytail, or loose bun can help keep hair contained without creating excessive pulling at the roots. Choose a soft silk or satin scrunchie rather than a traditional elastic, which can snag or create a tight pressure point.

:::image-row
![A loose braid keeps length contained without pulling at the roots](/image/bedtime-hair-loose-braid.png)
![A low, loose ponytail tied well below the crown](/image/bedtime-hair-low-loose-pony.webp)
![A soft, low bun sits away from the hairline](/image/bedtime-hair-low-bun.png)
:::

The goal is simple: secure your hair without squeezing it.

![Silk and satin scrunchies hold hair without the snag or pressure point of a traditional elastic.|full](/image/bedtime-hair-silk-scrunchies.png)

## Don't Go to Bed With a Head Full of Product

Your nighttime routine doesn't have to involve ten different products.

If your hair needs extra moisture, applying a small amount of leave-in conditioner or a lightweight hair oil to the lengths and ends can help keep it feeling softer. But more isn't necessarily better.

Heavy layers of styling products can transfer onto your pillowcase and leave your hair feeling weighed down the next morning.

Instead, focus on where your hair actually needs help.

- **Dry ends?** Try a little leave-in conditioner or oil.
- **Frizz-prone lengths?** Smooth a small amount of serum through the ends.
- **Fine hair?** Keep heavier products away from the roots.

Your pillowcase should complement your routine, not become part of it.

## How Often Should You Wash Your Pillowcase?

Your pillowcase collects more than just your hair.

Oil, sweat, skincare products, hair products, and everyday buildup can all accumulate on the fabric over time. If you're using a silk pillowcase, that doesn't mean you can forget about washing it.

Follow the care instructions for your particular fabric, and keep it clean enough that you're not simply transferring yesterday's products back onto freshly washed hair.

This is especially important if you use leave-in products or oils before bed.

## The Ideal Nighttime Hair Routine Is Actually Pretty Simple

You don't need a complicated ritual to protect your hair while you sleep.

Try this:

1. **Let your hair dry.** Whenever possible, avoid going to bed with soaking-wet hair.
2. **Detangle gently.** Use a wide-tooth comb or appropriate brush and work through knots without aggressively pulling.
3. **Add moisture where needed.** Apply a small amount of leave-in conditioner, serum, or oil to dry lengths and ends.
4. **Keep your hairstyle loose.** A loose braid or ponytail can prevent tangling without putting unnecessary tension on the hair.
5. **Switch to silk or satin.** A smoother pillowcase can reduce the friction your hair experiences while you toss and turn.
6. **Keep your pillowcase clean.** Wash it regularly according to the manufacturer's instructions.

## So, Is a Silk Pillowcase Actually Worth It?

For some hair types, absolutely.

A silk pillowcase isn't going to repair split ends or reverse chemical damage. It also won't replace a good haircut, conditioner, heat protectant, or thoughtful styling routine.

What it can do is remove one small source of nightly friction.

And when you're spending roughly a third of your day asleep, those small things add up.

If your morning routine regularly starts with detangling, smoothing frizz, and trying to revive flattened hair, switching your pillowcase may be one of the easiest changes to test.

Because healthy hair care doesn't stop when you turn off the lights.`,
		metaTitle: "Is Your Bedtime Routine Ruining Your Hair? Sleep Habits to Know",
		metaDescription: "Cotton pillowcases, wet hair, and tight ponytails can undo your hair care routine overnight. A salon educator breaks down the sleep habits worth changing, and the ones that are hype."
	},
	{
		id: 39,
		slug: "best-thinning-hair-treatments-reviewed-by-pros",
		tag: "Hair Thinning",
		title: `Yes, These 5 Thinning-Hair Treatments Can Work — Reviewed by Hair Professionals`,
		excerpt: `A panel of 20 working hair professionals scored five thinning-hair treatments — plus one bonus scalp fix — on efficacy, evidence, styling fit, cost, tolerability, and what happens after you stop. Here is where each one actually ranked, and why.`,
		author: "Devika Rao",
		date: "Aug 12, 2026",
		readTime: "14 min",
		image: "/image/before-and-after.png",
		category: "Hair Thinning",
		section: "Hair Care",
		body: `Hair thinning often comes up in the salon chair before it comes up in a medical appointment. A client points to a wider part, a lighter ponytail, or more hair in the brush and asks a practical question: What can help without making the hair harder to live with?

A cut, color adjustment, root powder, or a new part can create immediate fullness. Those are styling tools, not treatments for the follicle. For this guide, our panel focused on options with human evidence, a plausible mechanism, or a useful role in supporting the scalp.

## The Scorecard

:::scorecard-table
| Rank | Option | Overall | Efficacy | Evidence | Styling Fit | Commitment | Cost | Tolerability | After Stopping |
|---|---|---|---|---|---|---|---|---|---|
| 1 | [RE:YOU Dual-Path Hair Revival Serum](https://getreyou.com/) | **4.8** | 4.8 | 4.5 | 5.0 | 4.7 | 2.6 | 4.5 | 3.2 |
| 2 | [Women's Rogaine Minoxidil Unscented Foam](https://www.rogaine.com/products/womens-rogaine-minoxidil-unscented-foam) | **4.4** | 4.7 | 5.0 | 3.2 | 3.0 | 4.8 | 3.0 | 1.0 |
| 3 | [CurrentBody Skin LED Hair Regrowth Device](https://www.currentbody.us/products/currentbody-skin-led-hair-regrowth-device) | **3.82** | 4.0 | 4.1 | 5.0 | 3.5 | 2.4 | 4.6 | 2.0 |
| 4 | [PRP](#4-best-in-office-option-prp) | **3.52** | 4.2 | 3.9 | 4.5 | 3.5 | 1.2 | 3.1 | 2.4 |
| 5 | [Microneedling](#5-best-as-an-add-on-microneedling) | **3.19** | 3.4 | 3.1 | 4.0 | 3.0 | 3.5 | 2.7 | 2.0 |
:::

Curious what these numbers actually measure? See [how we evaluated the treatments](#how-we-evaluated-the-treatments) below for the criteria behind each score.

## 1. Best Overall: RE:YOU Dual-Path Hair Revival Serum

:::review-box
image: '/image/reyou.jpg'
best-for: Someone who wants a non-prescription, drug-free topical with human clinical data and does not want treatment residue dictating how their hair looks that day.
rating: 4.8
pros:
- Strong combination of clinical data and styling compatibility
- Once-daily use with no oily finish
- Proprietary molecules developed around the follicle and its surrounding environment
- Direct 90-day comparison with minoxidil
- No reported initial shedding phase in the 90-day data
- Works with varied textures and color-treated routines
- Drug-free and hormone-free
- Clear application instructions and a realistic 30-second massage step
cons:
- The price makes consistency harder for budget-conscious users
- The technology is new, so independent and longer-term replication is still limited
- We would like to see the complete six-month results once available
cta-label: Check Price
cta-url: https://getreyou.com/products/dual-path-hair-revival-serum
:::


I expected the science to be the main reason RE:YOU ranked first. In practice, the texture mattered almost as much.

That may sound superficial in a hair-thinning review, but it is not. A treatment that makes the roots look oily, stiff, or wet creates a daily conflict. Someone may care deeply about future density and still skip tonight's application because they have a blowout, curls they do not want to disturb, or a meeting the next morning. The routine has to survive real life.

RE:YOU feels closer to a lightweight scalp-care serum than a traditional medicated solution. The directions call for one to two full droppers once daily on a clean, dry scalp, followed by about 30 seconds of massage. The formula is described as lightweight, non-sticky, and compatible with regular styling products.

### What Using It Actually Looks Like

The easiest method is to divide the scalp into several narrow partings instead of emptying a full dropper into one place. Put most of the product where thinning is visible, usually the part line, crown, temples, or hairline.

On fine hair, smaller drops across more sections reduce temporary wetness at the root. With dense curls, coils, braids, or protective styles, the priority is getting the dropper tip close to the exposed scalp rather than coating the hair.

"Clean scalp" does not have to mean freshly shampooed every day. On a non-wash day, the scalp should still be accessible and reasonably free of heavy oil, wax, or several layers of dry shampoo. The serum needs contact with the scalp. It does not need perfectly clean lengths.

Let the serum absorb before adding root spray, heat protectant, mousse, gel, or other styling products. I would not mix it into a styling product in the palm. RE:YOU belongs on the scalp, while most styling products belong on the hair fiber.

The formula has a light fragrance. Alcohol Denat. also appears high in the ingredient list. Neither point automatically makes the formula harsh, but both are worth knowing if the scalp is reactive.

The brand reports non-sensitizing results, testing across more than 24 human cell assays, and successful HRIPT skin compatibility testing. Even with reassuring testing, someone with eczema, psoriasis, active dermatitis, open skin, or a history of fragrance reactions should patch test and stop if persistent irritation develops.

### Why the Science Feels More Substantial Than a Typical Cosmetic Serum

Most cosmetic hair serums are built from familiar botanicals, peptides, or conditioning ingredients, then positioned around a broad scalp-health story.

RE:YOU contains botanicals too, but the differentiating technology is ==NOVOGRO™==, a proprietary group of small molecules developed specifically around hair-follicle biology. The current serum uses three NOVOGRO™ molecules.

- NOVOGRO™ 623 and 624 — designed to support dermal papilla cells, the cells that help direct follicle size, cycling, and growth activity.
- NOVOGRO™ 273 — designed around the environment surrounding the follicle and the signaling involved in oxygen, nutrients, and regenerative support.

That distinction is important. RE:YOU is not claiming that one general-purpose ingredient solves every cause of thinning. The formula was developed around two connected biological areas: activity inside the follicle and the environment needed to support it.

The technical manuscript describes AI-enabled screening across millions of compounds, followed by laboratory testing in primary human cells and a three-dimensional follicle organoid model. The molecular paper is company-authored and should be read as early mechanistic evidence, not independent long-term proof. Still, publishing the methods, assays, limitations, and competing interests is more reassuring than leaving the technology as a marketing name with no visible work behind it.

### The Clinical Data Is the Main Reason It Made the List

RE:YOU reports 90-day interim results from a randomized, double-blinded clinical study involving 190 women with visible thinning.

Participants used the product daily. The study compared RE:YOU directly with a minoxidil control rather than only with placebo. Evaluation included machine imaging, blinded expert grading, standardized comb testing, and participant-reported outcomes.

At 90 days, the brand reports:

- ==58%== decrease in hair loss
- ==19%== increase in hair density
- ==1.7×== greater improvement in the overall appearance of thinning than minoxidil
- ==90%== of participants saw thicker hair

These numbers do not all measure the same thing. Hair density was assessed objectively. Visible improvement involved blinded professional grading. Hair loss was evaluated through standardized comb testing. The 90% figure reflects participant experience.

Keeping those methods separate makes the data more believable, not less. A percentage based on machine imaging should not be presented as if it came from the same measurement as a participant survey.

### A Necessary Note About Gender

RE:YOU is designed and marketed for people of all genders experiencing thinning or increased shedding. It is also described as suitable across hair types.

The current human clinical trial, however, enrolled women with visible thinning. The brand says the trial included straight, wavy, curly, and coily hair and that results were consistent across those texture groups.

That means the product itself can be discussed in gender-neutral language, but the clinical claim should remain precise. The current trial did not directly establish identical performance in every gender or every form of hair loss.

### Safety, Pregnancy, and Breastfeeding

**Safety note:** RE:YOU is drug-free and hormone-free.

The brand states that it was formulated without ingredients known to be unsafe during pregnancy or breastfeeding. It still recommends that anyone who is pregnant or breastfeeding check with their OB/GYN before beginning a new product.

### What Happens If You Stop?

This is where RE:YOU has a more favorable story than minoxidil, but also less mature evidence.

The brand says that after someone reaches the result they want, usually after 6 to 12 months, they may reduce use to once weekly or every few days. It also states that reducing use is not associated with a withdrawal shedding phase.

That guidance is encouraging, but a formal published discontinuation study is not currently presented on the product page.

For that reason, we scored RE:YOU higher than minoxidil for "After Stopping," but not close to 5. The available information supports a lower-maintenance plan. It does not yet establish exactly what every user will retain after stopping completely.

### The Biggest Drawback Is Price

At the time of review, the 30-day subscription price was listed at $141, with a higher one-time purchase price. Since the clinical checkpoint is 90 days, this is a three-bottle decision, not an inexpensive one-month experiment.

The 90-day money-back guarantee reduces some risk, but users must follow the guarantee requirements and track their progress.

> I would take baseline photos before the first application. Use the same part, lighting, camera distance, and styling every time. Repeat the photos every 30 days.

Looking in the mirror every morning is a poor way to judge slow change. It is much easier to assess a part line or crown when the documentation is consistent.

### Why It Ranked First

RE:YOU is not the cheapest option. It also does not have minoxidil's decades of independent evidence.

It ranked first because it solves the problem that causes many hair routines to fail: the product is credible enough to take seriously and easy enough to keep using.

A strong treatment on paper is not useful when someone repeatedly skips it because it ruins the way their hair looks. RE:YOU delivered the best balance of clinical validation, daily usability, scalp-focused technology, and low styling disruption.

[See the RE:YOU clinical results →](https://getreyou.com/pages/science#clinical-trial)

## 2. Best Established Drug Option: Women's Rogaine Minoxidil Unscented Foam

:::review-box
image: '/image/rogaine.avif'
best-for: Someone who prioritizes the longest evidence history and accepts daily, long-term drug use.
rating: 4.4
pros:
- Strongest long-term evidence in this group
- Widely available and relatively inexpensive
- FDA-approved formulations
- Works for many people with pattern hair loss
cons:
- Initial shedding may occur
- Daily use is generally indefinite
- Irritation and unwanted facial hair are possible
- Some formulas interfere with styling
- Serious household risk for pets, especially cats
- Not appropriate during pregnancy or breastfeeding
cta-label: Check Price
cta-url: https://www.rogaine.com/products/womens-rogaine-minoxidil-unscented-foam
:::

Women's Rogaine Minoxidil Unscented Foam is a topical minoxidil product, and it is not prescription-only — it is sold over the counter as an FDA-approved formulation for pattern hair loss.

For female pattern hair loss specifically, the American Academy of Dermatology describes topical minoxidil as the most recommended treatment and notes that 2% and 5% products are approved.

Its strength is evidence. Its weakness is everything the user has to accept around that evidence.

Temporary increased shedding can occur during the first two to eight weeks. Scalp dryness, itching, scaling, redness, and unwanted hair on the forehead or face are also recognized issues. Results can take 6 to 12 months to judge, and continued daily use is required. When treatment stops, the benefit gradually disappears and shedding increases.

Texture depends on the format. Foam is usually easier around styling. Liquid solutions can leave fine roots looking damp or greasy, especially when too much lands on the hair instead of the scalp.

### The Pet-Safety Warning

**Warning:** The pet warning is not a minor footnote. Topical minoxidil can cause severe and potentially fatal poisoning in pets, especially cats. Transfer can happen through spills, hands, treated skin, pillows, bedding, or other residue.

> I once shared a home with a cat and chose not to use Women's Rogaine Minoxidil Unscented Foam because I did not trust myself to control every possible transfer point. That was a personal risk decision, but it is a reasonable one to discuss.

People who are pregnant, planning pregnancy, or breastfeeding should avoid topical minoxidil and discuss alternatives with a clinician.

## 3. Best Product-Free Routine: CurrentBody Skin LED Hair Regrowth Device

:::review-box
image: '/image/currentbody-led-red-light-hair-growth-helmet.webp'
best-for: Someone who would rather wear a device than put another product on the scalp.
rating: 3.82
pros:
- No residue and no effect on styling
- Non-invasive
- Evidence supports benefit for pattern hair loss
- Mild short-term side effects for most users
- Easy to combine with another treatment
cons:
- High upfront cost for reputable devices
- Device protocols vary
- Requires repeated sessions for months
- Ongoing use is usually needed
- Evidence is stronger for pattern hair loss than for other causes
cta-label: Check Price
cta-url: https://www.currentbody.us/products/currentbody-skin-led-hair-regrowth-device
:::

The CurrentBody Skin LED Hair Regrowth Device uses red light therapy, usually discussed as low-level light or laser therapy, which is appealing because it does not wet the roots, change the curl pattern, or compete with styling products. Put on the cap or helmet, complete the session, and remove it.

Session length varies by device. Some are designed around approximately 10-minute use, while others require 20 to 30 minutes several times a week. That difference matters. A device can have good technology and still be a bad purchase if its schedule does not fit the user's life.

A 2025 systematic review included 38 studies and 3,098 patients across several alopecia types. For androgenetic alopecia, low-level light therapy significantly improved hair density compared with placebo, although study protocols and results varied.

> One contributor noticed short, soft hairs around the front hairline after about a month of consistent use. That is a personal observation, not a promised timeline. Controlled trials generally assess results after several months, and continued use is usually needed to maintain them.

Eye protection and device quality matter. Choose a device with a clear regulatory status and a specific hair protocol rather than a generic red lamp marketed for every possible concern.

## 4. Best In-Office Option: PRP

:::review-box
image: '/image/prp.jpg'
best-for: Someone who prefers periodic appointments over daily application and can tolerate injections and cost.
rating: 3.52
pros:
- Human evidence supports improved density
- No daily topical routine
- Minimal interference with hair styling between visits
- Uses the patient's own blood product
- Can be combined with other approaches
cons:
- Expensive and usually not insured
- Pain, tenderness, swelling, and pinpoint bleeding can occur
- Protocol quality varies by clinic
- Multiple initial sessions and maintenance are common
- Not a one-time treatment
:::

PRP stands for platelet-rich plasma. A clinician draws blood, separates a platelet-rich portion in a centrifuge, and injects it into thinning areas of the scalp.

It is not a hair transplant and does not place new follicles into the scalp.

The procedure can hurt. Numbing helps, but multiple scalp injections are still multiple scalp injections.

Most protocols use an initial series, often one appointment a month for three months, followed by maintenance every three to six months.

The evidence is genuinely promising. A 2024 systematic review and meta-analysis focused on female hair loss included 21 studies and 628 participants and found improvements in hair density and thickness, with adverse effects generally mild and temporary.

Another 2024 meta-analysis found an increase in density but also highlighted high heterogeneity, low-quality evidence, and publication bias. Both points belong in the same conversation. PRP appears useful, but clinics do not all prepare or inject it the same way.

From a styling perspective, PRP is simple after the short recovery period. There is no daily residue. The tradeoff is price, discomfort, and the need to return for maintenance.

## 5. Best as an Add-On: Microneedling

:::review-box
image: '/image/microneedle.jpg'
best-for: Someone already using a proven treatment who wants to discuss an adjunct with a dermatologist.
rating: 3.19
pros:
- Plausible biological mechanism
- Combination studies show added benefit
- No permanent residue after recovery
- Can be relatively affordable
cons:
- Standalone evidence remains limited
- No FDA-cleared microneedling device for hair loss
- Infection, irritation, pigment change, and scarring are possible
- At-home technique is inconsistent
- It can increase topical penetration in ways that have not been fully studied
:::

Microneedling creates controlled micro-injuries with very small needles. The proposed benefit comes from the wound-healing response and, when paired with a topical, increased delivery through the scalp.

The mechanism is plausible. The evidence is also easy to overstate.

Most clinical studies do not test microneedling alone. They compare minoxidil plus microneedling with minoxidil alone.

Those studies suggest that needling can add benefit, but they do not prove that an at-home roller by itself performs like minoxidil, PRP, or a clinically tested serum. A review of microneedling for hair loss reached the same practical conclusion: monotherapy data is limited, while much of the research combines microneedling with minoxidil or PRP.

Professional treatment and a cheap home roller are not equivalent. Needle depth, sterility, pressure, frequency, and scalp condition all matter.

The FDA has not cleared any microneedling device for hair loss and has not cleared microneedling devices for use with another topical product.

I would not use it over active dandruff, dermatitis, infection, open skin, or an inflamed scalp. More injury is not automatically more stimulation.

## Bonus: Ketoconazole Shampoo for an Itchy, Flaky Scalp

:::review-box
image: '/image/Ketoconazole Shampoo.avif'
best-for: Someone managing thinning alongside dandruff, oiliness, itching, or seborrheic dermatitis.
pros:
- Treats dandruff and seborrheic dermatitis
- Easy to rotate into an existing wash routine
- Low-cost compared with procedures
- Most useful when scalp inflammation is part of the problem
cons:
- Not a primary standalone hair-growth treatment
- Can dry the scalp or lengths
- Hair-growth evidence is limited
- Best used for a specific scalp indication, not as a universal deep-cleaning shampoo
cta-label: Check Price
cta-url: https://nizoral.com/
:::

Ketoconazole shampoo is useful, but it does not belong in the top five as a primary thinning-hair treatment.

Its clearest job is treating dandruff and seborrheic dermatitis. Ketoconazole is antifungal, so it helps control the process behind flaking, scaling, and itching.

The 1% version is available over the counter in the United States, while 2% formulations may require a prescription depending on the product.

There is limited research suggesting a possible adjunct role in androgenetic alopecia, but the evidence is small and much less mature than the evidence for minoxidil.

I would recommend it most confidently when someone has thinning plus dandruff, oiliness, itching, or seborrheic dermatitis. Clearing an inflamed, uncomfortable scalp can make an existing routine easier to tolerate, even when the shampoo is not the main growth treatment.

It should not automatically replace regular shampoo at every wash.

For OTC Nizoral, the current label guidance is about twice weekly for eight weeks, then as needed for dandruff control. Follow the label or a dermatologist's plan, especially with prescription-strength ketoconazole. Dryness, altered texture, itching, or irritation can occur.

## Where We Would Start

1. For the strongest established medication evidence, choose Women's Rogaine Minoxidil Unscented Foam and go in knowing that consistency, side effects, pet safety, and long-term use are part of the decision.
2. For someone who wants a drug-free daily serum, cares about clinical data, and refuses to compromise the look of their hair while waiting for results, RE:YOU is the most balanced starting point in this review.
3. The CurrentBody Skin LED Hair Regrowth Device is the cleanest fit for a product-free routine.
4. PRP makes sense for someone comfortable with cost and injections.
5. Microneedling is more convincing as an add-on than as a replacement for a better-established option.
6. Ketoconazole belongs in the plan when dandruff or seborrheic dermatitis is present.

Whatever route you choose, document the starting point and give the routine enough time. Use the same lighting, part, camera distance, and styling in progress photos. Hair changes slowly, and memory is not a reliable measurement tool.

## How We Evaluated the Treatments

Over three months, 20 working hair professionals contributed to this review, including hairstylists, colorists, and texture specialists. Our panel works with straight, wavy, curly, and coily hair, as well as fine, medium, and coarse strands. We also considered highlighted, bleached, chemically processed, protective-styled, and frequently heat-styled hair.

For at-home options, we looked at application, residue, drying time, wash-day compatibility, and whether the routine was realistic to maintain. For PRP and professional microneedling, we did not pretend a salon panel could replace clinical research. Those scores reflect published evidence, treatment schedules, known risks, and the practical experiences clients commonly bring back to the chair.

Each option received a score from 0 to 5:

:::card-grid
title: Efficacy
How much meaningful improvement the evidence supports
---
title: Evidence
Study quality, sample size, controls, and maturity of the research
---
title: Styling Fit
Residue, greasiness, wash frequency, and compatibility with normal products
---
title: Commitment
A higher score means the routine is easier to maintain
---
title: Cost
A higher score means the option is more affordable
---
title: Tolerability
A higher score means fewer or milder common side effects
---
title: After Stopping
A higher score means less dependence on continuous treatment
:::

Every number in [the scorecard](#the-scorecard) above was built from these seven criteria, so a treatment's overall score is only as useful as the metric behind it you actually care about.

*This article reflects HairPro Voices panel experience and is not medical advice. Talk with a licensed clinician before starting, combining, or stopping any hair-loss treatment, and before use during pregnancy or breastfeeding.*`,
		metaTitle: `Yes, These 5 Thinning-Hair Treatments Can Work — Reviewed by Hair Professionals`,
		metaDescription: `A 20-stylist HairPro Voices panel scores RE:YOU, minoxidil, red light therapy, PRP, microneedling, and ketoconazole shampoo on efficacy, evidence, styling fit, cost, and more.`
	}
];
function getArticleBySlug(slug) {
	return articles.find((a) => a.slug === slug);
}
//#endregion
//#region src/components/Ticker.tsx
var tagLabel = {
	"Color": "COLOR",
	"Cut & Style": "STYLE",
	"Texture": "TEXTURE",
	"Tips": "TIPS",
	"Products": "PRODUCTS",
	"Technique": "TECHNIQUE",
	"Hair Thinning": "HAIR CARE",
	"At-Home Tips": "AT HOME",
	"Business": "BUSINESS"
};
var tickerArticles = articles.filter((a) => a.slug !== "copper-renaissance-2026");
var doubled = [...tickerArticles, ...tickerArticles];
function Ticker() {
	return /* @__PURE__ */ jsx("div", {
		className: "bg-gold-500 text-black overflow-hidden h-8 flex items-center",
		children: /* @__PURE__ */ jsx("div", {
			className: "flex gap-12 whitespace-nowrap ticker-scroll",
			style: { width: "max-content" },
			children: doubled.map((article, i) => /* @__PURE__ */ jsxs("a", {
				href: `/article/${article.slug}/`,
				className: "text-[10px] font-semibold tracking-widest uppercase hover:underline",
				children: [
					"✦ ",
					tagLabel[article.tag] ?? article.tag.toUpperCase(),
					": ",
					article.title
				]
			}, i))
		})
	});
}
//#endregion
//#region src/components/Hero.tsx
var HERO_IMAGE = "/image/mino-cover.avif";
var SIDE_IMAGE = "/image/change-hair-1.webp";
function Hero() {
	return /* @__PURE__ */ jsxs("section", {
		className: "bg-black",
		children: [/* @__PURE__ */ jsx("div", {
			className: "max-w-7xl mx-auto px-4 pt-6 pb-2",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ jsx("div", { className: "h-px bg-gold-500 w-8" }),
					/* @__PURE__ */ jsx("span", {
						className: "text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium",
						children: "June 2026 · Curated by Stylists"
					}),
					/* @__PURE__ */ jsx("div", { className: "h-px bg-gold-500 flex-1" })
				]
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "max-w-7xl mx-auto px-4 pb-12",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 mt-6",
				children: [/* @__PURE__ */ jsx(Link, {
					to: "/article/novogro-vs-minoxidil/",
					className: "lg:col-span-8 relative group cursor-pointer img-zoom block",
					children: /* @__PURE__ */ jsxs("div", {
						className: "relative overflow-hidden aspect-[16/10] lg:aspect-[4/3]",
						children: [
							/* @__PURE__ */ jsx("img", {
								src: HERO_IMAGE,
								alt: "Editorial hair feature",
								className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
							}),
							/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" }),
							/* @__PURE__ */ jsx("div", {
								className: "absolute top-4 left-4",
								children: /* @__PURE__ */ jsx("span", {
									className: "bg-gold-500 text-black text-[9px] font-bold tracking-[0.25em] uppercase px-3 py-1",
									children: "Cover Story"
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "absolute bottom-0 left-0 right-0 p-6 lg:p-10",
								children: [
									/* @__PURE__ */ jsxs("h1", {
										className: "text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3",
										style: { fontFamily: "'Playfair Display', serif" },
										children: ["Is NOVOGRO™ the Industry's Best Kept Secret?", /* @__PURE__ */ jsx("br", {})]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-charcoal-300 text-sm md:text-base max-w-xl leading-relaxed mb-6 hidden md:block",
										children: "For years, minoxidil has been the established benchmark in hair-loss topicals. One name landed in our stylist circle this week: NOVOGRO™ (NV), a fresh class of ingredients designed to tackle multiple drivers of hair thinning at once."
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-4",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1.5 bg-gold-500 text-black text-[10px] font-bold tracking-widest uppercase px-3 py-2 group-hover:bg-gold-400 transition-colors",
											children: ["Read Review ", /* @__PURE__ */ jsx(ArrowRight, { size: 10 })]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "text-[10px] tracking-widest uppercase text-charcoal-400",
													children: "Hair Care"
												}),
												/* @__PURE__ */ jsx("span", {
													className: "text-charcoal-600",
													children: "·"
												}),
												/* @__PURE__ */ jsx("span", {
													className: "text-[10px] text-charcoal-400",
													children: "Jun 13, 2026"
												})
											]
										})]
									})
								]
							})
						]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-4 flex flex-col gap-0 border-l border-white/5",
					children: [/* @__PURE__ */ jsx(Link, {
						to: "/article/what-your-hair-says-about-you-sex-and-the-city/",
						className: "group cursor-pointer img-zoom block",
						children: /* @__PURE__ */ jsxs("div", {
							className: "relative overflow-hidden aspect-[16/9] lg:aspect-auto lg:h-[260px]",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: SIDE_IMAGE,
									alt: "Secondary feature",
									className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
								}),
								/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" }),
								/* @__PURE__ */ jsxs("div", {
									className: "absolute bottom-0 left-0 right-0 p-5",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-[9px] tracking-widest uppercase text-gold-500 font-medium",
										children: "Cut & Style"
									}), /* @__PURE__ */ jsxs("h2", {
										className: "text-white text-xl font-bold leading-snug mt-1",
										style: { fontFamily: "'Playfair Display', serif" },
										children: ["Your Hair Is Already Talking. ", /* @__PURE__ */ jsx("em", { children: "Are You Listening?" })]
									})]
								})
							]
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "flex flex-col divide-y divide-white/5 mt-4 lg:mt-0 lg:border-t border-white/5",
						children: [
							{
								tag: "Cut & Style",
								title: "10 Best Hair Looks at the 2026 Met Gala",
								author: "Vera Moss",
								readTime: "8 min",
								slug: "2026-met-gala-best-hair-looks"
							},
							{
								tag: "Cut & Style",
								title: "Mother's Day Special Edition: 6 Effortless Hairstyles Stylists Are Loving",
								author: "Nora Bell",
								readTime: "5 min",
								slug: "mothers-day-effortless-hairstyles"
							},
							{
								tag: "Hair Care",
								title: "Your Fine, Frizzy Hair Might Actually Be Wavy",
								author: "Priya Nair",
								readTime: "10 min",
								slug: "fine-frizzy-wavy-hair"
							}
						].map((article) => /* @__PURE__ */ jsxs(Link, {
							to: `/article/${article.slug}/`,
							className: "flex flex-col gap-1.5 p-4 lg:px-4 hover:bg-white/[0.03] transition-colors group",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-[9px] tracking-widest uppercase text-gold-500 font-medium",
									children: article.tag
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "text-sm font-semibold text-charcoal-200 group-hover:text-white transition-colors leading-snug",
									style: { fontFamily: "'Playfair Display', serif" },
									children: article.title
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 text-[10px] text-charcoal-500",
									children: [
										/* @__PURE__ */ jsx("span", { children: article.author }),
										/* @__PURE__ */ jsx("span", { children: "·" }),
										/* @__PURE__ */ jsxs("span", { children: [article.readTime, " read"] })
									]
								})
							]
						}, article.title))
					})]
				})]
			})
		})]
	});
}
//#endregion
//#region src/components/FeaturedGrid.tsx
var articles$1 = [
	{
		id: 35,
		tag: "Hair Thinning",
		title: `Finasteride vs. NOVOGRO™: Why Women Shouldn't Borrow Men's Hair-Loss Drugs`,
		excerpt: `Finasteride is still a serious medical option, but its side-effect profile and off-label use in women deserve a more careful conversation. A stylist's case for why female thinning needs its own solution like NOVOGRO™, not another "just try this."`,
		author: "Lauren Chavez",
		date: "Jun 18, 2026",
		readTime: "9 min",
		image: "/image/finasteride-novogro-cover.jpg",
		featured: true,
		slug: "finasteride-vs-novogro-women-hair-loss"
	},
	{
		id: 30,
		tag: "Cut & Style",
		title: "Find the Bangs That Actually Suit You",
		excerpt: "Bangs can change your whole look faster than a new color. The 2026 guide to fringe trends, face shapes, and exactly what to ask your stylist.",
		author: "Yuna Seo",
		date: "May 31, 2026",
		readTime: "10 min",
		image: "/image/bang-cover.webp",
		featured: false,
		slug: "bangs-guide-2026"
	},
	{
		id: 31,
		tag: "Hair Thinning",
		title: "What Stylists Should Know About Female Hair Loss",
		excerpt: "Clients describe hair loss by what they notice first. As hair professionals, we need to read the pattern. A practical guide to the layers behind female hair loss and how to have better conversations about it.",
		author: "Lauren Chavez",
		date: "Jun 1, 2026",
		readTime: "8 min",
		image: "/image/thinning.png",
		featured: false,
		slug: "female-hair-loss-stylist-guide"
	},
	{
		id: 32,
		tag: "Cut & Style",
		title: "Game, Set, Hair",
		excerpt: "Clay-court season has a very specific beauty mood. From bubble ponytails to ribbon braids and boxer braids, these are the tennis-inspired sport hairstyles to wear now and into U.S. Open season.",
		author: "Nora Bell",
		date: "Jun 4, 2026",
		readTime: "8 min",
		image: "https://images.unsplash.com/photo-1548920168-70d61248a912?fm=jpg&q=80&w=1600&auto=format&fit=crop",
		featured: false,
		slug: "french-open-tennis-hairstyles"
	},
	{
		id: 33,
		tag: "Style & Culture",
		title: "Your Hair Is Already Talking. Are You Listening?",
		excerpt: "From Nicole Kidman's iconic curls to the four women of Sex and the City — why a haircut says more about who you are than almost anything else.",
		author: "Nora Bell",
		date: "Jun 7, 2026",
		readTime: "10 min",
		image: "/image/change-hair-1.webp",
		featured: false,
		slug: "what-your-hair-says-about-you-sex-and-the-city"
	}
];
function ArticleCard({ article, size = "normal" }) {
	return /* @__PURE__ */ jsxs(Link, {
		to: `/article/${article.slug}/`,
		className: "group flex flex-col cursor-pointer card-hover",
		children: [/* @__PURE__ */ jsxs("div", {
			className: `img-zoom overflow-hidden ${size === "large" ? "aspect-[4/3]" : "aspect-[3/2]"} relative`,
			children: [/* @__PURE__ */ jsx("img", {
				src: article.image,
				alt: article.title,
				className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
			}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" })]
		}), /* @__PURE__ */ jsxs("div", {
			className: "pt-4 flex flex-col gap-2",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "text-[9px] tracking-[0.25em] uppercase text-gold-500 font-semibold",
					children: article.tag
				}),
				/* @__PURE__ */ jsx("h3", {
					className: `font-bold leading-snug text-charcoal-100 group-hover:text-white transition-colors ${size === "large" ? "text-2xl md:text-3xl" : "text-lg"}`,
					style: { fontFamily: "'Playfair Display', serif" },
					children: article.title
				}),
				size === "large" && /* @__PURE__ */ jsx("p", {
					className: "text-sm text-charcoal-400 leading-relaxed line-clamp-2",
					children: article.excerpt
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between mt-1",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 text-[10px] text-charcoal-500",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "font-medium text-charcoal-400",
								children: article.author
							}),
							/* @__PURE__ */ jsx("span", { children: "·" }),
							/* @__PURE__ */ jsxs("span", { children: [article.readTime, " read"] })
						]
					}), /* @__PURE__ */ jsx(ArrowRight, {
						size: 14,
						className: "text-charcoal-600 group-hover:text-gold-500 group-hover:translate-x-1 transition-all"
					})]
				})
			]
		})]
	});
}
function FeaturedGrid() {
	const [featured, ...rest] = articles$1;
	return /* @__PURE__ */ jsx("section", {
		className: "bg-charcoal-950 py-16 lg:py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between mb-10",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ jsx("div", { className: "w-8 h-0.5 bg-gold-500" }), /* @__PURE__ */ jsx("h2", {
						className: "text-lg md:text-xl font-bold tracking-widest uppercase text-white",
						style: { fontFamily: "'Playfair Display', serif" },
						children: "Latest Stories"
					})]
				}), /* @__PURE__ */ jsxs("a", {
					href: "/articles/",
					className: "hidden md:flex items-center gap-2 text-[11px] tracking-widest uppercase text-charcoal-400 hover:text-gold-500 transition-colors",
					children: ["All Articles ", /* @__PURE__ */ jsx(ArrowRight, { size: 12 })]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "lg:col-span-5",
						children: /* @__PURE__ */ jsx(ArticleCard, {
							article: featured,
							size: "large"
						})
					}),
					/* @__PURE__ */ jsx("div", { className: "hidden lg:block lg:col-span-1 border-l border-white/5" }),
					/* @__PURE__ */ jsx("div", {
						className: "lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8",
						children: rest.map((article) => /* @__PURE__ */ jsx(ArticleCard, { article }, article.id))
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/data/looks.ts
var looks = [
	{
		id: 1,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/b7/38/c9/68/ae/v1_E10/E103ZHL3.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=de8b86bb978fbeade4eff880b7d635cd4fa72055f5dc6f934b2ec5517686e205",
		title: "Caramel Balayage",
		stylist: "@hairbylucia",
		category: "Color",
		likes: 2847
	},
	{
		id: 2,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/61/a3/7c/c5/c2/v1_E11/E117PKJM.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=8b0830802c80b8cba5e98bc95454a6334a4b6d7b50586efd2c08b594ea4f8962",
		title: "Glass Hair",
		stylist: "@smoothbytomasz",
		category: "Cut",
		likes: 3201
	},
	{
		id: 3,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/b8/70/83/45/30/v1_E11/E117QTBN.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=90c9ce1bcb36c3b28bb9bb990dcb182919e6e9e41570ae3f369c5632515f8337",
		title: "Vivid Coral Melt",
		stylist: "@vividsbyimani",
		category: "Color",
		likes: 4512
	},
	{
		id: 4,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/fc/2f/88/5c/19/v1_E10/E104MFU7.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=c39ec640de77e4653962b20de0a2e1cf4ff988c16e8fc002a521094c8e2c367b",
		title: "Natural Curl Set",
		stylist: "@curlsbynadia",
		category: "Styling",
		likes: 1988
	},
	{
		id: 5,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/7a/0b/23/e4/bb/v1_E10/E101NKNV.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=1f8f01aa90eb0070c3692ae15baab9ce5872e46abbe9ddaeeb43751827444218",
		title: "Shadow Root Blonde",
		stylist: "@rootsbysophia",
		category: "Color",
		likes: 3765
	},
	{
		id: 6,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/45/b9/da/7d/7e/v1_E10/E109XHQP.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=498ed0538a64127ad4d8878808a9f8c0889b9d00f06ddb0ab90f931bbc9921ca",
		title: "Bob with Texture",
		stylist: "@precision.alex",
		category: "Cut",
		likes: 2100
	},
	{
		id: 7,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/31/31/67/c7/d1/v1_E10/E105INWD.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=3fefda14e215cf3e88aeee5422dcca73540d7cdd9e3451160c35c7afb2c44218",
		title: "Curl Consultation Look",
		stylist: "@curlsbynadia",
		category: "Styling",
		likes: 2340
	},
	{
		id: 8,
		src: "https://images.unsplash.com/photo-1554519515-242161756769?w=800&q=80&auto=format&fit=crop",
		title: "Balayage Dimension",
		stylist: "@hairbylucia",
		category: "Color",
		likes: 1876
	},
	{
		id: 9,
		src: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80&auto=format&fit=crop",
		title: "Vivid Fantasy",
		stylist: "@vividsbyimani",
		category: "Color",
		likes: 5102
	},
	{
		id: 10,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/10/84/bd/c4/75/v1_E10/E104GYRQ.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=0e4e94c28de4c65bc42a6bb6f56d2007175ce763bd1f8684eecb898807d3f3d8",
		title: "Precision Bob",
		stylist: "@precision.alex",
		category: "Cut",
		likes: 2654
	},
	{
		id: 11,
		src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80&auto=format&fit=crop",
		title: "Brunette Gloss",
		stylist: "@rootsbysophia",
		category: "Color",
		likes: 3120
	},
	{
		id: 12,
		src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80&auto=format&fit=crop",
		title: "Textured Layers",
		stylist: "@smoothbytomasz",
		category: "Styling",
		likes: 1450
	},
	{
		id: 13,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/88/17/21/b9/54/v1_E10/E1089JNL.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=cea456455124d52a9475a81dc2afd822cfe0da6b86d5749999b3ebbb8bfd2dd0",
		title: "Pink Curly",
		stylist: "@hairbylucia",
		category: "Color",
		likes: 3890
	},
	{
		id: 14,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/ee/14/d0/dd/60/v1_E10/E10HFA3N.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=24ddf2603827bc7d0604788483a77aeebeeb723fb3c7eaf1da02222ed1dc391b",
		title: "Lived-In Blonde",
		stylist: "@rootsbysophia",
		category: "Color",
		likes: 2670
	},
	{
		id: 15,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/32/7e/5c/06/de/v1_E10/E108YPGU.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=a9f56975143b11e15b68a6c1e1d12d220a5ab0b1e8cf44baf1f100ac93a5d463",
		title: "Rainbow Color",
		stylist: "@precision.alex",
		category: "Color",
		likes: 1920
	},
	{
		id: 16,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/30/36/9b/82/68/v1_E10/E107O6Z5.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=d4f8b35152d574ea289cababfddf000f7607d1813dff75dc1d86dbf2f46f2121",
		title: "Flowing Red Hair",
		stylist: "@smoothbytomasz",
		category: "Color",
		likes: 1340
	},
	{
		id: 17,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/e9/25/d7/d4/b7/v1_E10/E10216T6.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=ef3eea7c96f26ca7e22aa4c4c8974ac209fccf1241fa29d986e7bfec468f186e",
		title: "Brunette Gloss",
		stylist: "@rootsbysophia",
		category: "Color",
		likes: 3120
	},
	{
		id: 18,
		src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80&auto=format&fit=crop",
		title: "Defined Curls",
		stylist: "@curlsbynadia",
		category: "Styling",
		likes: 2890
	},
	{
		id: 19,
		src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80&auto=format&fit=crop",
		title: "Honey Highlights",
		stylist: "@hairbylucia",
		category: "Color",
		likes: 2210
	},
	{
		id: 20,
		src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80&auto=format&fit=crop",
		title: "Pastel Fade",
		stylist: "@vividsbyimani",
		category: "Color",
		likes: 4780
	},
	{
		id: 21,
		src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&auto=format&fit=crop",
		title: "Soft Waves",
		stylist: "@rootsbysophia",
		category: "Styling",
		likes: 1650
	},
	{
		id: 22,
		src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80&auto=format&fit=crop",
		title: "Teeny Weeny Afro",
		stylist: "@curlsbynadia",
		category: "Styling",
		likes: 3340
	},
	{
		id: 23,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/4a/41/35/2f/77/v1_E10/E105PZEO.jpeg?w=1600&cf_fit=scale-down&q=85&format=auto&s=899d46aca29ba638c1525102f804e8fde8e410498b7569141d53865553328ef6",
		title: "Men's Texture Cut",
		stylist: "@precision.alex",
		category: "Cut",
		likes: 1780
	},
	{
		id: 24,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/38/3f/e6/3c/53/v1_E10/E10HOMA5.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=f5ea4f3f4d677728147fe05e0a05e02a3fdf6a90fdd9813c62fa0e47ef3c5cc2",
		title: "Vivid Blue Roots",
		stylist: "@vividsbyimani",
		category: "Color",
		likes: 5230
	},
	{
		id: 25,
		src: "/image/Dark-to-Blonde.jpeg",
		title: "Dark to Blonde",
		stylist: "@hairbylucia",
		category: "Transformations",
		likes: 6120
	},
	{
		id: 26,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/44/71/75/24/94/v1_E11/E117R8B7.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=813bb9abc5f873ec439cb5329912fc2ddd193e800b920a999c0af7e087b64b5e",
		title: "Red Queen",
		stylist: "@rootsbysophia",
		category: "Transformations",
		likes: 4340
	},
	{
		id: 27,
		src: "/image/straight-to-curly.avif",
		title: "Straight to Curly",
		stylist: "@curlsbynadia",
		category: "Transformations",
		likes: 7890
	},
	{
		id: 28,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/9e/66/67/d6/3c/v1_E10/E106BGNC.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=81c150b8ad47635a1764229986024afd6658f42b0df76c19f4cfabebfdd4c767",
		title: "Orange Transformation",
		stylist: "@hairbylucia",
		category: "Transformations",
		likes: 5670
	},
	{
		id: 29,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/94/69/ca/40/56/v1_E10/E1017QDH.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=1a7d49f4b655a1c1b618362935cd90c462c07e8cf83781b45131a42bc47105a7",
		title: "Long Auburn Hair Styling",
		stylist: "@esindeniz",
		category: "Styling",
		likes: 220
	},
	{
		id: 30,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/14/68/32/83/4e/v1_E10/E10GLXS2.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=2a5e73befdb9c7706599231f59fb75dae7ee6fcc79fed5da2e2fac0972723e07",
		title: "Bob Cut",
		stylist: "@precision.alex",
		category: "Cut",
		likes: 2430
	},
	{
		id: 31,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/55/4a/be/9d/51/v1_E10/E109XGVQ.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=1697373643bfbbc6841c2424f36dff67efd2111dde1e02d78f661956de605aad",
		title: "Bleached Buzz Cut",
		stylist: "@vividsbyimani",
		category: "Cut",
		likes: 3870
	},
	{
		id: 32,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/da/00/74/a9/d8/v1_E10/E108BSKF.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=0171136284f19544cb1334b817003909f44ea56a9a6e680422143095ef0282e5",
		title: "Long Side-swept Bangs",
		stylist: "@rootsbysophia",
		category: "Cut",
		likes: 1960
	},
	{
		id: 33,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/de/f0/1d/60/59/v1_E11/E113VFZM.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=6dc818bfebff7bf7b292d9fec0419dbea72e3b83ff734b1934b10e0f7cc8d931",
		title: "Subtle but Beautiful",
		stylist: "@hairbylucia",
		category: "Transformations",
		likes: 4120
	},
	{
		id: 34,
		src: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/aa/ea/9c/37/14/v1_E10/E108YQLB.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=565377dbef7f88f773792960f8e9085323d5280a0309bc188180dd0909b3782a",
		title: "Root Transformation",
		stylist: "@rootsbysophia",
		category: "Transformations",
		likes: 3550
	},
	{
		id: 35,
		src: "/image/cover.webp",
		title: "2026 Met Gala Hair",
		stylist: "Met Gala",
		category: "Styling",
		likes: 4810
	},
	{
		id: 36,
		src: "/image/lisa.png",
		title: "2026 Met Gala Hair",
		stylist: "Met Gala",
		category: "Styling",
		likes: 14810
	},
	{
		id: 37,
		src: "/image/Nicole Kidman.jpg",
		title: "2026 Met Gala Hair",
		stylist: "Met Gala",
		category: "Styling",
		likes: 42810
	},
	{
		id: 38,
		src: "/image/Rihanna.jpg",
		title: "2026 Met Gala Hair",
		stylist: "Met Gala",
		category: "Styling",
		likes: 81302
	},
	{
		id: 39,
		src: "/image/Sabrina Carpenter.avif",
		title: "2026 Met Gala Hair",
		stylist: "Met Gala",
		category: "Styling",
		likes: 42342
	},
	{
		id: 40,
		src: "/image/Troye Sivan.png",
		title: "2026 Met Gala Hair",
		stylist: "Met Gala",
		category: "Styling",
		likes: 48101
	},
	{
		id: 41,
		src: "/image/chase-i.png",
		title: "2026 Met Gala Hair",
		stylist: "Met Gala",
		category: "Styling",
		likes: 4810
	},
	{
		id: 42,
		src: "/image/emma.webp",
		title: "2026 Met Gala Hair",
		stylist: "Met Gala",
		category: "Styling",
		likes: 14810
	},
	{
		id: 43,
		src: "/image/Madonna.webp",
		title: "2026 Met Gala Hair",
		stylist: "Met Gala",
		category: "Styling",
		likes: 42810
	},
	{
		id: 44,
		src: "/image/EJAE.webp",
		title: "2026 Met Gala Hair",
		stylist: "Met Gala",
		category: "Styling",
		likes: 81302
	},
	{
		id: 45,
		src: "/image/buzz-cut-1.webp",
		title: "Buzz Cut",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 1340
	},
	{
		id: 46,
		src: "/image/buzz-cut-3.jpg",
		title: "Buzz Cut",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 980
	},
	{
		id: 47,
		src: "/image/buzz-cut-2.webp",
		title: "Buzz Cut",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 1120
	},
	{
		id: 48,
		src: "/image/crew-cut-1.webp",
		title: "Crew Cut",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 2210
	},
	{
		id: 49,
		src: "/image/crew-cut-2.jpg",
		title: "Crew Cut",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 1760
	},
	{
		id: 50,
		src: "/image/crew-cut-3.webp",
		title: "Crew Cut",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 1890
	},
	{
		id: 51,
		src: "/image/under-cut-1.jpeg",
		title: "Undercut",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 3040
	},
	{
		id: 52,
		src: "/image/under-cut-2.webp",
		title: "Undercut",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 2670
	},
	{
		id: 53,
		src: "/image/under-cut-3.webp",
		title: "Undercut",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 2450
	},
	{
		id: 54,
		src: "/image/slick-back-1.png",
		title: "Slick Back",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 1580
	},
	{
		id: 55,
		src: "/image/slick-back-2.jpg",
		title: "Slick Back",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 1930
	},
	{
		id: 56,
		src: "/image/slick-back-3.jpg",
		title: "Slick Back",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 2100
	},
	{
		id: 57,
		src: "/image/wet-look-1.webp",
		title: "Wet Look",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 1440
	},
	{
		id: 58,
		src: "/image/wet-look-2.webp",
		title: "Wet Look",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 1270
	},
	{
		id: 59,
		src: "/image/wet-look-3.jpg",
		title: "Wet Look",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 1650
	},
	{
		id: 60,
		src: "/image/spiky.avif",
		title: "Spiky Texture",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 2380
	},
	{
		id: 61,
		src: "/image/spiky-1.webp",
		title: "Spiky Texture",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 2050
	},
	{
		id: 62,
		src: "/image/spiky-2.webp",
		title: "Spiky Texture",
		stylist: "@cuts.byjake",
		category: "Cut",
		likes: 1820
	},
	{
		id: 63,
		src: "/image/bottleneck-bangs-1.webp",
		title: "Bottleneck Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 3120
	},
	{
		id: 64,
		src: "/image/bottleneck-bangs-2.webp",
		title: "Bottleneck Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 2890
	},
	{
		id: 65,
		src: "/image/bottleneck-bangs-3.webp",
		title: "Bottleneck Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 2740
	},
	{
		id: 66,
		src: "/image/soft-side-swept-1.webp",
		title: "Soft Side-Swept Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 1980
	},
	{
		id: 67,
		src: "/image/soft-side-swept.webp",
		title: "Soft Side-Swept Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 2210
	},
	{
		id: 68,
		src: "/image/soft-side-swept-3.webp",
		title: "Soft Side-Swept Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 1760
	},
	{
		id: 69,
		src: "/image/curved-1.webp",
		title: "Curved Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 2540
	},
	{
		id: 70,
		src: "/image/curved-2.webp",
		title: "Curved Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 2310
	},
	{
		id: 71,
		src: "/image/curved-3.webp",
		title: "Curved Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 2080
	},
	{
		id: 72,
		src: "/image/airy-1.webp",
		title: "Airy Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 3450
	},
	{
		id: 73,
		src: "/image/airy-2.webp",
		title: "Airy Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 3190
	},
	{
		id: 74,
		src: "/image/airy-3.webp",
		title: "Airy Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 2870
	},
	{
		id: 75,
		src: "/image/brow-1.webp",
		title: "Brow-Length Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 1640
	},
	{
		id: 76,
		src: "/image/brow-2.webp",
		title: "Brow-Length Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 1420
	},
	{
		id: 77,
		src: "/image/brow-3.webp",
		title: "Brow-Length Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 1580
	},
	{
		id: 78,
		src: "/image/choppy-1.webp",
		title: "Choppy Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 2760
	},
	{
		id: 79,
		src: "/image/choppy-2.webp",
		title: "Choppy Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 2490
	},
	{
		id: 80,
		src: "/image/choppy-3.webp",
		title: "Choppy Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 2230
	},
	{
		id: 81,
		src: "/image/contour-1.webp",
		title: "Contour Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 3680
	},
	{
		id: 82,
		src: "/image/contour-3.webp",
		title: "Contour Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 3410
	},
	{
		id: 83,
		src: "/image/contour-2.webp",
		title: "Contour Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 3150
	},
	{
		id: 84,
		src: "/image/hime-1.webp",
		title: "Hime Cut",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 4120
	},
	{
		id: 85,
		src: "/image/hime-2.webp",
		title: "Hime Cut",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 3870
	},
	{
		id: 86,
		src: "/image/hime-3.webp",
		title: "Hime Cut",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 3590
	},
	{
		id: 87,
		src: "/image/flipped-3.webp",
		title: "Flipped Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 2140
	},
	{
		id: 88,
		src: "/image/flipped-1.webp",
		title: "Flipped Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 1960
	},
	{
		id: 89,
		src: "/image/flipped-2.webp",
		title: "Flipped Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 1780
	},
	{
		id: 90,
		src: "/image/sleek-1.webp",
		title: "Sleek Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 2920
	},
	{
		id: 91,
		src: "/image/sleek-2.webp",
		title: "Sleek Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 2650
	},
	{
		id: 92,
		src: "/image/sleek-3.webp",
		title: "Sleek Bangs",
		stylist: "@fringe.bymia",
		category: "Cut",
		likes: 2380
	}
];
//#endregion
//#region src/components/TrendingLooks.tsx
function shuffle(arr, seed) {
	const a = [...arr];
	let s = seed;
	for (let i = a.length - 1; i > 0; i--) {
		s = (s * 16807 + 0) % 2147483647;
		const j = Math.floor(s / 2147483647 * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
var categories$1 = [
	"All",
	"Color",
	"Cut",
	"Styling",
	"Transformations"
];
function TrendingLooks() {
	const [activeCategory, setActiveCategory] = useState("All");
	const [likedIds, setLikedIds] = useState(/* @__PURE__ */ new Set());
	const [seed] = useState(() => Math.random());
	const filtered = useMemo(() => {
		return shuffle(activeCategory === "All" ? looks : looks.filter((l) => l.category === activeCategory), seed).slice(0, 6);
	}, [activeCategory, seed]);
	const toggleLike = (id, e) => {
		e.preventDefault();
		e.stopPropagation();
		setLikedIds((prev) => {
			const next = new Set(prev);
			next.has(id) ? next.delete(id) : next.add(id);
			return next;
		});
	};
	return /* @__PURE__ */ jsx("section", {
		className: "bg-black py-16 lg:py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 mb-2",
						children: [/* @__PURE__ */ jsx("div", { className: "w-6 h-0.5 bg-gold-500" }), /* @__PURE__ */ jsx("span", {
							className: "text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium",
							children: "Lookbook"
						})]
					}), /* @__PURE__ */ jsx("h2", {
						className: "text-2xl md:text-3xl font-bold text-white",
						style: { fontFamily: "'Playfair Display', serif" },
						children: "Trending Looks This Week"
					})] }), /* @__PURE__ */ jsx("div", {
						className: "flex gap-1 flex-wrap",
						children: categories$1.map((cat) => /* @__PURE__ */ jsx("button", {
							onClick: () => setActiveCategory(cat),
							className: `text-[10px] tracking-widest uppercase px-4 py-1.5 font-medium border transition-colors ${activeCategory === cat ? "bg-gold-500 border-gold-500 text-black" : "border-white/10 text-charcoal-400 hover:border-white/30 hover:text-white"}`,
							children: cat
						}, cat))
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4",
					children: filtered.map((look) => /* @__PURE__ */ jsxs("div", {
						className: "relative group overflow-hidden aspect-[3/4] cursor-default block",
						children: [
							/* @__PURE__ */ jsx("img", {
								src: look.src,
								alt: look.title,
								className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "flex justify-end gap-2",
									children: /* @__PURE__ */ jsx("button", {
										onClick: (e) => toggleLike(look.id, e),
										className: `w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all ${likedIds.has(look.id) ? "bg-red-500/20 border-red-400 text-red-400" : "bg-black/30 border-white/20 text-white hover:border-white/60"}`,
										children: /* @__PURE__ */ jsx(Heart, {
											size: 12,
											fill: likedIds.has(look.id) ? "currentColor" : "none"
										})
									})
								}), /* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("p", {
										className: "text-white text-sm font-semibold",
										style: { fontFamily: "'Playfair Display', serif" },
										children: look.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-charcoal-300 text-xs mt-0.5",
										children: look.stylist
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-1 mt-2 text-[10px] text-charcoal-400",
										children: [/* @__PURE__ */ jsx(Heart, { size: 9 }), /* @__PURE__ */ jsx("span", { children: (look.likes + (likedIds.has(look.id) ? 1 : 0)).toLocaleString() })]
									})
								] })]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "absolute top-2 left-2",
								children: /* @__PURE__ */ jsx("span", {
									className: "text-[8px] tracking-widest uppercase bg-black/60 backdrop-blur-sm text-charcoal-300 px-2 py-0.5",
									children: look.category
								})
							})
						]
					}, look.id))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-center mt-8",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/gallery/",
						className: "flex items-center gap-2 border border-white/10 text-charcoal-300 hover:border-gold-500 hover:text-gold-500 text-[11px] tracking-widest uppercase px-8 py-3 transition-colors",
						children: ["View Full Gallery ", /* @__PURE__ */ jsx(ArrowRight, { size: 12 })]
					})
				})
			]
		})
	});
}
//#endregion
//#region src/components/EducationSection.tsx
var courses = [
	{
		id: 1,
		title: "Balayage Explained: What It Is, What It Costs, What to Expect",
		instructor: "Michelle Torres",
		instructorRole: "Master Colorist, NYC",
		duration: "1h 30m",
		students: "12,400+",
		level: "All Levels",
		badge: "New",
		image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/4d/21/71/c4/f7/v1_E10/E107PYVL.JPG?w=1600&cf_fit=scale-down&q=85&format=auto&s=ffe7c33416cffc10313fcdd81e16d4dc53960c1dc6307e58d3f33910e2b5aa27",
		modules: [
			"Color Theory",
			"Placement",
			"Toning",
			"Maintenance Tips"
		]
	},
	{
		id: 2,
		title: "The Right Cut for Your Face Shape: A Stylist's Guide",
		instructor: "David Kwan",
		instructorRole: "Session Stylist, London",
		duration: "2h 15m",
		students: "8,200+",
		level: "Intermediate",
		badge: "New",
		image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/e5/be/4a/a2/cf/v1_E10/E105N38V.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=6f43550081f73f2f93e464f2b00bd78e578f21f8dda5ddb38f1356c7094cfa15",
		modules: [
			"Face Shapes",
			"Bob Styles",
			"Layers",
			"Finishing"
		]
	},
	{
		id: 3,
		title: "Curl Care 101: Products, Routines & Salon Tips",
		instructor: "Amara Johnson",
		instructorRole: "Curl Specialist, Atlanta",
		duration: "45m",
		students: "9,800+",
		level: "Beginner Friendly",
		badge: "Top Rated",
		image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/23/01/50/12/6e/v1_E10/E104HNYZ.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=40d7b48407e5025800504d3c6bba113ccc7efca5a9c75c190738a53618a36024",
		modules: [
			"Curl Types",
			"Hydration",
			"Product Picks",
			"Salon Prep"
		]
	}
];
var LEVEL_COLOR = {
	"All Levels": "text-blue-400",
	"Intermediate": "text-yellow-400",
	"Beginner Friendly": "text-green-400"
};
var BADGE_COLOR = {
	"Best Seller": "bg-gold-500 text-black",
	"New": "bg-blue-500 text-white",
	"Top Rated": "bg-emerald-500 text-white"
};
function EducationSection() {
	const [modalOpen, setModalOpen] = useState(false);
	return /* @__PURE__ */ jsxs("section", {
		className: "bg-charcoal-950 py-16 lg:py-24",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-4",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12",
					children: /* @__PURE__ */ jsxs("div", {
						className: "max-w-xl",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 mb-3",
								children: [/* @__PURE__ */ jsx("div", { className: "w-6 h-0.5 bg-gold-500" }), /* @__PURE__ */ jsx("span", {
									className: "text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium",
									children: "Hair Guides"
								})]
							}),
							/* @__PURE__ */ jsxs("h2", {
								className: "text-2xl md:text-4xl font-bold text-white leading-tight",
								style: { fontFamily: "'Playfair Display', serif" },
								children: [
									"Understand Your Hair,",
									/* @__PURE__ */ jsx("br", {}),
									/* @__PURE__ */ jsx("em", { children: "From the Experts" })
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-charcoal-400 text-sm mt-3 leading-relaxed",
								children: "Stylist-created guides that help you walk into your next appointment knowing exactly what you want, and why."
							})
						]
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-3 gap-px bg-white/5 mb-12 border border-white/5",
					children: [
						{
							value: "200+",
							label: "Contributing Stylists"
						},
						{
							value: "50K+",
							label: "Readers This Month"
						},
						{
							value: "4.9★",
							label: "Average Rating"
						}
					].map((stat) => /* @__PURE__ */ jsxs("div", {
						className: "bg-charcoal-950 px-6 py-4 text-center",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-2xl font-bold text-gold-500",
							style: { fontFamily: "'Playfair Display', serif" },
							children: stat.value
						}), /* @__PURE__ */ jsx("div", {
							className: "text-[10px] tracking-widest uppercase text-charcoal-500 mt-0.5",
							children: stat.label
						})]
					}, stat.label))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-6",
					children: courses.map((course) => /* @__PURE__ */ jsxs("a", {
						onClick: () => setModalOpen(true),
						className: "group bg-charcoal-900/50 border border-white/5 hover:border-gold-500/30 transition-all duration-300 cursor-pointer card-hover flex flex-col",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "relative overflow-hidden aspect-[16/9]",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: course.image,
									alt: course.title,
									className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
									children: /* @__PURE__ */ jsx("div", {
										className: "w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center",
										children: /* @__PURE__ */ jsx(Play, {
											size: 16,
											className: "text-black ml-0.5"
										})
									})
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute top-3 left-3",
									children: /* @__PURE__ */ jsx("span", {
										className: `text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 ${BADGE_COLOR[course.badge]}`,
										children: course.badge
									})
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "p-5 flex flex-col flex-1 gap-3",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "text-base font-bold text-charcoal-100 group-hover:text-white transition-colors leading-snug",
									style: { fontFamily: "'Playfair Display', serif" },
									children: course.title
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-6 h-6 rounded-full bg-charcoal-700 flex items-center justify-center text-[9px] text-charcoal-300 font-bold",
										children: course.instructor.split(" ").map((n) => n[0]).join("")
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-[11px] text-charcoal-300 font-medium",
										children: course.instructor
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[10px] text-charcoal-500",
										children: course.instructorRole
									})] })]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex flex-wrap gap-1.5 mt-1",
									children: course.modules.map((m) => /* @__PURE__ */ jsx("span", {
										className: "text-[9px] tracking-wider uppercase bg-white/5 text-charcoal-400 px-2 py-0.5",
										children: m
									}, m))
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4 text-[10px] text-charcoal-500 mt-auto pt-3 border-t border-white/5",
									children: [
										/* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ jsx(Clock, { size: 10 }),
												" ",
												course.duration
											]
										}),
										/* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ jsx(Users, { size: 10 }),
												" ",
												course.students
											]
										}),
										/* @__PURE__ */ jsxs("span", {
											className: `flex items-center gap-1.5 ml-auto ${LEVEL_COLOR[course.level]}`,
											children: [
												/* @__PURE__ */ jsx(Award, { size: 10 }),
												" ",
												course.level
											]
										})
									]
								})
							]
						})]
					}, course.id))
				})
			]
		}), modalOpen && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm",
			onClick: () => setModalOpen(false),
			children: /* @__PURE__ */ jsxs("div", {
				className: "relative bg-charcoal-950 border border-white/10 max-w-md w-full p-8 text-center",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ jsx("button", {
						onClick: () => setModalOpen(false),
						className: "absolute top-4 right-4 text-charcoal-500 hover:text-white transition-colors",
						"aria-label": "Close",
						children: /* @__PURE__ */ jsx(X, { size: 16 })
					}),
					/* @__PURE__ */ jsx("div", {
						className: "w-12 h-12 bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-5",
						children: /* @__PURE__ */ jsx(Play, {
							size: 20,
							className: "text-gold-500 ml-0.5"
						})
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "text-xl font-bold text-white mb-3",
						style: { fontFamily: "'Playfair Display', serif" },
						children: "This course has ended"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-charcoal-400 leading-relaxed mb-6",
						children: "This guide is no longer available, but more are on the way. We are working with our contributors to bring you new stylist-led courses soon."
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => setModalOpen(false),
						className: "text-[11px] tracking-widest uppercase text-gold-500 hover:text-gold-400 transition-colors font-semibold",
						children: "Got it"
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/components/ProTips.tsx
var tips = [
	{
		id: 1,
		category: "Color",
		tip: "Ask your colorist to show you a strand test before committing to a big color change. It takes 10 minutes and saves months of regret.",
		stylist: "Leila Fernandez",
		role: "Senior Color Editor",
		location: "Miami, FL",
		image: authors["Leila Fernandez"].image,
		slug: "leila-fernandez"
	},
	{
		id: 2,
		category: "Cut",
		tip: "Bring a photo to your appointment, but be open to your stylist's take on how it works with your texture and face shape.",
		stylist: "Tom Harley",
		role: "Technique Editor",
		location: "London, UK",
		image: authors["Tom Harley"].image,
		slug: "tom-harley"
	},
	{
		id: 3,
		category: "Business",
		tip: "If you love your stylist, rebook before you leave the chair. The best appointment slots go to regulars.",
		stylist: "Dana Reeves",
		role: "Salon Business Coach",
		location: "Nashville, TN",
		image: authors["Dana Reeves"].image,
		slug: "dana-reeves"
	},
	{
		id: 4,
		category: "Texture",
		tip: "Tell your stylist your full hair routine at home, the products you use matter as much as what happens in the salon.",
		stylist: "Imani Okafor",
		role: "Texture & Curl Editor",
		location: "Atlanta, GA",
		image: authors["Imani Okafor"].image,
		slug: "imani-okafor"
	}
];
var CAT_COLOR = {
	Color: "bg-amber-500/10 text-amber-400",
	Cut: "bg-blue-500/10 text-blue-400",
	Business: "bg-emerald-500/10 text-emerald-400",
	Texture: "bg-purple-500/10 text-purple-400"
};
function ProTips() {
	return /* @__PURE__ */ jsx("section", {
		className: "bg-black py-16 lg:py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between mb-12",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 mb-2",
					children: [/* @__PURE__ */ jsx("div", { className: "w-6 h-0.5 bg-gold-500" }), /* @__PURE__ */ jsx("span", {
						className: "text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium",
						children: "Pro Tips"
					})]
				}), /* @__PURE__ */ jsx("h2", {
					className: "text-2xl md:text-3xl font-bold text-white",
					style: { fontFamily: "'Playfair Display', serif" },
					children: "Wisdom From the Chair"
				})] }), /* @__PURE__ */ jsxs(Link, {
					to: "/contributors/",
					className: "hidden md:flex items-center gap-2 text-[11px] tracking-widest uppercase text-charcoal-400 hover:text-gold-500 transition-colors",
					children: ["Meet the Experts ", /* @__PURE__ */ jsx(ArrowRight, { size: 12 })]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5",
				children: tips.map((tip) => /* @__PURE__ */ jsxs(Link, {
					to: `/author/${tip.slug}`,
					className: "group bg-black hover:bg-white/[0.03] transition-colors p-6 md:p-8 flex flex-col gap-5 cursor-pointer",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ jsx(Quote, {
								size: 28,
								className: "text-gold-500/30 group-hover:text-gold-500/60 transition-colors flex-shrink-0 mt-1"
							}), /* @__PURE__ */ jsx("span", {
								className: `text-[9px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full ${CAT_COLOR[tip.category]}`,
								children: tip.category
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-lg md:text-xl text-charcoal-200 group-hover:text-white transition-colors leading-relaxed",
							style: { fontFamily: "'Playfair Display', serif" },
							children: tip.tip
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 pt-2 border-t border-white/5",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0",
									children: [/* @__PURE__ */ jsx("img", {
										src: tip.image,
										alt: tip.stylist,
										className: "w-full h-full object-cover object-top"
									}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10 transition-colors" })]
								}),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-semibold text-charcoal-200 group-hover:text-white transition-colors",
									children: tip.stylist
								}), /* @__PURE__ */ jsxs("p", {
									className: "text-[10px] text-charcoal-500",
									children: [
										tip.role,
										" · ",
										tip.location
									]
								})] }),
								/* @__PURE__ */ jsx(ArrowRight, {
									size: 14,
									className: "ml-auto text-charcoal-700 group-hover:text-gold-500 group-hover:translate-x-1 transition-all"
								})
							]
						})
					]
				}, tip.id))
			})]
		})
	});
}
//#endregion
//#region src/components/Newsletter.tsx
function Newsletter() {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email.trim()) return;
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setSubmitted(true);
		}, 1e3);
	};
	return /* @__PURE__ */ jsxs("section", {
		className: "relative overflow-hidden bg-charcoal-950 py-20 lg:py-28",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "absolute inset-0 pointer-events-none",
			children: [
				/* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl" }),
				/* @__PURE__ */ jsx("div", {
					className: "absolute top-0 left-0 right-0 h-px",
					style: { background: "linear-gradient(90deg, transparent, #C9A84C40, transparent)" }
				}),
				/* @__PURE__ */ jsx("div", {
					className: "absolute bottom-0 left-0 right-0 h-px",
					style: { background: "linear-gradient(90deg, transparent, #C9A84C40, transparent)" }
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "max-w-2xl mx-auto px-4 text-center relative z-10",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-center gap-3 mb-6",
					children: [
						/* @__PURE__ */ jsx("div", { className: "h-px w-12 bg-gold-500" }),
						/* @__PURE__ */ jsx("span", {
							className: "text-[10px] tracking-[0.35em] uppercase text-gold-500 font-medium",
							children: "Newsletter"
						}),
						/* @__PURE__ */ jsx("div", { className: "h-px w-12 bg-gold-500" })
					]
				}),
				/* @__PURE__ */ jsxs("h2", {
					className: "text-3xl md:text-5xl font-bold text-white leading-tight mb-4",
					style: { fontFamily: "'Playfair Display', serif" },
					children: [
						"Get the Best Hair",
						/* @__PURE__ */ jsx("br", {}),
						/* @__PURE__ */ jsx("em", { children: "Advice, Weekly" })
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-charcoal-400 text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto",
					children: "Join 85,000+ readers getting stylist-curated trend reports, care tips, and inspiration, straight to your inbox."
				}),
				submitted ? /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center gap-3 text-white",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center",
							children: /* @__PURE__ */ jsx(Check, {
								size: 24,
								className: "text-black"
							})
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-lg font-semibold",
							style: { fontFamily: "'Playfair Display', serif" },
							children: "You're in!"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-charcoal-400 text-sm",
							children: "Check your inbox for a confirmation email."
						})
					]
				}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "flex flex-col sm:flex-row gap-0 max-w-md mx-auto",
					children: [/* @__PURE__ */ jsx("input", {
						type: "email",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						placeholder: "your@email.com",
						required: true,
						className: "flex-1 bg-white/5 border border-white/10 border-r-0 text-white placeholder-charcoal-600 px-5 py-3.5 text-sm outline-none focus:border-gold-500/50 transition-colors"
					}), /* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: loading,
						className: "flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-black text-[11px] font-bold tracking-widest uppercase px-6 py-3.5 transition-colors disabled:opacity-70 min-w-[140px]",
						children: loading ? /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" }) : /* @__PURE__ */ jsxs(Fragment, { children: ["Subscribe ", /* @__PURE__ */ jsx(Send, { size: 11 })] })
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-center gap-6 mt-6 text-[10px] text-charcoal-600 uppercase tracking-wider",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ jsx(Check, {
								size: 10,
								className: "text-gold-500/50"
							}), " No spam, ever"]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ jsx(Check, {
								size: 10,
								className: "text-gold-500/50"
							}), " Weekly digest"]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ jsx(Check, {
								size: 10,
								className: "text-gold-500/50"
							}), " Unsubscribe anytime"]
						})
					]
				})] })
			]
		})]
	});
}
//#endregion
//#region src/components/Footer.tsx
var footerLinks = {
	Editorial: [
		{
			label: "All Articles",
			to: "/articles/"
		},
		{
			label: "Trends",
			to: "/articles/?section=Trends"
		},
		{
			label: "Inspiration",
			to: "/articles/?section=Inspiration"
		},
		{
			label: "Hair Care",
			to: "/articles/?section=Hair+Care"
		},
		{
			label: "Gallery",
			to: "/gallery/"
		}
	],
	Explore: [
		{
			label: "Color",
			to: "/articles/?category=Color"
		},
		{
			label: "Cut & Style",
			to: "/articles/?category=Cut+%26+Style"
		},
		{
			label: "Hair Thinning",
			to: "/articles/?category=Hair+Thinning"
		},
		{
			label: "At-Home Tips",
			to: "/articles/?category=At-Home+Tips"
		},
		{
			label: "Products",
			to: "/articles/?category=Products"
		}
	],
	Community: [{
		label: "About Us",
		to: "/about/"
	}, {
		label: "Contributors",
		to: "/contributors/"
	}]
};
var socials = [{
	label: "Instagram",
	href: "https://www.instagram.com/hairprovoices/",
	initial: "IG"
}, {
	label: "Facebook",
	href: "https://www.facebook.com/people/Hairpro-Voices/61564779778738/",
	initial: "FB"
}];
var sponsors = [
	"Wella Professionals",
	"Redken",
	"Schwarzkopf",
	"L'Oréal Professionnel",
	"Kenra Professional"
];
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "bg-black border-t border-white/5",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "border-b border-white/5 py-6",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-[9px] tracking-[0.3em] uppercase text-charcoal-600 text-center mb-4",
						children: "Proud Partners"
					}), /* @__PURE__ */ jsx("div", {
						className: "flex flex-wrap items-center justify-center gap-6 md:gap-10",
						children: sponsors.map((s) => /* @__PURE__ */ jsx("span", {
							className: "text-[11px] tracking-widest uppercase text-charcoal-600 hover:text-charcoal-400 transition-colors cursor-pointer font-medium",
							children: s
						}, s))
					})]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto px-4 py-14",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "col-span-2 md:col-span-2 flex flex-col gap-4",
						children: [
							/* @__PURE__ */ jsxs(Link, {
								to: "/",
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ jsx("img", {
									src: "/image/site-logo.svg",
									alt: "HairProVoices",
									className: "h-8 object-contain object-left"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-[9px] tracking-[0.3em] uppercase text-charcoal-600",
									children: "Great Hair Starts with Great Advice"
								})]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-charcoal-500 leading-relaxed max-w-[240px]",
								children: "Stylist-created guides, trends, and inspiration to help you get the most out of every salon visit."
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex items-center gap-3 mt-2",
								children: socials.map(({ label, href, initial }) => /* @__PURE__ */ jsx("a", {
									href,
									"aria-label": label,
									title: label,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-charcoal-400 hover:border-gold-500 hover:text-gold-500 transition-colors text-[9px] font-bold tracking-wider",
									children: initial
								}, label))
							})
						]
					}), Object.entries(footerLinks).map(([category, links]) => /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ jsx("h4", {
							className: "text-[10px] font-semibold tracking-[0.25em] uppercase text-white mb-1",
							children: category
						}), links.map(({ label, to }) => /* @__PURE__ */ jsx(Link, {
							to,
							className: "text-xs text-charcoal-500 hover:text-charcoal-200 transition-colors",
							children: label
						}, label))]
					}, category))]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "border-t border-white/5 py-5",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-charcoal-600 tracking-wider",
					children: [/* @__PURE__ */ jsx("span", { children: "© 2026 HairProVoices Media, LLC. All rights reserved." }), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-5",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/about/",
							className: "hover:text-charcoal-400 transition-colors",
							children: "About"
						}), /* @__PURE__ */ jsx("a", {
							href: "mailto:editorial@hairprovoices.com",
							className: "hover:text-charcoal-400 transition-colors",
							children: "Contact"
						})]
					})]
				})
			})
		]
	});
}
//#endregion
//#region src/pages/HomePage.tsx
function HomePage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-charcoal-950 text-charcoal-100",
		children: [
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsx(Ticker, {}),
			/* @__PURE__ */ jsx(FloatingNav, {}),
			/* @__PURE__ */ jsxs("main", { children: [
				/* @__PURE__ */ jsx(Hero, {}),
				/* @__PURE__ */ jsx(FeaturedGrid, {}),
				/* @__PURE__ */ jsx(TrendingLooks, {}),
				/* @__PURE__ */ jsx(EducationSection, {}),
				/* @__PURE__ */ jsx(ProTips, {}),
				/* @__PURE__ */ jsx(Newsletter, {})
			] }),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
//#region src/components/article/ArticleHero.tsx
function ArticleHero({ article }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "bg-black",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto px-4 pt-6 pb-4",
				children: /* @__PURE__ */ jsxs("nav", {
					className: "flex items-center gap-2 text-[10px] tracking-widest uppercase text-charcoal-500 flex-wrap",
					children: [
						/* @__PURE__ */ jsx(Link, {
							to: "/",
							className: "hover:text-gold-500 transition-colors",
							children: "Home"
						}),
						/* @__PURE__ */ jsx(ChevronRight, { size: 10 }),
						/* @__PURE__ */ jsx(Link, {
							to: `/articles/?section=${encodeURIComponent(article.section)}`,
							className: "hover:text-gold-500 transition-colors",
							children: article.section
						}),
						/* @__PURE__ */ jsx(ChevronRight, { size: 10 }),
						/* @__PURE__ */ jsx(Link, {
							to: `/articles/?section=${encodeURIComponent(article.section)}&category=${encodeURIComponent(article.category)}`,
							className: "hover:text-gold-500 transition-colors",
							children: article.category
						}),
						/* @__PURE__ */ jsx(ChevronRight, { size: 10 }),
						/* @__PURE__ */ jsx("span", {
							className: "text-charcoal-400 truncate max-w-[200px]",
							children: article.title
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative aspect-[21/9] overflow-hidden",
				children: [
					/* @__PURE__ */ jsx("img", {
						src: article.image.replace(/w=\d+/, "w=1600").replace(/q=\d+/, "q=90"),
						alt: article.title,
						className: "w-full h-full object-cover"
					}),
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" }),
					/* @__PURE__ */ jsx("div", {
						className: "absolute top-6 left-4 md:left-10",
						children: /* @__PURE__ */ jsx("span", {
							className: "bg-gold-500 text-black text-[9px] font-bold tracking-[0.25em] uppercase px-3 py-1",
							children: article.tag
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "max-w-4xl mx-auto px-4 -mt-px pt-10 pb-10",
				children: [
					/* @__PURE__ */ jsx("h1", {
						className: "text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5",
						style: { fontFamily: "'Playfair Display', serif" },
						children: article.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-charcoal-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl",
						children: article.excerpt
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-6 border-t border-white/10",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-charcoal-800 flex items-center justify-center text-charcoal-400 text-sm font-bold",
								children: article.author.split(" ").map((n) => n[0]).join("")
							}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", {
								className: "text-sm font-semibold text-charcoal-200",
								children: [
									"By",
									" ",
									/* @__PURE__ */ jsx(Link, {
										to: `/author/${article.author.toLowerCase().replace(/\s+/g, "-")}`,
										className: "text-white hover:text-gold-500 transition-colors",
										children: article.author
									})
								]
							}) })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-5 text-[11px] text-charcoal-500 tracking-wider",
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: "flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ jsx(Calendar, { size: 11 }),
										" ",
										article.date
									]
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ jsx(Clock, { size: 11 }),
										" ",
										article.readTime,
										" read"
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 ml-2",
									children: [/* @__PURE__ */ jsxs("button", {
										className: "flex items-center gap-1.5 border border-white/10 hover:border-gold-500 hover:text-gold-500 text-charcoal-400 transition-colors px-3 py-1.5 text-[10px] tracking-widest uppercase",
										"aria-label": "Bookmark",
										children: [/* @__PURE__ */ jsx(Bookmark, { size: 11 }), " Save"]
									}), /* @__PURE__ */ jsxs("button", {
										className: "flex items-center gap-1.5 border border-white/10 hover:border-white/30 text-charcoal-400 hover:text-white transition-colors px-3 py-1.5 text-[10px] tracking-widest uppercase",
										"aria-label": "Share",
										children: [/* @__PURE__ */ jsx(Share2, { size: 11 }), " Share"]
									})]
								})
							]
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/article/ArticleBody.tsx
var INLINE_IMAGE_1 = "/image/copper-1.png";
var INLINE_IMAGE_2 = "/image/copper-re.png";
function SectionHeading({ children, id }) {
	return /* @__PURE__ */ jsx("h2", {
		id,
		className: "text-2xl md:text-3xl font-bold text-white mt-12 mb-5 leading-snug",
		style: { fontFamily: "'Playfair Display', serif" },
		children
	});
}
function Subheading({ children, id }) {
	return /* @__PURE__ */ jsxs("h3", {
		id,
		className: "text-lg font-semibold text-charcoal-100 mt-8 mb-3 flex items-center gap-3",
		style: { fontFamily: "'Playfair Display', serif" },
		children: [/* @__PURE__ */ jsx("span", { className: "inline-block w-4 h-0.5 bg-gold-500 flex-shrink-0" }), children]
	});
}
function Paragraph({ children }) {
	return /* @__PURE__ */ jsx("p", {
		className: "text-charcoal-300 text-base md:text-[17px] leading-[1.85] mb-5",
		children
	});
}
function PullQuote({ quote, attribution }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "my-10 border-l-4 border-gold-500 pl-6 md:pl-8 py-2",
		children: [
			/* @__PURE__ */ jsx(Quote, {
				size: 24,
				className: "text-gold-500/40 mb-3"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xl md:text-2xl text-white font-medium leading-snug italic",
				style: { fontFamily: "'Playfair Display', serif" },
				children: quote
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-[11px] tracking-widest uppercase text-gold-500 mt-4 font-medium",
				children: ["— ", attribution]
			})
		]
	});
}
function TipBox({ title, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "my-8 bg-white/[0.04] border border-gold-500/20 p-6",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-[9px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-2",
				children: "Pro Tip"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm font-semibold text-charcoal-100 mb-2",
				style: { fontFamily: "'Playfair Display', serif" },
				children: title
			}),
			/* @__PURE__ */ jsx("div", {
				className: "text-sm text-charcoal-400 leading-relaxed",
				children
			})
		]
	});
}
function StepList({ steps }) {
	return /* @__PURE__ */ jsx("div", {
		className: "my-8 flex flex-col gap-4",
		children: steps.map(({ step, title, body }) => /* @__PURE__ */ jsxs("div", {
			className: "flex gap-4",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex-shrink-0 w-8 h-8 bg-gold-500 flex items-center justify-center text-black text-xs font-bold",
				children: step
			}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "text-sm font-semibold text-charcoal-100 mb-1",
				children: title
			}), /* @__PURE__ */ jsx("p", {
				className: "text-sm text-charcoal-400 leading-relaxed",
				children: body
			})] })]
		}, step))
	});
}
function InlineImage({ src, caption, full }) {
	const [loaded, setLoaded] = useState(false);
	return /* @__PURE__ */ jsxs("figure", {
		className: "my-10 -mx-4 md:mx-0",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative overflow-hidden",
			children: [!loaded && /* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 bg-charcoal-800 animate-pulse",
				style: { minHeight: "200px" }
			}), /* @__PURE__ */ jsx("img", {
				src,
				alt: caption,
				loading: "lazy",
				onLoad: () => setLoaded(true),
				className: "w-full object-cover transition-opacity duration-500",
				style: {
					opacity: loaded ? 1 : 0,
					...full ? {} : { maxHeight: "360px" }
				}
			})]
		}), /* @__PURE__ */ jsx("figcaption", {
			className: "text-[11px] text-charcoal-500 tracking-wider mt-3 px-4 md:px-0",
			children: caption
		})]
	});
}
function CtaCallout({ children }) {
	return /* @__PURE__ */ jsx("aside", {
		className: "my-12 overflow-hidden border border-gold-500/30 bg-[linear-gradient(135deg,rgba(201,168,76,0.16),rgba(255,255,255,0.04)_46%,rgba(10,10,10,0.92))] p-6 md:p-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-5 sm:flex-row sm:items-start",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex h-11 w-11 flex-shrink-0 items-center justify-center bg-gold-500 text-black",
				children: /* @__PURE__ */ jsx(Sparkles, { size: 19 })
			}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-500",
				children: "Next Step"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-lg leading-[1.75] text-charcoal-100 md:text-xl",
				children
			})] })]
		})
	});
}
function QuoteCarousel({ quotes }) {
	const [index, setIndex] = useState(0);
	const [dir, setDir] = useState("right");
	const [animating, setAnimating] = useState(false);
	const timeoutRef = useRef(null);
	const navigate = (next, direction) => {
		if (animating) return;
		setDir(direction);
		setAnimating(true);
		timeoutRef.current = setTimeout(() => {
			setIndex(next);
			setAnimating(false);
		}, 280);
	};
	const prev = () => navigate((index - 1 + quotes.length) % quotes.length, "left");
	const next = () => navigate((index + 1) % quotes.length, "right");
	useEffect(() => {
		const id = setInterval(() => navigate((index + 1) % quotes.length, "right"), 6e3);
		return () => clearInterval(id);
	});
	const { text, attribution } = quotes[index];
	return /* @__PURE__ */ jsxs("div", {
		className: "my-10 border border-gold-500/20 bg-white/[0.02] relative overflow-hidden select-none",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "px-8 py-8 md:px-12 md:py-10",
				children: [
					/* @__PURE__ */ jsx(Quote, {
						size: 28,
						className: "text-gold-500/30 mb-4"
					}),
					/* @__PURE__ */ jsxs("div", {
						style: {
							opacity: animating ? 0 : 1,
							transform: animating ? `translateX(${dir === "right" ? "-18px" : "18px"})` : "translateX(0)",
							transition: "opacity 0.28s ease, transform 0.28s ease"
						},
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-xl md:text-2xl text-white font-medium leading-snug italic mb-4",
							style: { fontFamily: "'Playfair Display', serif" },
							children: text
						}), attribution && /* @__PURE__ */ jsxs("p", {
							className: "text-[11px] tracking-widest uppercase text-gold-500 font-medium",
							children: ["— ", attribution]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex items-center gap-1.5 mt-6",
						children: quotes.map((_, i) => /* @__PURE__ */ jsx("button", {
							onClick: () => navigate(i, i > index ? "right" : "left"),
							className: `transition-all rounded-full ${i === index ? "w-4 h-1.5 bg-gold-500" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"}`,
							"aria-label": `Go to quote ${i + 1}`
						}, i))
					})
				]
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: prev,
				className: "absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-charcoal-500 hover:text-white transition-colors",
				"aria-label": "Previous quote",
				children: /* @__PURE__ */ jsx(ChevronLeft, { size: 18 })
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: next,
				className: "absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-charcoal-500 hover:text-white transition-colors",
				"aria-label": "Next quote",
				children: /* @__PURE__ */ jsx(ChevronRight, { size: 18 })
			})
		]
	});
}
function ImageRow({ images }) {
	return /* @__PURE__ */ jsx("div", {
		className: "my-10 -mx-4 md:mx-0",
		children: /* @__PURE__ */ jsx("div", {
			className: "flex gap-3 overflow-x-auto pb-3 px-4 md:px-0 snap-x snap-mandatory",
			children: images.map(({ src, caption }, i) => /* @__PURE__ */ jsxs("figure", {
				className: "flex-shrink-0 w-56 md:w-64 snap-start",
				children: [/* @__PURE__ */ jsx("div", {
					className: "relative overflow-hidden bg-charcoal-900 border border-white/5",
					style: { aspectRatio: "3/4" },
					children: src ? /* @__PURE__ */ jsx("img", {
						src,
						alt: caption,
						loading: "lazy",
						className: "w-full h-full object-cover"
					}) : /* @__PURE__ */ jsxs("div", {
						className: "absolute inset-0 flex flex-col items-center justify-center gap-2",
						children: [/* @__PURE__ */ jsx(ImageIcon, {
							size: 24,
							className: "text-charcoal-700"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-[9px] tracking-[0.2em] uppercase text-charcoal-600 font-medium",
							children: "Photo"
						})]
					})
				}), caption && /* @__PURE__ */ jsx("figcaption", {
					className: "text-[10px] text-charcoal-500 tracking-wider mt-2 leading-snug",
					children: caption
				})]
			}, i))
		})
	});
}
function ImagePlaceholder({ caption }) {
	return /* @__PURE__ */ jsxs("figure", {
		className: "my-10 -mx-4 md:mx-0",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative overflow-hidden bg-charcoal-900 border border-white/5 flex flex-col items-center justify-center gap-3",
			style: {
				aspectRatio: "16/9",
				minHeight: "320px"
			},
			children: [/* @__PURE__ */ jsx(ImageIcon, {
				size: 32,
				className: "text-charcoal-700"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-[10px] tracking-[0.25em] uppercase text-charcoal-600 font-medium",
				children: "Image placeholder"
			})]
		}), /* @__PURE__ */ jsx("figcaption", {
			className: "text-[11px] text-charcoal-500 tracking-wider mt-3 px-4 md:px-0",
			children: caption
		})]
	});
}
function BarChart({ title, bars, footnote }) {
	const max = Math.max(...bars.map((b) => b.value), 1);
	return /* @__PURE__ */ jsxs("div", {
		className: "my-10 border border-white/10 bg-white/[0.02] p-6 md:p-8",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-[11px] tracking-[0.25em] text-gold-500 font-medium mb-6",
				children: title.replace(/[a-z]/g, (c) => c.toUpperCase())
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex flex-col gap-5",
				children: bars.map(({ label, value }, i) => /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ jsx("span", {
						className: "w-24 flex-shrink-0 text-[12px] text-charcoal-400 text-right leading-tight",
						children: label
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex-1 flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex-1 bg-white/5 h-8 relative overflow-hidden",
							children: /* @__PURE__ */ jsx("div", {
								className: "absolute inset-y-0 left-0 bg-gold-500 transition-all duration-700",
								style: {
									width: `${value / max * 100}%`,
									opacity: i === 0 ? 1 : .45
								}
							})
						}), /* @__PURE__ */ jsxs("span", {
							className: "text-sm font-semibold text-charcoal-200 w-10 flex-shrink-0",
							children: [value, "%"]
						})]
					})]
				}, i))
			}),
			footnote && /* @__PURE__ */ jsx("p", {
				className: "text-[13px] text-charcoal-400 mt-5 leading-relaxed",
				children: renderInline(footnote)
			})
		]
	});
}
function LineChart({ title, xLabel, yLabel, series, points, footnote }) {
	const COLORS = [
		"#D9B655",
		"#7E97B8",
		"#C98F8F",
		"#8FB8A0"
	];
	const [hover, setHover] = useState(null);
	const [hidden, setHidden] = useState(/* @__PURE__ */ new Set());
	const toggle = (i) => setHidden((prev) => {
		const next = new Set(prev);
		next.has(i) ? next.delete(i) : next.add(i);
		return next;
	});
	const W = 720, H = 420;
	const padL = 56, padR = 22, padT = 28, padB = 64;
	const plotW = W - padL - padR;
	const plotH = H - padT - padB;
	const baseY = padT + plotH;
	const yMax = 100;
	const yTicks = [
		0,
		20,
		40,
		60,
		80,
		100
	];
	const n = points.length;
	const xAt = (i) => padL + (n === 1 ? plotW / 2 : plotW * i / (n - 1));
	const yAt = (v) => baseY - Math.max(0, Math.min(v, yMax)) / yMax * plotH;
	return /* @__PURE__ */ jsxs("div", {
		className: "my-10 border border-white/10 bg-white/[0.02] p-6 md:p-8",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-[11px] tracking-[0.25em] text-gold-500 font-medium mb-1",
				children: title.replace(/[a-z]/g, (c) => c.toUpperCase())
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap gap-3 mt-3 mb-2",
				children: series.map((name, si) => {
					const off = hidden.has(si);
					return /* @__PURE__ */ jsxs("button", {
						onClick: () => toggle(si),
						className: `flex items-center gap-2 text-[11px] tracking-wide px-2.5 py-1 border transition-colors ${off ? "border-white/10 text-charcoal-600" : "border-white/20 text-charcoal-200 hover:border-white/40"}`,
						children: [/* @__PURE__ */ jsx("span", {
							className: "inline-block w-3 h-3 rounded-sm",
							style: {
								background: off ? "transparent" : COLORS[si % COLORS.length],
								border: `1.5px solid ${COLORS[si % COLORS.length]}`
							}
						}), name]
					}, si);
				})
			}),
			/* @__PURE__ */ jsxs("svg", {
				viewBox: `0 0 ${W} ${H}`,
				width: "100%",
				style: {
					height: "auto",
					display: "block",
					touchAction: "pan-y"
				},
				onMouseLeave: () => setHover(null),
				children: [
					yTicks.map((t) => {
						const y = yAt(t);
						return /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("line", {
							x1: padL,
							y1: y,
							x2: W - padR,
							y2: y,
							stroke: "rgba(255,255,255,0.08)",
							strokeWidth: 1
						}), /* @__PURE__ */ jsx("text", {
							x: padL - 10,
							y: y + 4,
							textAnchor: "end",
							fontSize: 12,
							fill: "#7C7468",
							fontFamily: "Inter,Arial,sans-serif",
							children: t
						})] }, t);
					}),
					yLabel && /* @__PURE__ */ jsx("text", {
						transform: `translate(16,${padT + plotH / 2}) rotate(-90)`,
						textAnchor: "middle",
						fontSize: 12.5,
						fill: "#9a9488",
						fontFamily: "Inter,Arial,sans-serif",
						children: yLabel
					}),
					xLabel && /* @__PURE__ */ jsx("text", {
						x: padL + plotW / 2,
						y: H - 12,
						textAnchor: "middle",
						fontSize: 12.5,
						fill: "#9a9488",
						fontFamily: "Inter,Arial,sans-serif",
						children: xLabel
					}),
					points.map((p, i) => /* @__PURE__ */ jsx("text", {
						x: xAt(i),
						y: baseY + 22,
						textAnchor: "middle",
						fontSize: 12,
						fill: "#9a9488",
						fontFamily: "Inter,Arial,sans-serif",
						children: p.x
					}, i)),
					/* @__PURE__ */ jsx("line", {
						x1: padL,
						y1: baseY,
						x2: W - padR,
						y2: baseY,
						stroke: "rgba(255,255,255,0.25)",
						strokeWidth: 1.5
					}),
					hover !== null && /* @__PURE__ */ jsx("line", {
						x1: xAt(hover),
						y1: padT,
						x2: xAt(hover),
						y2: baseY,
						stroke: "rgba(217,182,85,0.5)",
						strokeWidth: 1,
						strokeDasharray: "4 4"
					}),
					series.map((_, si) => {
						if (hidden.has(si)) return null;
						const color = COLORS[si % COLORS.length];
						return /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("path", {
							d: points.map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(p.values[si])}`).join(" "),
							fill: "none",
							stroke: color,
							strokeWidth: 2.5,
							strokeLinejoin: "round",
							strokeLinecap: "round"
						}), points.map((p, i) => /* @__PURE__ */ jsx("circle", {
							cx: xAt(i),
							cy: yAt(p.values[si]),
							r: hover === i ? 5.5 : 3.5,
							fill: color,
							stroke: "#0d0d0d",
							strokeWidth: 1
						}, i))] }, si);
					}),
					points.map((_, i) => {
						const bandW = plotW / Math.max(1, n - 1);
						return /* @__PURE__ */ jsx("rect", {
							x: xAt(i) - bandW / 2,
							y: padT,
							width: bandW,
							height: plotH,
							fill: "transparent",
							onMouseEnter: () => setHover(i),
							onTouchStart: () => setHover(i)
						}, i);
					}),
					hover !== null && (() => {
						const p = points[hover];
						const visible = series.map((name, si) => ({
							name,
							si
						})).filter(({ si }) => !hidden.has(si));
						const boxW = 150, lineH = 18, boxH = 26 + visible.length * lineH;
						const bx = xAt(hover) > padL + plotW / 2 ? xAt(hover) - boxW - 12 : xAt(hover) + 12;
						const by = padT + 6;
						return /* @__PURE__ */ jsxs("g", {
							pointerEvents: "none",
							children: [
								/* @__PURE__ */ jsx("rect", {
									x: bx,
									y: by,
									width: boxW,
									height: boxH,
									rx: 5,
									fill: "#15140f",
									stroke: "rgba(217,182,85,0.4)",
									strokeWidth: 1
								}),
								/* @__PURE__ */ jsx("text", {
									x: bx + 12,
									y: by + 18,
									fontSize: 12,
									fill: "#cfc6b6",
									fontFamily: "Inter,Arial,sans-serif",
									children: xLabel ? `${p.x} µM` : p.x
								}),
								visible.map(({ name, si }, k) => /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("rect", {
									x: bx + 12,
									y: by + 26 + k * lineH + 1,
									width: 9,
									height: 9,
									rx: 1.5,
									fill: COLORS[si % COLORS.length]
								}), /* @__PURE__ */ jsxs("text", {
									x: bx + 27,
									y: by + 26 + k * lineH + 9,
									fontSize: 12,
									fill: "#e6e1d6",
									fontFamily: "Inter,Arial,sans-serif",
									children: [
										name,
										": ",
										p.values[si],
										"%"
									]
								})] }, si))
							]
						});
					})()
				]
			}),
			footnote && /* @__PURE__ */ jsx("p", {
				className: "text-[13px] text-charcoal-400 mt-5 leading-relaxed",
				children: renderInline(footnote)
			})
		]
	});
}
function SplitTable({ left, right }) {
	return /* @__PURE__ */ jsx("div", {
		className: "my-8 grid grid-cols-1 sm:grid-cols-2 gap-0 border border-white/10 overflow-hidden",
		children: [left, right].map((col, ci) => /* @__PURE__ */ jsxs("div", {
			className: `p-5 ${ci === 0 ? "border-b sm:border-b-0 sm:border-r border-white/10" : ""}`,
			children: [/* @__PURE__ */ jsx("p", {
				className: `text-[10px] tracking-[0.25em] uppercase font-semibold mb-4 ${ci === 0 ? "text-gold-500" : "text-charcoal-500"}`,
				children: col.heading
			}), /* @__PURE__ */ jsx("ul", {
				className: "flex flex-col gap-3",
				children: col.items.map((item, ii) => /* @__PURE__ */ jsxs("li", {
					className: "flex gap-2.5 text-sm text-charcoal-300 leading-relaxed",
					children: [/* @__PURE__ */ jsx("span", { className: `flex-shrink-0 mt-1.5 w-1 h-1 rounded-full ${ci === 0 ? "bg-gold-500" : "bg-charcoal-600"}` }), renderInline(item)]
				}, ii))
			})]
		}, ci))
	});
}
function DataTable({ headerRow, bodyRows, styled }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `my-8 border border-white/10 ${styled ? "bg-charcoal-900" : ""}`,
		children: [/* @__PURE__ */ jsx("div", {
			className: "md:hidden divide-y divide-white/5",
			children: bodyRows.map((row, ri) => /* @__PURE__ */ jsx("div", {
				className: "p-4 flex flex-col gap-3",
				children: row.map((cell, ci) => cell ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-[9px] tracking-[0.25em] uppercase text-gold-500/70 font-medium mb-1",
					children: headerRow[ci]
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-charcoal-300 leading-relaxed",
					children: renderInline(cell)
				})] }, ci) : null)
			}, ri))
		}), /* @__PURE__ */ jsx("div", {
			className: "hidden md:block overflow-x-auto",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", {
					className: "bg-white/[0.04] border-b border-white/10",
					children: headerRow.map((cell, j) => /* @__PURE__ */ jsx("th", {
						className: "text-left px-4 py-3 text-[10px] tracking-widest uppercase text-gold-500 font-medium",
						children: cell
					}, j))
				}) }), /* @__PURE__ */ jsx("tbody", {
					className: "divide-y divide-white/5",
					children: bodyRows.map((row, ri) => /* @__PURE__ */ jsx("tr", {
						className: "hover:bg-white/[0.02]",
						children: row.map((cell, ci) => /* @__PURE__ */ jsx("td", {
							className: "px-4 py-3 text-charcoal-300 align-top",
							children: renderInline(cell)
						}, ci))
					}, ri))
				})]
			})
		})]
	});
}
function ReviewBox({ image, imageAlt, bestFor, pros, cons, rating, ctaLabel, ctaUrl }) {
	const isImagePath = !!image && /^(\/|https?:\/\/)/.test(image.trim());
	return /* @__PURE__ */ jsxs("div", {
		className: "my-10 border border-white/10 overflow-hidden bg-charcoal-900",
		children: [
			isImagePath && /* @__PURE__ */ jsx("div", {
				className: "relative overflow-hidden bg-charcoal-900 border-b border-white/10",
				style: { aspectRatio: "1/1" },
				children: /* @__PURE__ */ jsx("img", {
					src: image,
					alt: imageAlt || "Product photo",
					loading: "lazy",
					className: "w-full h-full object-cover"
				})
			}),
			!isImagePath && image && /* @__PURE__ */ jsxs("div", {
				className: "relative overflow-hidden bg-charcoal-900 flex flex-col items-center justify-center gap-3 border-b border-white/10",
				style: { aspectRatio: "1/1" },
				children: [/* @__PURE__ */ jsx(ImageIcon, {
					size: 30,
					className: "text-charcoal-700"
				}), /* @__PURE__ */ jsxs("p", {
					className: "text-[10px] tracking-[0.25em] uppercase text-charcoal-600 font-medium px-6 text-center",
					children: ["Image placeholder — ", image]
				})]
			}),
			bestFor && /* @__PURE__ */ jsxs("div", {
				className: "p-5 border-b border-white/10 bg-white/[0.02]",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-[10px] tracking-[0.25em] uppercase font-semibold mb-2 text-gold-500",
					children: "Best For"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-charcoal-300 leading-relaxed",
					children: renderInline(bestFor)
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-0",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "p-5 border-b sm:border-b-0 sm:border-r border-white/10",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-[10px] tracking-[0.25em] uppercase font-semibold mb-4 text-gold-500",
						children: "Pros"
					}), /* @__PURE__ */ jsx("ul", {
						className: "flex flex-col gap-3",
						children: pros.map((item, i) => /* @__PURE__ */ jsxs("li", {
							className: "flex gap-2.5 text-sm text-charcoal-300 leading-relaxed",
							children: [/* @__PURE__ */ jsx(Check, {
								size: 15,
								strokeWidth: 2.5,
								className: "flex-shrink-0 mt-0.5 text-emerald-500"
							}), renderInline(item)]
						}, i))
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "p-5",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-[10px] tracking-[0.25em] uppercase font-semibold mb-4 text-charcoal-500",
						children: "Cons"
					}), /* @__PURE__ */ jsx("ul", {
						className: "flex flex-col gap-3",
						children: cons.map((item, i) => /* @__PURE__ */ jsxs("li", {
							className: "flex gap-2.5 text-sm text-charcoal-300 leading-relaxed",
							children: [/* @__PURE__ */ jsx(X, {
								size: 15,
								strokeWidth: 2.5,
								className: "flex-shrink-0 mt-0.5 text-red-500"
							}), renderInline(item)]
						}, i))
					})]
				})]
			}),
			(rating !== void 0 || ctaLabel && ctaUrl) && /* @__PURE__ */ jsxs("div", {
				className: "p-5 border-t border-white/10 flex flex-wrap items-center justify-center sm:justify-end gap-3",
				children: [rating !== void 0 && /* @__PURE__ */ jsxs("div", {
					className: "inline-flex items-center gap-2 border border-white/10 px-4 py-3",
					children: [
						/* @__PURE__ */ jsx(Star, {
							size: 14,
							className: "text-gold-500 fill-gold-500 flex-shrink-0"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-sm font-bold text-white",
							children: rating.toFixed(2)
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-[11px] text-charcoal-500",
							children: "/5"
						})
					]
				}), ctaLabel && ctaUrl && /* @__PURE__ */ jsxs("a", {
					href: ctaUrl,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-black font-bold text-[11px] tracking-widest uppercase px-6 py-3 transition-colors",
					children: [ctaLabel, /* @__PURE__ */ jsx(ArrowRight, { size: 14 })]
				})]
			})
		]
	});
}
function CaseStudySeparator() {
	return /* @__PURE__ */ jsxs("div", {
		className: "my-10 flex items-center gap-4",
		children: [
			/* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-white/10" }),
			/* @__PURE__ */ jsx("p", {
				className: "text-[9px] tracking-[0.3em] uppercase text-gold-500/60 font-semibold flex-shrink-0 px-2",
				children: "Client Case Study"
			}),
			/* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-white/10" })
		]
	});
}
function ReferenceBox({ items }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-12 border border-white/10 p-6",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-4",
			children: "References & Sources"
		}), /* @__PURE__ */ jsx("ol", {
			className: "flex flex-col gap-3",
			children: items.map((item, i) => /* @__PURE__ */ jsxs("li", {
				className: "flex gap-3 text-[12px] text-charcoal-500 leading-relaxed",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "flex-shrink-0 text-gold-500/50 font-medium w-4",
					children: [i + 1, "."]
				}), /* @__PURE__ */ jsx("span", { children: renderInline(item) })]
			}, i))
		})]
	});
}
function CascadeList({ items }) {
	return /* @__PURE__ */ jsx("div", {
		className: "my-8 flex flex-col",
		children: items.map((item, i) => /* @__PURE__ */ jsxs("div", {
			className: "flex gap-0",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-center",
				style: {
					width: `${20 + i * 20}px`,
					flexShrink: 0
				},
				children: [/* @__PURE__ */ jsx("div", { className: `w-2 h-2 rounded-full border-2 flex-shrink-0 ${i === items.length - 1 ? "bg-gold-500 border-gold-500" : "border-gold-500/50 bg-transparent"}` }), /* @__PURE__ */ jsx("div", { className: "w-px flex-1 bg-gold-500/20" })]
			}), /* @__PURE__ */ jsxs("div", {
				className: `pb-6 pt-0.5 pl-4 flex-1 ${i === items.length - 1 ? "pb-0" : ""}`,
				children: [
					i === 0 && /* @__PURE__ */ jsx("p", {
						className: "text-[9px] tracking-[0.25em] uppercase font-semibold mb-1.5",
						style: { color: "rgba(201,168,76,0.75)" },
						children: "Scalp environment support | NV-273"
					}),
					i === 1 && /* @__PURE__ */ jsx("p", {
						className: "text-[9px] tracking-[0.25em] uppercase font-semibold mb-1.5",
						style: { color: "rgba(201,168,76,0.75)" },
						children: "DHT-related stress modulation | NV-1065"
					}),
					i === items.length - 1 && i > 1 && /* @__PURE__ */ jsx("p", {
						className: "text-[9px] tracking-[0.25em] uppercase font-semibold mb-1.5",
						style: { color: "rgba(201,168,76,0.75)" },
						children: "Follicle cell support | NV-623 + NV-624"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-base md:text-[17px] leading-[1.8] text-charcoal-300",
						children: renderInline(item)
					})
				]
			})]
		}, i))
	});
}
function CardGrid({ cards }) {
	return /* @__PURE__ */ jsx("div", {
		className: "my-8 grid grid-cols-1 sm:grid-cols-2 gap-4",
		children: cards.map((card, i) => /* @__PURE__ */ jsxs("div", {
			className: "group relative border border-white/10 p-5 transition-all duration-300 hover:border-gold-500/60 hover:bg-white/[0.03] hover:-translate-y-0.5",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 mb-2.5",
					children: [/* @__PURE__ */ jsx("span", {
						className: "flex-shrink-0 w-7 h-7 bg-gold-500 text-black text-[11px] font-bold flex items-center justify-center",
						children: i + 1
					}), /* @__PURE__ */ jsx("h4", {
						className: "text-charcoal-100 font-semibold text-[15px] leading-tight",
						children: card.title
					})]
				}),
				card.tag && /* @__PURE__ */ jsx("p", {
					className: "text-[9px] tracking-[0.2em] uppercase text-gold-500/80 font-semibold mb-2.5",
					children: card.tag
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-charcoal-300 text-sm md:text-[15px] leading-[1.7]",
					children: renderInline(card.body)
				})
			]
		}, i))
	});
}
var formulaRows = [
	{
		col1: "Wella Koleston Perfect",
		col2: "7/43: Medium Blonde Red-Gold",
		col3: "50g"
	},
	{
		col1: "Wella Koleston Perfect",
		col2: "8/43: Light Blonde Red-Gold",
		col3: "20g"
	},
	{
		col1: "Developer",
		col2: "6% (20 vol)",
		col3: "70ml"
	},
	{
		col1: "Processing Time",
		col2: "35 minutes, no heat",
		col3: ""
	}
];
function renderInline(text) {
	const pattern = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|==(.+?)==|~~(.+?)~~|\[([^\]]+)\]\(([^)]+)\))/g;
	const nodes = [];
	let cursor = 0;
	let match;
	let key = 0;
	while ((match = pattern.exec(text)) !== null) {
		if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
		if (match[2]) nodes.push(/* @__PURE__ */ jsx("strong", {
			className: "text-charcoal-100 font-semibold",
			children: match[2]
		}, key++));
		else if (match[3]) nodes.push(/* @__PURE__ */ jsx("em", { children: match[3] }, key++));
		else if (match[4]) nodes.push(/* @__PURE__ */ jsx("code", {
			className: "text-[0.9em] bg-white/10 px-1 rounded font-mono",
			children: match[4]
		}, key++));
		else if (match[5]) nodes.push(/* @__PURE__ */ jsx("mark", {
			className: "bg-gold-500 text-black font-semibold px-0.5 rounded-sm not-italic",
			children: match[5]
		}, key++));
		else if (match[6]) nodes.push(/* @__PURE__ */ jsx("span", {
			className: "text-gold-500",
			children: match[6]
		}, key++));
		else if (match[7]) {
			const href = match[8] ?? "#";
			const isAnchor = href.startsWith("#");
			nodes.push(/* @__PURE__ */ jsx("a", {
				href,
				className: "text-gold-500 hover:underline",
				...isAnchor ? {} : {
					target: "_blank",
					rel: "noopener noreferrer"
				},
				children: match[7]
			}, key++));
		}
		cursor = match.index + match[0].length;
	}
	if (cursor < text.length) nodes.push(text.slice(cursor));
	return nodes;
}
function slugify$2(text) {
	return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
var clinicalTabs = [
	{
		key: "measured",
		label: "Measured Improvements",
		note: "Objective lab measurements after 90 days",
		stats: [
			{
				value: 70,
				prefix: "+",
				suffix: "%",
				label: "Increase in hair thickness"
			},
			{
				value: 58,
				prefix: "−",
				suffix: "%",
				label: "Decrease in hair loss",
				foot: "26% better than minoxidil"
			},
			{
				value: 19,
				prefix: "+",
				suffix: "%",
				label: "Increase in hair density"
			}
		]
	},
	{
		key: "reported",
		label: "What Participants Noticed",
		note: "Self-reported by participants after 90 days",
		stats: [
			{
				value: 90,
				suffix: "%",
				label: "Saw thicker hair after just 90 days"
			},
			{
				value: 1.7,
				decimals: 1,
				suffix: "x",
				label: "Greater improvement in thinning than minoxidil"
			},
			{
				value: 3,
				suffix: "x",
				label: "Higher overall satisfaction vs. baseline"
			},
			{
				value: 86,
				suffix: "%",
				label: "Saw new growth where the serum was applied"
			}
		]
	},
	{
		key: "design",
		label: "Study Design",
		note: "How the trial was run",
		stats: [
			{
				value: 190,
				label: "Participants",
				foot: "Women with visible thinning, Ludwig I-3 to II-2"
			},
			{
				value: 3,
				suffix: " mo",
				label: "Daily use",
				foot: "Machine and expert assessments"
			},
			{
				text: "Double-blind",
				label: "Neither participants nor evaluators knew the product"
			},
			{
				text: "vs. Minoxidil",
				label: "Compared to the gold standard, not placebo"
			}
		]
	}
];
function CountUpStat({ value, decimals = 0, prefix = "", suffix = "" }) {
	const [display, setDisplay] = useState(value);
	useEffect(() => {
		let raf = 0;
		const start = performance.now();
		const dur = 900;
		const step = (t) => {
			const p = Math.min((t - start) / dur, 1);
			setDisplay(value * (1 - Math.pow(1 - p, 3)));
			if (p < 1) raf = requestAnimationFrame(step);
			else setDisplay(value);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	}, [value]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		prefix,
		display.toFixed(decimals),
		suffix
	] });
}
function ClinicalTrialInterim() {
	const [active, setActive] = useState(0);
	const tab = clinicalTabs[active];
	const gridCols = tab.stats.length === 4 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3";
	return /* @__PURE__ */ jsxs("div", {
		className: "my-12 border border-gold-500/25 bg-white/[0.02]",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "px-6 pt-6 md:px-8 md:pt-7",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-[9px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-2",
					children: "3-Month Interim Clinical Data"
				}), /* @__PURE__ */ jsxs("p", {
					className: "text-sm text-charcoal-400 leading-relaxed",
					children: [tab.note, "."]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex gap-2 overflow-x-auto px-6 md:px-8 mt-5 pb-1 scrollbar-none",
				style: { scrollbarWidth: "none" },
				children: clinicalTabs.map((t, i) => /* @__PURE__ */ jsx("button", {
					onClick: () => setActive(i),
					className: `flex-shrink-0 text-[11px] tracking-wide px-3 py-1.5 border transition-colors ${i === active ? "border-gold-500 text-gold-500 bg-gold-500/10" : "border-white/10 text-charcoal-400 hover:text-white hover:border-white/30"}`,
					children: t.label
				}, t.key))
			}),
			/* @__PURE__ */ jsx("div", {
				className: `grid ${gridCols} gap-px bg-white/5 mt-5 border-t border-white/5`,
				children: tab.stats.map((s, j) => /* @__PURE__ */ jsxs("div", {
					className: "bg-charcoal-950 p-5 md:p-6 flex flex-col gap-1.5",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "text-3xl md:text-4xl font-bold text-gold-500 leading-none",
							style: { fontFamily: "'Playfair Display', serif" },
							children: s.text != null ? s.text : /* @__PURE__ */ jsx(CountUpStat, {
								value: s.value ?? 0,
								decimals: s.decimals,
								prefix: s.prefix,
								suffix: s.suffix
							})
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xs text-charcoal-300 leading-snug",
							children: s.label
						}),
						s.foot ? /* @__PURE__ */ jsx("p", {
							className: "text-[10px] text-charcoal-500 tracking-wide",
							children: s.foot
						}) : null
					]
				}, j))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "px-6 py-4 md:px-8 border-t border-white/5 flex items-center justify-between gap-3 flex-wrap",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-[10px] text-charcoal-500 tracking-wide",
					children: "Interim readout of an ongoing double-blind study vs. minoxidil."
				}), /* @__PURE__ */ jsx("a", {
					href: "https://getreyou.com/pages/science",
					target: "_blank",
					rel: "noopener noreferrer",
					className: "text-[11px] tracking-widest uppercase text-gold-500 hover:underline whitespace-nowrap",
					children: "See the full study →"
				})]
			})
		]
	});
}
function MarkdownBody({ body }) {
	const carouselPlaceholders = [];
	const imageRowPlaceholders = [];
	const barChartPlaceholders = [];
	const lineChartPlaceholders = [];
	const cascadePlaceholders = [];
	let processedBody = body.replace(/:::cascade-list\n([\s\S]*?):::/g, (_match, inner) => {
		const items = inner.trim().split("\n").filter((l) => l.trim().startsWith("- ")).map((l) => l.replace(/^-\s+/, "").trim());
		const id = cascadePlaceholders.length;
		cascadePlaceholders.push({ items });
		return `CASCADE_LIST_PLACEHOLDER_${id}`;
	});
	processedBody = processedBody.replace(/:::bar-chart\n([\s\S]*?):::/g, (_match, inner) => {
		const lines = inner.trim().split("\n").filter(Boolean);
		const titleLine = lines.find((l) => l.startsWith("title:"));
		const title = titleLine ? titleLine.replace(/^title:\s*/, "") : "";
		const footnoteLine = lines.find((l) => l.startsWith("footnote:"));
		const footnote = footnoteLine ? footnoteLine.replace(/^footnote:\s*/, "") : void 0;
		const bars = lines.filter((l) => l.startsWith("- ")).map((l) => {
			const m = l.match(/^-\s+(.+?)\s*:\s*(\d+)$/);
			return m ? {
				label: m[1],
				value: parseInt(m[2])
			} : null;
		}).filter(Boolean);
		const id = barChartPlaceholders.length;
		barChartPlaceholders.push({
			title,
			bars,
			footnote
		});
		return `BARCHART_PLACEHOLDER_${id}`;
	});
	processedBody = processedBody.replace(/:::line-chart\n([\s\S]*?):::/g, (_match, inner) => {
		const lines = inner.trim().split("\n").filter(Boolean);
		const grab = (key) => {
			const l = lines.find((x) => x.startsWith(`${key}:`));
			return l ? l.replace(new RegExp(`^${key}:\\s*`), "").trim() : void 0;
		};
		const title = grab("title") ?? "";
		const xLabel = grab("x-label");
		const yLabel = grab("y-label");
		const footnote = grab("footnote");
		const series = lines.filter((l) => l.startsWith("series:")).map((l) => l.replace(/^series:\s*/, "").trim());
		const points = lines.filter((l) => l.startsWith("- ")).map((l) => {
			const m = l.match(/^-\s+(.+?)\s*:\s*(.+)$/);
			if (!m) return null;
			return {
				x: m[1].trim(),
				values: m[2].split(",").map((v) => parseFloat(v.trim()))
			};
		}).filter(Boolean);
		const id = lineChartPlaceholders.length;
		lineChartPlaceholders.push({
			title,
			xLabel,
			yLabel,
			series,
			points,
			footnote
		});
		return `LINECHART_PLACEHOLDER_${id}`;
	});
	processedBody = processedBody.replace(/:::image-row\n([\s\S]*?):::/g, (_match, inner) => {
		const images = inner.trim().split("\n").filter(Boolean).map((line) => {
			const m = line.match(/^!\[([^\]]*)\]\(([^)]*)\)$/);
			if (m) return {
				caption: m[1],
				src: m[2]
			};
			return {
				caption: line,
				src: ""
			};
		});
		const id = imageRowPlaceholders.length;
		imageRowPlaceholders.push({ images });
		return `IMAGEROW_PLACEHOLDER_${id}`;
	});
	processedBody = processedBody.replace(/:::quote-carousel\n([\s\S]*?):::/g, (_match, inner) => {
		const quotes = inner.trim().split(/\n---\n/).map((block) => {
			const lines = block.trim().split("\n");
			const attrIndex = lines.findIndex((l) => l.startsWith("— "));
			return {
				text: (attrIndex > -1 ? lines.slice(0, attrIndex) : lines).join(" ").replace(/^> /, "").trim(),
				attribution: attrIndex > -1 ? lines[attrIndex].replace(/^— /, "").trim() : void 0
			};
		});
		const id = carouselPlaceholders.length;
		carouselPlaceholders.push({ quotes });
		return `CAROUSEL_PLACEHOLDER_${id}`;
	});
	const splitTablePlaceholders = [];
	processedBody = processedBody.replace(/:::split-table\n([\s\S]*?):::/g, (_match, inner) => {
		const lines = inner.trim().split("\n");
		let leftHeading = "", rightHeading = "";
		const leftItems = [], rightItems = [];
		let section = null;
		for (const line of lines) {
			const lh = line.match(/^left-heading:\s*(.+)$/);
			const rh = line.match(/^right-heading:\s*(.+)$/);
			if (lh) {
				leftHeading = lh[1];
				section = "left";
				continue;
			}
			if (rh) {
				rightHeading = rh[1];
				section = "right";
				continue;
			}
			if (line.trim().startsWith("- ") && section === "left") leftItems.push(line.replace(/^-\s+/, "").trim());
			if (line.trim().startsWith("- ") && section === "right") rightItems.push(line.replace(/^-\s+/, "").trim());
		}
		const id = splitTablePlaceholders.length;
		splitTablePlaceholders.push({
			left: {
				heading: leftHeading,
				items: leftItems
			},
			right: {
				heading: rightHeading,
				items: rightItems
			}
		});
		return `SPLIT_TABLE_PLACEHOLDER_${id}`;
	});
	const reviewBoxPlaceholders = [];
	processedBody = processedBody.replace(/:::review-box\n([\s\S]*?):::/g, (_match, inner) => {
		const lines = inner.trim().split("\n");
		let image;
		let imageAlt;
		let bestFor;
		let ctaLabel;
		let ctaUrl;
		let rating;
		const pros = [];
		const cons = [];
		let section = null;
		for (const line of lines) {
			const imgM = line.match(/^image:\s*(.+)$/);
			const altM = line.match(/^alt:\s*(.+)$/);
			const bestForM = line.match(/^best-for:\s*(.+)$/);
			const ctaLabelM = line.match(/^cta-label:\s*(.+)$/);
			const ctaUrlM = line.match(/^cta-url:\s*(.+)$/);
			const ratingM = line.match(/^rating:\s*([\d.]+)$/);
			if (imgM) {
				image = imgM[1].trim().replace(/^['"]|['"]$/g, "");
				continue;
			}
			if (altM) {
				imageAlt = altM[1].trim().replace(/^['"]|['"]$/g, "");
				continue;
			}
			if (bestForM) {
				bestFor = bestForM[1].trim().replace(/^['"]|['"]$/g, "");
				continue;
			}
			if (ctaLabelM) {
				ctaLabel = ctaLabelM[1].trim();
				continue;
			}
			if (ctaUrlM) {
				ctaUrl = ctaUrlM[1].trim();
				continue;
			}
			if (ratingM) {
				rating = parseFloat(ratingM[1]);
				continue;
			}
			if (line.trim() === "pros:") {
				section = "pros";
				continue;
			}
			if (line.trim() === "cons:") {
				section = "cons";
				continue;
			}
			if (line.trim().startsWith("- ") && section === "pros") pros.push(line.replace(/^-\s+/, "").trim());
			if (line.trim().startsWith("- ") && section === "cons") cons.push(line.replace(/^-\s+/, "").trim());
		}
		const id = reviewBoxPlaceholders.length;
		reviewBoxPlaceholders.push({
			image,
			imageAlt,
			bestFor,
			pros,
			cons,
			rating,
			ctaLabel,
			ctaUrl
		});
		return `REVIEW_BOX_PLACEHOLDER_${id}`;
	});
	const scorecardTablePlaceholders = [];
	processedBody = processedBody.replace(/:::scorecard-table\n([\s\S]*?):::/g, (_match, inner) => {
		const parsed = inner.trim().split("\n").filter((l) => l.trim().startsWith("|")).map((r) => r.split("|").slice(1, -1).map((c) => c.trim()));
		const isSep = (row) => row.every((c) => /^[-: ]+$/.test(c));
		const headerRow = parsed[0] || [];
		const bodyRows = parsed.slice(1).filter((r) => !isSep(r));
		const id = scorecardTablePlaceholders.length;
		scorecardTablePlaceholders.push({
			headerRow,
			bodyRows
		});
		return `SCORECARD_TABLE_PLACEHOLDER_${id}`;
	});
	const referencePlaceholders = [];
	processedBody = processedBody.replace(/:::references\n([\s\S]*?):::/g, (_match, inner) => {
		const items = inner.trim().split("\n").filter((l) => l.trim().startsWith("- ")).map((l) => l.replace(/^-\s+/, "").trim());
		const id = referencePlaceholders.length;
		referencePlaceholders.push({ items });
		return `REFERENCES_PLACEHOLDER_${id}`;
	});
	const cardGridPlaceholders = [];
	processedBody = processedBody.replace(/:::card-grid\n([\s\S]*?):::/g, (_match, inner) => {
		const cards = inner.trim().split(/\n---\n/).map((block) => {
			const lines = block.trim().split("\n");
			let title = "", tag;
			const bodyLines = [];
			for (const line of lines) {
				const t = line.match(/^title:\s*(.+)$/);
				const g = line.match(/^tag:\s*(.+)$/);
				if (t) {
					title = t[1].trim();
					continue;
				}
				if (g) {
					tag = g[1].trim();
					continue;
				}
				bodyLines.push(line);
			}
			return {
				title,
				tag,
				body: bodyLines.join(" ").trim()
			};
		});
		const id = cardGridPlaceholders.length;
		cardGridPlaceholders.push({ cards });
		return `CARD_GRID_PLACEHOLDER_${id}`;
	});
	processedBody = processedBody.replace(/:::case-study-separator:::/g, "CASE_STUDY_SEPARATOR");
	processedBody = processedBody.replace(/:::clinical-trial:::/g, "CLINICAL_TRIAL");
	return /* @__PURE__ */ jsx("article", {
		className: "max-w-2xl",
		children: processedBody.split(/\n\n+/).map((block, i) => {
			const trimmed = block.trim();
			if (!trimmed) return null;
			if (trimmed === "CASE_STUDY_SEPARATOR") return /* @__PURE__ */ jsx(CaseStudySeparator, {}, i);
			if (trimmed === "CLINICAL_TRIAL") return /* @__PURE__ */ jsx(ClinicalTrialInterim, {}, i);
			const refMatch = trimmed.match(/^REFERENCES_PLACEHOLDER_(\d+)$/);
			if (refMatch) {
				const rp = referencePlaceholders[parseInt(refMatch[1])];
				return /* @__PURE__ */ jsx(ReferenceBox, { items: rp.items }, i);
			}
			const barChartMatch = trimmed.match(/^BARCHART_PLACEHOLDER_(\d+)$/);
			if (barChartMatch) {
				const bp = barChartPlaceholders[parseInt(barChartMatch[1])];
				return /* @__PURE__ */ jsx(BarChart, {
					title: bp.title,
					bars: bp.bars,
					footnote: bp.footnote
				}, i);
			}
			const lineChartMatch = trimmed.match(/^LINECHART_PLACEHOLDER_(\d+)$/);
			if (lineChartMatch) {
				const lp = lineChartPlaceholders[parseInt(lineChartMatch[1])];
				return /* @__PURE__ */ jsx(LineChart, {
					title: lp.title,
					xLabel: lp.xLabel,
					yLabel: lp.yLabel,
					series: lp.series,
					points: lp.points,
					footnote: lp.footnote
				}, i);
			}
			const splitTableMatch = trimmed.match(/^SPLIT_TABLE_PLACEHOLDER_(\d+)$/);
			if (splitTableMatch) {
				const st = splitTablePlaceholders[parseInt(splitTableMatch[1])];
				return /* @__PURE__ */ jsx(SplitTable, {
					left: st.left,
					right: st.right
				}, i);
			}
			const reviewBoxMatch = trimmed.match(/^REVIEW_BOX_PLACEHOLDER_(\d+)$/);
			if (reviewBoxMatch) {
				const rb = reviewBoxPlaceholders[parseInt(reviewBoxMatch[1])];
				return /* @__PURE__ */ jsx(ReviewBox, {
					image: rb.image,
					imageAlt: rb.imageAlt,
					bestFor: rb.bestFor,
					pros: rb.pros,
					cons: rb.cons,
					rating: rb.rating,
					ctaLabel: rb.ctaLabel,
					ctaUrl: rb.ctaUrl
				}, i);
			}
			const scorecardTableMatch = trimmed.match(/^SCORECARD_TABLE_PLACEHOLDER_(\d+)$/);
			if (scorecardTableMatch) {
				const st = scorecardTablePlaceholders[parseInt(scorecardTableMatch[1])];
				return /* @__PURE__ */ jsx(DataTable, {
					headerRow: st.headerRow,
					bodyRows: st.bodyRows,
					styled: true
				}, i);
			}
			const carouselMatch = trimmed.match(/^CAROUSEL_PLACEHOLDER_(\d+)$/);
			if (carouselMatch) {
				const cp = carouselPlaceholders[parseInt(carouselMatch[1])];
				return /* @__PURE__ */ jsx(QuoteCarousel, { quotes: cp.quotes }, i);
			}
			const imageRowMatch = trimmed.match(/^IMAGEROW_PLACEHOLDER_(\d+)$/);
			if (imageRowMatch) {
				const rp = imageRowPlaceholders[parseInt(imageRowMatch[1])];
				return /* @__PURE__ */ jsx(ImageRow, { images: rp.images }, i);
			}
			const cascadeMatch = trimmed.match(/^CASCADE_LIST_PLACEHOLDER_(\d+)$/);
			if (cascadeMatch) {
				const cl = cascadePlaceholders[parseInt(cascadeMatch[1])];
				return /* @__PURE__ */ jsx(CascadeList, { items: cl.items }, i);
			}
			const cardGridMatch = trimmed.match(/^CARD_GRID_PLACEHOLDER_(\d+)$/);
			if (cardGridMatch) {
				const cg = cardGridPlaceholders[parseInt(cardGridMatch[1])];
				return /* @__PURE__ */ jsx(CardGrid, { cards: cg.cards }, i);
			}
			const cta = trimmed.match(/^(\*\*CTA:\*\*|CTA:)\s*(.+)$/s);
			if (cta) return /* @__PURE__ */ jsx(CtaCallout, { children: renderInline(cta[2]) }, i);
			const h2 = trimmed.match(/^## (.+)/);
			if (h2) return /* @__PURE__ */ jsx(SectionHeading, {
				id: slugify$2(h2[1]),
				children: h2[1]
			}, i);
			const img = trimmed.match(/^!\[([^\]]*)\]\(([^)]*)\)$/);
			if (img) {
				const full = img[1].endsWith("|full");
				const caption = full ? img[1].slice(0, -5) : img[1];
				if (!img[2]) return /* @__PURE__ */ jsx(ImagePlaceholder, { caption }, i);
				return /* @__PURE__ */ jsx(InlineImage, {
					src: img[2],
					caption,
					full
				}, i);
			}
			const h3 = trimmed.match(/^### (.+)/);
			if (h3) return /* @__PURE__ */ jsx(Subheading, {
				id: slugify$2(h3[1]),
				children: h3[1]
			}, i);
			const h1 = trimmed.match(/^# (.+)/);
			if (h1) return /* @__PURE__ */ jsx(SectionHeading, {
				id: slugify$2(h1[1]),
				children: h1[1]
			}, i);
			if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) return /* @__PURE__ */ jsx("ul", {
				className: "list-disc list-inside text-charcoal-300 text-base md:text-[17px] leading-[1.85] mb-5 space-y-1 pl-2",
				children: trimmed.split("\n").filter((l) => l.trim().startsWith("- ") || l.trim().startsWith("* ")).map((item, j) => /* @__PURE__ */ jsx("li", { children: renderInline(item.replace(/^[-*]\s+/, "")) }, j))
			}, i);
			if (/^\d+\.\s/.test(trimmed)) return /* @__PURE__ */ jsx("div", {
				className: "my-6 flex flex-col gap-3",
				children: trimmed.split("\n").filter((l) => /^\d+\.\s/.test(l.trim())).map((item, j) => /* @__PURE__ */ jsxs("div", {
					className: "flex gap-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex-shrink-0 w-7 h-7 bg-gold-500 flex items-center justify-center text-black text-[11px] font-bold",
						children: j + 1
					}), /* @__PURE__ */ jsx("p", {
						className: "text-charcoal-300 text-base md:text-[17px] leading-[1.85] pt-0.5",
						children: renderInline(item.replace(/^\d+\.\s+/, ""))
					})]
				}, j))
			}, i);
			if (trimmed.startsWith("|")) {
				const parsed = trimmed.split("\n").filter((l) => l.trim().startsWith("|")).map((r) => r.split("|").slice(1, -1).map((c) => c.trim()));
				const isSep = (row) => row.every((c) => /^[-: ]+$/.test(c));
				const headerRow = parsed[0];
				return /* @__PURE__ */ jsx(DataTable, {
					headerRow,
					bodyRows: parsed.slice(1).filter((r) => !isSep(r))
				}, i);
			}
			if (trimmed.startsWith("> ")) {
				const lines = trimmed.split("\n").map((l) => l.replace(/^> /, ""));
				const attrIndex = lines.findIndex((l) => l.startsWith("— "));
				const quote = (attrIndex > -1 ? lines.slice(0, attrIndex) : lines).join(" ");
				const attribution = attrIndex > -1 ? lines[attrIndex].replace(/^— /, "") : null;
				return /* @__PURE__ */ jsxs("div", {
					className: "my-10 border-l-4 border-gold-500 pl-6 md:pl-8 py-2",
					children: [
						/* @__PURE__ */ jsx(Quote, {
							size: 24,
							className: "text-gold-500/40 mb-3"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xl md:text-2xl text-white font-medium leading-snug italic",
							style: { fontFamily: "'Playfair Display', serif" },
							children: quote
						}),
						attribution && /* @__PURE__ */ jsxs("p", {
							className: "text-[11px] tracking-widest uppercase text-gold-500 mt-4 font-medium",
							children: ["— ", attribution]
						})
					]
				}, i);
			}
			return /* @__PURE__ */ jsx("p", {
				className: "text-charcoal-300 text-base md:text-[17px] leading-[1.85] mb-5",
				children: renderInline(trimmed)
			}, i);
		})
	});
}
function ArticleBody({ article }) {
	if (article.body) return /* @__PURE__ */ jsx(MarkdownBody, { body: article.body });
	return /* @__PURE__ */ jsx(CopperArticleBody, {});
}
function CopperArticleBody() {
	return /* @__PURE__ */ jsxs("article", {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ jsxs("p", {
				className: "text-charcoal-300 text-base md:text-[17px] leading-[1.85] mb-5",
				style: { position: "relative" },
				children: [/* @__PURE__ */ jsx("span", {
					className: "float-left text-[5.5rem] font-bold text-gold-500 leading-[0.8] mr-3 mt-2 select-none",
					style: { fontFamily: "'Playfair Display', serif" },
					"aria-hidden": "true",
					children: "C"
				}), "opper hair isn't new, but what's happening to it right now is. This isn't the brassy, over-processed orange of 2008. The 2026 version is something altogether more intentional: warm, dimensional, deeply saturated at the root and feathered into molten gold at the ends. It reads editorial in the chair and natural in the street."]
			}),
			/* @__PURE__ */ jsx(Paragraph, { children: "The shift started quietly. A handful of top colorists posting client work featuring cognac, auburn, and spiced-peach blends. Then brands started pushing copper-adjacent shades in their new collections. By February 2026, search trends for \"copper balayage\" and \"rust hair\" had tripled year-over-year. Now every client wants it, and the good stylists are already fluent in it." }),
			/* @__PURE__ */ jsx(PullQuote, {
				quote: "Copper is the perfect intersection of wearable and editorial. It works on every skin tone if you understand undertones.",
				attribution: "Lucia Vargas, Celebrity Colorist, Los Angeles"
			}),
			/* @__PURE__ */ jsx(SectionHeading, {
				id: "why-copper-works",
				children: "Why Copper Works on Every Client"
			}),
			/* @__PURE__ */ jsx(Paragraph, { children: "The genius of the copper family is its versatility. Unlike cool-toned blondes or pure blacks, copper tones have warm undertones that complement nearly every complexion, they just need to be calibrated correctly. A client with cool undertones wears a deeper, more muted auburn. Warm undertones? Push toward the bright, almost electric cognac. Neutral? The classic 7/43-based formula lands perfectly." }),
			/* @__PURE__ */ jsx(Paragraph, { children: "This is something colorist Marcus Bell has been preaching for years from his London studio. \"I've never had a client walk out unhappy with a copper that was chosen for them but not applied to them,\" he says. \"The consultation is everything. We're looking at skin, eye color, even their wardrobe. Copper is a system, not a formula.\"" }),
			/* @__PURE__ */ jsx(TipBox, {
				title: "Read undertones before mixing",
				children: "Check the inside of the wrist and the neck hairline. Blue veins = cool; green veins = warm; both = neutral. Use this to skew your copper warmer or cooler by adjusting the red-to-gold ratio."
			}),
			/* @__PURE__ */ jsx(InlineImage, {
				src: INLINE_IMAGE_1,
				caption: "A warm cognac balayage by Marcus Bell, shot in natural light. Note the seamless melt from root shadow to mid-shaft copper."
			}),
			/* @__PURE__ */ jsx(SectionHeading, {
				id: "the-formula-breakdown",
				children: "The Formula Breakdown"
			}),
			/* @__PURE__ */ jsx(Paragraph, { children: "While every colorist adapts their formula to the client, a reliable starting base has emerged from the conversations we had with 10 professionals for this piece. Here is the foundation. Adjust developer strength based on existing hair condition:" }),
			/* @__PURE__ */ jsx("div", {
				className: "my-8 border border-white/10 overflow-x-auto",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
						className: "bg-white/[0.04] border-b border-white/10",
						children: [
							/* @__PURE__ */ jsx("th", {
								className: "text-left px-4 py-3 text-[10px] tracking-widest uppercase text-gold-500 font-medium",
								children: "Product"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "text-left px-4 py-3 text-[10px] tracking-widest uppercase text-gold-500 font-medium",
								children: "Shade"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "text-left px-4 py-3 text-[10px] tracking-widest uppercase text-gold-500 font-medium",
								children: "Amount"
							})
						]
					}) }), /* @__PURE__ */ jsx("tbody", {
						className: "divide-y divide-white/5",
						children: formulaRows.map((row, i) => /* @__PURE__ */ jsxs("tr", {
							className: "hover:bg-white/[0.02]",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3 text-charcoal-300",
									children: row.col1
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3 text-charcoal-300",
									children: row.col2
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3 text-charcoal-400",
									children: row.col3
								})
							]
						}, i))
					})]
				})
			}),
			/* @__PURE__ */ jsx(Subheading, {
				id: "application-technique",
				children: "Application Technique"
			}),
			/* @__PURE__ */ jsx(Paragraph, { children: "The placement is what separates a dated copper from a current one. Forget uniform application. The modern approach is a hybrid: shadow root for depth, with freehand balayage panels through the mid-shaft and ends to create dimension and movement." }),
			/* @__PURE__ */ jsx(StepList, { steps: [
				{
					step: 1,
					title: "Shadow the root zone (0–3 inches)",
					body: "Mix 1 part copper with 1 part a neutral brown one level darker than target. Apply directly to root zone with no foil. This creates a seamless, lived-in base."
				},
				{
					step: 2,
					title: "Freehand panels, mid-shaft to ends",
					body: "Using a balayage board, saturate the backcombed mid-shaft sections with your main copper formula. Work diagonal-back sections for the most natural result."
				},
				{
					step: 3,
					title: "Foil highlights, optional brightness",
					body: "On clients requesting maximum vibrancy, place 4–6 fine foils at the face-frame and part line. Use a one shade lighter copper formula here."
				},
				{
					step: 4,
					title: "Tone at the bowl",
					body: "After rinsing, apply a clear or peach gloss for 10 minutes to close the cuticle and add mirror shine. This is non-negotiable for the glass-copper finish."
				}
			] }),
			/* @__PURE__ */ jsx(InlineImage, {
				src: INLINE_IMAGE_2,
				caption: "The finished result: a copper balayage with glass-finish toning. Client: Zara T., photographed by Studio Lumen."
			}),
			/* @__PURE__ */ jsx(SectionHeading, {
				id: "selling-the-maintenance-story",
				children: "Selling the Maintenance Story"
			}),
			/* @__PURE__ */ jsx(Paragraph, { children: "Copper fades faster than cool tones, and that's actually a selling point if you frame it right. Colorist Dana Reeves has made copper her bread and butter by building a \"copper journey\" program at her Nashville suite. Clients book in every 8 weeks, and between visits, they use a copper-depositing conditioner she retails." }),
			/* @__PURE__ */ jsx(PullQuote, {
				quote: "I don't sell copper as a color. I sell it as a season-long transformation. They leave the first appointment warm and bright. By the third, they're a rich, burnished auburn. Clients are addicted.",
				attribution: "Dana Reeves, Salon Business Coach, Nashville, TN"
			}),
			/* @__PURE__ */ jsx(Paragraph, { children: "The retail angle alone can add $40–$80 per visit. Combined with the rebooking frequency copper naturally demands, this single color specialization has real revenue potential for working stylists." }),
			/* @__PURE__ */ jsx(Paragraph, { children: "The bottom line: copper in 2026 is not a trend to chase. It's a skill to own. Learn the undertone system, build a signature formula, and position it as a premium service. Your clients are already asking for it. The stylists who master it this year will still be the go-to for it in 2030." }),
			/* @__PURE__ */ jsx("div", {
				className: "mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-2",
				children: [
					"Copper Color",
					"Balayage",
					"Color Formulas",
					"Techniques",
					"Trending",
					"Business Strategy"
				].map((tag) => /* @__PURE__ */ jsx("a", {
					href: "#",
					className: "text-[10px] tracking-widest uppercase border border-white/10 text-charcoal-400 hover:border-gold-500 hover:text-gold-500 transition-colors px-3 py-1.5",
					children: tag
				}, tag))
			})
		]
	});
}
//#endregion
//#region src/components/article/ArticleSidebar.tsx
var copperTocItems$1 = [
	{
		id: "why-copper-works",
		label: "Why Copper Works"
	},
	{
		id: "the-formula-breakdown",
		label: "The Formula"
	},
	{
		id: "application-technique",
		label: "Application Technique"
	},
	{
		id: "selling-the-maintenance-story",
		label: "Selling Maintenance"
	}
];
function slugify$1(text) {
	return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
var h2Slugs$1 = new Set([
	"find-right-stylist",
	"brunette-glazing",
	"vivid-color-guide",
	"haircut-layers",
	"layers-thin-hair",
	"what-is-balayage",
	"stylist-notices-thinning",
	"gua-sha-scalp",
	"low-maintenance-color",
	"at-home-hair-care",
	"busiest-stylists-system",
	"smoothing-products-stylists-use",
	"what-stylist-sees-when-you-sit-down",
	"gdragon-hairstyles-stylists-reference",
	"2026-met-gala-best-hair-looks",
	"mothers-day-effortless-hairstyles",
	"history-of-hair-color",
	"slick-back-bun",
	"fine-frizzy-wavy-hair",
	"wolf-cut-2026",
	"solo-stylist-blueprint",
	"mens-haircuts-hot-guy-energy",
	"bangs-guide-2026",
	"female-hair-loss-stylist-guide",
	"french-open-tennis-hairstyles",
	"novogro-vs-minoxidil",
	"what-your-hair-says-about-you-sex-and-the-city",
	"wet-look-hair-chic-not-greasy",
	"finasteride-vs-novogro-women-hair-loss",
	"french-bob-every-face-shape",
	"pp405-vs-novogro",
	"hair-extensions-what-to-know",
	"summer-hair-damage",
	"smarter-way-to-go-gray",
	"hard-water-hair",
	"how-often-wash-hair",
	"split-ends-trims-truth",
	"flat-iron-heat-damage",
	"hair-oiling-trend",
	"modern-perm-trend",
	"scalp-service-gap",
	"wet-vs-dry-cutting",
	"are-straight-perms-bad-for-hair",
	"fall-2026-hair-color-trends",
	"gloss-or-full-color",
	"bedtime-routine-ruining-hair"
]);
function getTocItems$1(article) {
	if (!article.body) return copperTocItems$1;
	const pattern = h2Slugs$1.has(article.slug) ? /^##\s+(?!#)(.+)$/gm : /^###\s+(.+)$/gm;
	const headings = [...article.body.matchAll(pattern)];
	if (headings.length === 0) return copperTocItems$1;
	return headings.map((m) => ({
		id: slugify$1(m[1]),
		label: m[1]
	}));
}
var shareLinks = [
	{
		label: "Copy Link",
		icon: Link2,
		action: "copy"
	},
	{
		label: "X / Twitter",
		icon: ExternalLink,
		action: "twitter"
	},
	{
		label: "Facebook",
		icon: ExternalLink,
		action: "facebook"
	},
	{
		label: "Instagram",
		icon: ExternalLink,
		action: "instagram"
	}
];
function ArticleSidebar({ article }) {
	const [copied, setCopied] = useState(false);
	const [activeSection, setActiveSection] = useState("");
	const tocItems = getTocItems$1(article);
	useEffect(() => {
		const observers = [];
		tocItems.forEach(({ id }) => {
			const el = document.getElementById(id);
			if (!el) return;
			const obs = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) setActiveSection(id);
			}, { rootMargin: "-20% 0px -70% 0px" });
			obs.observe(el);
			observers.push(obs);
		});
		return () => observers.forEach((o) => o.disconnect());
	}, [tocItems]);
	const handleShare = (action) => {
		const url = encodeURIComponent(window.location.href);
		if (action === "copy") {
			navigator.clipboard.writeText(window.location.href).catch(() => {});
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		} else if (action === "twitter") window.open(`https://twitter.com/intent/tweet?url=${url}`, "_blank", "noopener,noreferrer");
		else if (action === "facebook") window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "noopener,noreferrer");
		else if (action === "instagram") {
			navigator.clipboard.writeText(window.location.href).catch(() => {});
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
			window.open("https://www.instagram.com/hairprovoices/", "_blank", "noopener,noreferrer");
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "lg:sticky lg:top-6 flex flex-col gap-8",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "hidden lg:block border border-white/10 p-5",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-4",
					children: "In This Article"
				}), /* @__PURE__ */ jsx("nav", {
					className: "flex flex-col gap-1",
					children: tocItems.map((item) => /* @__PURE__ */ jsxs("a", {
						href: `#${item.id}`,
						className: `flex items-center gap-3 text-xs tracking-wide py-1.5 transition-colors group ${activeSection === item.id ? "text-gold-500" : "text-charcoal-500 hover:text-charcoal-200"}`,
						children: [/* @__PURE__ */ jsx("span", { className: `w-4 h-0.5 flex-shrink-0 transition-colors ${activeSection === item.id ? "bg-gold-500" : "bg-charcoal-700 group-hover:bg-charcoal-500"}` }), item.label]
					}, item.id))
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "border border-white/10 p-5",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-4",
					children: "Share This Story"
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 gap-2",
					children: shareLinks.map(({ label, icon: Icon, action }) => /* @__PURE__ */ jsxs("button", {
						onClick: () => handleShare(action),
						className: "flex items-center gap-2 text-[10px] tracking-wider uppercase text-charcoal-400 hover:text-white border border-white/10 hover:border-white/30 px-3 py-2 transition-colors",
						children: [/* @__PURE__ */ jsx(Icon, { size: 11 }), action === "copy" && copied ? "Copied!" : label]
					}, label))
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "p-5 relative overflow-hidden",
				style: {
					background: "linear-gradient(135deg, #1a1a0a 0%, #0d0d0d 100%)",
					border: "1px solid rgba(201, 168, 76, 0.2)"
				},
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" }),
					/* @__PURE__ */ jsx("p", {
						className: "text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-2",
						children: "Newsletter"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-sm font-semibold text-white mb-1",
						style: { fontFamily: "'Playfair Display', serif" },
						children: [
							"Get weekly color",
							/* @__PURE__ */ jsx("br", {}),
							"trends in your inbox"
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-charcoal-500 mb-4",
						children: "Join 85,000+ stylists."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex",
						children: [/* @__PURE__ */ jsx("input", {
							type: "email",
							placeholder: "your@email.com",
							className: "flex-1 bg-white/5 border border-white/10 text-white placeholder-charcoal-600 px-3 py-2 text-xs outline-none focus:border-gold-500/50 transition-colors min-w-0"
						}), /* @__PURE__ */ jsx("button", {
							className: "bg-gold-500 hover:bg-gold-400 text-black px-3 py-2 text-[10px] font-bold tracking-wider transition-colors flex-shrink-0",
							children: "Go"
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/article/ArticleAuthor.tsx
var FALLBACK_IMAGE = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80&auto=format&fit=crop&facepad=3";
function authorSlug$1(name) {
	return name.toLowerCase().replace(/\s+/g, "-");
}
function ArticleAuthor({ article }) {
	const author = authors[article.author];
	const name = author?.name ?? article.author;
	const title = author?.title ?? "Contributor";
	const bio = author?.bio ?? `${name} is a contributor to HairProVoices, covering ${article.category.toLowerCase()} and professional hair industry topics.`;
	const image = author?.image ?? FALLBACK_IMAGE;
	const slug = authorSlug$1(name);
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-14 pt-8 border-t border-white/10",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-[10px] tracking-[0.3em] uppercase text-charcoal-600 mb-6",
			children: "About the Author"
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col sm:flex-row gap-6 bg-white/[0.03] border border-white/8 p-6",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex-shrink-0",
				children: /* @__PURE__ */ jsx(Link, {
					to: `/author/${slug}`,
					children: /* @__PURE__ */ jsx("div", {
						className: "w-20 h-20 rounded-full overflow-hidden ring-2 ring-gold-500/20 hover:ring-gold-500/60 transition-all",
						children: /* @__PURE__ */ jsx("img", {
							src: image,
							alt: name,
							className: "w-full h-full object-cover object-top"
						})
					})
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Link, {
						to: `/author/${slug}`,
						className: "text-lg font-bold text-white hover:text-gold-500 transition-colors",
						style: { fontFamily: "'Playfair Display', serif" },
						children: name
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-[10px] tracking-widest uppercase text-gold-500 mt-0.5 font-medium",
						children: [title, " · HairProVoices"]
					})] }),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-charcoal-400 leading-relaxed",
						children: bio
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex items-center gap-4 mt-2",
						children: /* @__PURE__ */ jsxs(Link, {
							to: `/author/${slug}`,
							className: "text-[10px] tracking-widest uppercase text-charcoal-500 hover:text-gold-500 transition-colors flex items-center gap-1",
							children: ["All Articles ", /* @__PURE__ */ jsx(ArrowRight, { size: 9 })]
						})
					})
				]
			})]
		})]
	});
}
//#endregion
//#region src/components/article/RelatedArticles.tsx
function seededShuffle(arr, seed) {
	let h = 0;
	for (let i = 0; i < seed.length; i++) h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
	const copy = [...arr];
	for (let i = copy.length - 1; i > 0; i--) {
		h = Math.imul(h ^ h >>> 16, 73244475) | 0;
		h = Math.imul(h ^ h >>> 16, 73244475) | 0;
		const j = Math.abs(h) % (i + 1);
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
}
function RelatedArticles({ currentSlug }) {
	const related = seededShuffle(articles.filter((a) => a.slug !== currentSlug), currentSlug).slice(0, 3);
	return /* @__PURE__ */ jsx("section", {
		className: "bg-black py-16 lg:py-20 border-t border-white/5",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between mb-10",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ jsx("div", { className: "w-8 h-0.5 bg-gold-500" }), /* @__PURE__ */ jsx("h2", {
						className: "text-lg font-bold tracking-widest uppercase text-white",
						style: { fontFamily: "'Playfair Display', serif" },
						children: "You May Also Like"
					})]
				}), /* @__PURE__ */ jsxs(Link, {
					to: "/articles/",
					className: "hidden md:flex items-center gap-2 text-[11px] tracking-widest uppercase text-charcoal-400 hover:text-gold-500 transition-colors",
					children: ["All Articles ", /* @__PURE__ */ jsx(ArrowRight, { size: 12 })]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-8",
				children: related.map((article) => /* @__PURE__ */ jsxs(Link, {
					to: `/article/${article.slug}/`,
					className: "group flex flex-col cursor-pointer card-hover",
					children: [/* @__PURE__ */ jsx("div", {
						className: "overflow-hidden aspect-[3/2]",
						children: /* @__PURE__ */ jsx("img", {
							src: article.image,
							alt: article.title,
							className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "pt-4 flex flex-col gap-2",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-[9px] tracking-[0.25em] uppercase text-gold-500 font-semibold",
								children: article.tag
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-lg font-bold text-charcoal-100 group-hover:text-white transition-colors leading-snug",
								style: { fontFamily: "'Playfair Display', serif" },
								children: article.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-charcoal-500 leading-relaxed line-clamp-2",
								children: article.excerpt
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between mt-1",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 text-[10px] text-charcoal-500",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-medium text-charcoal-400",
											children: article.author
										}),
										/* @__PURE__ */ jsx("span", { children: "·" }),
										/* @__PURE__ */ jsxs("span", { children: [article.readTime, " read"] })
									]
								}), /* @__PURE__ */ jsx(ArrowRight, {
									size: 14,
									className: "text-charcoal-600 group-hover:text-gold-500 group-hover:translate-x-1 transition-all"
								})]
							})
						]
					})]
				}, article.title))
			})]
		})
	});
}
//#endregion
//#region src/components/article/MobileToc.tsx
var h2Slugs = new Set([
	"find-right-stylist",
	"brunette-glazing",
	"vivid-color-guide",
	"haircut-layers",
	"layers-thin-hair",
	"what-is-balayage",
	"stylist-notices-thinning",
	"gua-sha-scalp",
	"low-maintenance-color",
	"at-home-hair-care",
	"busiest-stylists-system",
	"smoothing-products-stylists-use",
	"what-stylist-sees-when-you-sit-down",
	"gdragon-hairstyles-stylists-reference",
	"2026-met-gala-best-hair-looks",
	"mothers-day-effortless-hairstyles",
	"history-of-hair-color",
	"slick-back-bun",
	"fine-frizzy-wavy-hair",
	"wolf-cut-2026",
	"solo-stylist-blueprint",
	"mens-haircuts-hot-guy-energy",
	"bangs-guide-2026",
	"female-hair-loss-stylist-guide",
	"french-open-tennis-hairstyles",
	"novogro-vs-minoxidil",
	"wet-look-hair-chic-not-greasy",
	"finasteride-vs-novogro-women-hair-loss",
	"french-bob-every-face-shape",
	"head-spa-salon-revenue-opportunity",
	"pp405-vs-novogro",
	"hair-extensions-what-to-know",
	"summer-hair-damage",
	"smarter-way-to-go-gray",
	"hard-water-hair",
	"how-often-wash-hair",
	"split-ends-trims-truth",
	"flat-iron-heat-damage",
	"hair-oiling-trend",
	"modern-perm-trend",
	"scalp-service-gap",
	"wet-vs-dry-cutting",
	"are-straight-perms-bad-for-hair",
	"fall-2026-hair-color-trends",
	"gloss-or-full-color",
	"bedtime-routine-ruining-hair"
]);
function slugify(text) {
	return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
var copperTocItems = [
	{
		id: "why-copper-works",
		label: "Why Copper Works"
	},
	{
		id: "the-formula-breakdown",
		label: "The Formula"
	},
	{
		id: "application-technique",
		label: "Application"
	},
	{
		id: "selling-the-maintenance-story",
		label: "Maintenance"
	}
];
function getTocItems(article) {
	if (!article.body) return article.slug === "copper-renaissance-2026" ? copperTocItems : [];
	const pattern = h2Slugs.has(article.slug) ? /^##\s+(?!#)(.+)$/gm : /^###\s+(.+)$/gm;
	return [...article.body.matchAll(pattern)].map((m) => ({
		id: slugify(m[1]),
		label: m[1]
	}));
}
function MobileToc({ article }) {
	const [activeSection, setActiveSection] = useState("");
	const activeRef = useRef(null);
	const scrollContainerRef = useRef(null);
	const barRef = useRef(null);
	const tocItems = getTocItems(article);
	useEffect(() => {
		const observers = [];
		tocItems.forEach(({ id }) => {
			const el = document.getElementById(id);
			if (!el) return;
			const obs = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) setActiveSection(id);
			}, { rootMargin: "-20% 0px -70% 0px" });
			obs.observe(el);
			observers.push(obs);
		});
		return () => observers.forEach((o) => o.disconnect());
	}, [tocItems]);
	useEffect(() => {
		if (activeRef.current && scrollContainerRef.current) activeRef.current.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center"
		});
	}, [activeSection]);
	const handleClick = (e, id) => {
		e.preventDefault();
		const target = document.getElementById(id);
		if (!target) return;
		const barHeight = barRef.current?.offsetHeight ?? 0;
		const top = target.getBoundingClientRect().top + window.scrollY - barHeight - 64 - 1;
		window.scrollTo({
			top,
			behavior: "smooth"
		});
	};
	if (tocItems.length === 0) return null;
	return /* @__PURE__ */ jsx("div", {
		ref: barRef,
		className: "lg:hidden sticky top-0 z-40 bg-black/95 backdrop-blur border-b border-white/10",
		children: /* @__PURE__ */ jsx("div", {
			ref: scrollContainerRef,
			className: "flex items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-none",
			style: {
				scrollbarWidth: "none",
				msOverflowStyle: "none"
			},
			children: tocItems.map((item) => {
				const isActive = activeSection === item.id;
				return /* @__PURE__ */ jsx("a", {
					href: `#${item.id}`,
					ref: isActive ? activeRef : null,
					onClick: (e) => handleClick(e, item.id),
					className: `flex-shrink-0 text-[10px] tracking-wide px-3 py-1 border transition-colors whitespace-nowrap ${isActive ? "border-gold-500 text-gold-500 bg-gold-500/10" : "border-white/10 text-charcoal-400 hover:text-white hover:border-white/30"}`,
					children: item.label
				}, item.id);
			})
		})
	});
}
//#endregion
//#region src/pages/ArticlePage.tsx
function ArticlePage() {
	const { slug } = useParams();
	const article = slug ? getArticleBySlug(slug) : void 0;
	if (!article) return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-charcoal-950 text-charcoal-100 flex flex-col items-center justify-center gap-4",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-2xl font-bold",
			style: { fontFamily: "'Playfair Display', serif" },
			children: "Article not found"
		}), /* @__PURE__ */ jsx(Link, {
			to: "/",
			className: "text-gold-500 hover:underline text-sm tracking-widest uppercase",
			children: "← Back to Home"
		})]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-charcoal-950 text-charcoal-100",
		children: [
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsx(Ticker, {}),
			/* @__PURE__ */ jsx(FloatingNav, {}),
			/* @__PURE__ */ jsxs("main", { children: [
				/* @__PURE__ */ jsx(ArticleHero, { article }),
				/* @__PURE__ */ jsx(MobileToc, { article }),
				/* @__PURE__ */ jsx("div", {
					className: "bg-charcoal-950",
					children: /* @__PURE__ */ jsx("div", {
						className: "max-w-7xl mx-auto px-4 py-12 lg:py-16",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "lg:col-span-8",
								children: [/* @__PURE__ */ jsx(ArticleBody, { article }), /* @__PURE__ */ jsx(ArticleAuthor, { article })]
							}), /* @__PURE__ */ jsx("aside", {
								className: "lg:col-span-4",
								children: /* @__PURE__ */ jsx(ArticleSidebar, { article })
							})]
						})
					})
				}),
				/* @__PURE__ */ jsx(RelatedArticles, { currentSlug: article.slug }),
				/* @__PURE__ */ jsx(Newsletter, {})
			] }),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
//#region src/pages/ArticlesPage.tsx
var visibleArticles = articles.filter((a) => a.slug !== "what-is-balayage-old");
var sections = [
	"All",
	"Trends",
	"Inspiration",
	"Hair Care"
];
var categoryMap = {
	All: [
		"All",
		"Color",
		"Technique",
		"Cut & Style",
		"Texture",
		"Tips",
		"Business",
		"Products",
		"Hair Thinning",
		"At-Home Tips"
	],
	Trends: [
		"All",
		"Color",
		"Technique",
		"Cut & Style",
		"Texture"
	],
	Inspiration: [
		"All",
		"Tips",
		"Business"
	],
	"Hair Care": [
		"All",
		"Products",
		"Hair Thinning",
		"At-Home Tips"
	]
};
function ArticlesPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeSection = searchParams.get("section") ?? "All";
	const activeCategory = searchParams.get("category") ?? "All";
	const setSection = (sec) => {
		if (sec === "All") setSearchParams({});
		else setSearchParams({ section: sec });
	};
	const setCategory = (cat) => {
		const params = {};
		if (activeSection !== "All") params.section = activeSection;
		if (cat !== "All") params.category = cat;
		setSearchParams(params);
	};
	const categories = categoryMap[activeSection] ?? categoryMap.All;
	const filtered = visibleArticles.filter((a) => {
		const sectionMatch = activeSection === "All" || a.section === activeSection;
		const categoryMatch = activeCategory === "All" || a.category === activeCategory;
		return sectionMatch && categoryMatch;
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-charcoal-950 text-charcoal-100",
		children: [
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsx(Ticker, {}),
			/* @__PURE__ */ jsx(FloatingNav, {}),
			/* @__PURE__ */ jsxs("main", { children: [
				/* @__PURE__ */ jsx("div", {
					className: "border-b border-white/10",
					children: /* @__PURE__ */ jsxs("div", {
						className: "max-w-7xl mx-auto px-4 py-12 lg:py-16",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 mb-4",
								children: [/* @__PURE__ */ jsx("div", { className: "h-px bg-gold-500 w-8" }), /* @__PURE__ */ jsx("span", {
									className: "text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium",
									children: "HairProVoices"
								})]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-3xl md:text-4xl font-bold text-white mb-2",
								style: { fontFamily: "'Playfair Display', serif" },
								children: "All Articles"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-sm text-charcoal-400",
								children: [filtered.length, " pieces from our contributors"]
							})
						]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "border-b border-white/10 sticky top-0 z-40 bg-charcoal-950",
					children: [/* @__PURE__ */ jsx("div", {
						className: "max-w-7xl mx-auto px-4 border-b border-white/5",
						children: /* @__PURE__ */ jsx("div", {
							className: "flex items-center gap-1 py-3 overflow-x-auto scrollbar-none",
							style: { scrollbarWidth: "none" },
							children: sections.map((sec) => /* @__PURE__ */ jsx("button", {
								onClick: () => setSection(sec),
								className: `flex-shrink-0 px-5 py-1.5 text-[11px] tracking-widest uppercase font-semibold transition-colors ${activeSection === sec ? "text-white border-b-2 border-gold-500" : "text-charcoal-500 hover:text-charcoal-200"}`,
								children: sec
							}, sec))
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "max-w-7xl mx-auto px-4",
						children: /* @__PURE__ */ jsx("div", {
							className: "flex items-center gap-1 overflow-x-auto py-3 scrollbar-none",
							style: { scrollbarWidth: "none" },
							children: categories.map((cat) => /* @__PURE__ */ jsx("button", {
								onClick: () => setCategory(cat),
								className: `flex-shrink-0 px-4 py-1.5 text-[10px] tracking-widest uppercase font-medium transition-colors border ${activeCategory === cat ? "bg-gold-500 text-black border-gold-500" : "text-charcoal-400 border-white/10 hover:text-white hover:border-white/30"}`,
								children: cat
							}, cat))
						})
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "max-w-7xl mx-auto px-4 py-12 lg:py-16",
					children: /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5",
						children: filtered.map((article) => /* @__PURE__ */ jsxs(Link, {
							to: `/article/${article.slug}/`,
							className: "group bg-charcoal-950 p-6 flex flex-col gap-4 hover:bg-white/[0.03] transition-colors",
							children: [/* @__PURE__ */ jsx("div", {
								className: "overflow-hidden aspect-[16/9]",
								children: /* @__PURE__ */ jsx("img", {
									src: article.image,
									alt: article.title,
									className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-2",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "text-[9px] tracking-widest uppercase text-gold-500 font-medium",
												children: article.tag
											}),
											/* @__PURE__ */ jsx("span", {
												className: "text-charcoal-700",
												children: "·"
											}),
											/* @__PURE__ */ jsx("span", {
												className: "text-[10px] text-charcoal-500",
												children: article.date
											})
										]
									}),
									/* @__PURE__ */ jsx("h2", {
										className: "text-base font-bold text-charcoal-100 group-hover:text-white transition-colors leading-snug",
										style: { fontFamily: "'Playfair Display', serif" },
										children: article.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-sm text-charcoal-500 leading-relaxed line-clamp-2",
										children: article.excerpt
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 text-[10px] text-charcoal-600 mt-1",
										children: [
											/* @__PURE__ */ jsx("span", { children: article.author }),
											/* @__PURE__ */ jsx("span", { children: "·" }),
											/* @__PURE__ */ jsxs("span", { children: [article.readTime, " read"] })
										]
									})
								]
							})]
						}, article.slug))
					})
				}),
				/* @__PURE__ */ jsx(Newsletter, {})
			] }),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
//#region src/pages/AuthorPage.tsx
function AuthorPage() {
	const { slug } = useParams();
	const author = slug ? Object.values(authors).find((a) => a.name.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()) : void 0;
	const authorArticles = articles.filter((a) => a.author.toLowerCase().replace(/\s+/g, "-") === (slug ?? "").toLowerCase());
	if (!author) return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-charcoal-950 text-charcoal-100 flex flex-col items-center justify-center gap-4",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-2xl font-bold",
			style: { fontFamily: "'Playfair Display', serif" },
			children: "Author not found"
		}), /* @__PURE__ */ jsx(Link, {
			to: "/",
			className: "text-gold-500 hover:underline text-sm tracking-widest uppercase",
			children: "← Back to Home"
		})]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-charcoal-950 text-charcoal-100",
		children: [
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsx(Ticker, {}),
			/* @__PURE__ */ jsxs("main", { children: [
				/* @__PURE__ */ jsx("div", {
					className: "border-b border-white/10",
					children: /* @__PURE__ */ jsxs("div", {
						className: "max-w-7xl mx-auto px-4 py-14 lg:py-20",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/contributors/",
							className: "inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-charcoal-500 hover:text-gold-500 transition-colors mb-8",
							children: "← All Contributors"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row gap-8 items-start sm:items-center",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-24 h-24 rounded-full overflow-hidden ring-2 ring-gold-500/30 flex-shrink-0",
								children: /* @__PURE__ */ jsx("img", {
									src: author.image,
									alt: author.name,
									className: "w-full h-full object-cover object-top"
								})
							}), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-2",
									children: "Contributor"
								}),
								/* @__PURE__ */ jsx("h1", {
									className: "text-3xl md:text-4xl font-bold text-white mb-1",
									style: { fontFamily: "'Playfair Display', serif" },
									children: author.name
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "text-[11px] tracking-widest uppercase text-charcoal-400 mb-4",
									children: [author.title, " · HairProVoices"]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-charcoal-400 leading-relaxed max-w-2xl",
									children: author.bio
								})
							] })]
						})]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 py-12 lg:py-16",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-8",
						children: [
							"Articles by ",
							author.name,
							": ",
							authorArticles.length,
							" ",
							authorArticles.length === 1 ? "piece" : "pieces"
						]
					}), authorArticles.length === 0 ? /* @__PURE__ */ jsx("p", {
						className: "text-charcoal-500 text-sm",
						children: "No articles found."
					}) : /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5",
						children: authorArticles.map((article) => /* @__PURE__ */ jsxs(Link, {
							to: `/article/${article.slug}/`,
							className: "group bg-charcoal-950 p-6 flex flex-col gap-4 hover:bg-white/[0.03] transition-colors",
							children: [/* @__PURE__ */ jsx("div", {
								className: "overflow-hidden aspect-[16/9]",
								children: /* @__PURE__ */ jsx("img", {
									src: article.image,
									alt: article.title,
									className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-2",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "text-[9px] tracking-widest uppercase text-gold-500 font-medium",
												children: article.tag
											}),
											/* @__PURE__ */ jsx("span", {
												className: "text-charcoal-700",
												children: "·"
											}),
											/* @__PURE__ */ jsx("span", {
												className: "text-[10px] text-charcoal-500",
												children: article.date
											})
										]
									}),
									/* @__PURE__ */ jsx("h2", {
										className: "text-base font-bold text-charcoal-100 group-hover:text-white transition-colors leading-snug",
										style: { fontFamily: "'Playfair Display', serif" },
										children: article.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-sm text-charcoal-500 leading-relaxed line-clamp-2",
										children: article.excerpt
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "text-[10px] text-charcoal-600 mt-1",
										children: [article.readTime, " read"]
									})
								]
							})]
						}, article.slug))
					})]
				}),
				/* @__PURE__ */ jsx(Newsletter, {})
			] }),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
//#region src/pages/GalleryPage.tsx
var categories = [
	"All",
	"Color",
	"Cut",
	"Styling",
	"Transformations"
];
function GalleryPage() {
	const [activeCategory, setActiveCategory] = useState("All");
	const [likedIds, setLikedIds] = useState(/* @__PURE__ */ new Set());
	const filtered = activeCategory === "All" ? looks : looks.filter((l) => l.category === activeCategory);
	const toggleLike = (id, e) => {
		e.preventDefault();
		setLikedIds((prev) => {
			const next = new Set(prev);
			next.has(id) ? next.delete(id) : next.add(id);
			return next;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-charcoal-950 text-charcoal-100",
		children: [
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsx(Ticker, {}),
			/* @__PURE__ */ jsx(FloatingNav, {}),
			/* @__PURE__ */ jsxs("main", { children: [
				/* @__PURE__ */ jsx("div", {
					className: "border-b border-white/10",
					children: /* @__PURE__ */ jsxs("div", {
						className: "max-w-7xl mx-auto px-4 py-12 lg:py-16",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 mb-4",
								children: [/* @__PURE__ */ jsx("div", { className: "h-px bg-gold-500 w-8" }), /* @__PURE__ */ jsx("span", {
									className: "text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium",
									children: "Lookbook"
								})]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-3xl md:text-4xl font-bold text-white mb-2",
								style: { fontFamily: "'Playfair Display', serif" },
								children: "Gallery"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-charcoal-400",
								children: "Trending looks from our community of stylists"
							})
						]
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "border-b border-white/10 sticky top-0 z-40 bg-charcoal-950",
					children: /* @__PURE__ */ jsx("div", {
						className: "max-w-7xl mx-auto px-4",
						children: /* @__PURE__ */ jsx("div", {
							className: "flex items-center gap-1 py-3",
							children: categories.map((cat) => /* @__PURE__ */ jsx("button", {
								onClick: () => setActiveCategory(cat),
								className: `flex-shrink-0 px-4 py-1.5 text-[10px] tracking-widest uppercase font-medium transition-colors border ${activeCategory === cat ? "bg-gold-500 text-black border-gold-500" : "text-charcoal-400 border-white/10 hover:text-white hover:border-white/30"}`,
								children: cat
							}, cat))
						})
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "max-w-7xl mx-auto px-4 py-12 lg:py-16",
					children: /* @__PURE__ */ jsx("div", {
						className: "columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4",
						children: filtered.map((look) => /* @__PURE__ */ jsxs("div", {
							className: "relative group overflow-hidden cursor-pointer break-inside-avoid",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: look.src,
									alt: look.title,
									className: "w-full object-cover transition-transform duration-500 group-hover:scale-105"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "flex justify-end gap-2",
										children: /* @__PURE__ */ jsx("button", {
											onClick: (e) => toggleLike(look.id, e),
											className: `w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all ${likedIds.has(look.id) ? "bg-red-500/20 border-red-400 text-red-400" : "bg-black/30 border-white/20 text-white hover:border-white/60"}`,
											children: /* @__PURE__ */ jsx(Heart, {
												size: 12,
												fill: likedIds.has(look.id) ? "currentColor" : "none"
											})
										})
									}), /* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("p", {
											className: "text-white text-sm font-semibold",
											style: { fontFamily: "'Playfair Display', serif" },
											children: look.title
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-charcoal-300 text-xs mt-0.5",
											children: look.stylist
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-1 mt-2 text-[10px] text-charcoal-400",
											children: [/* @__PURE__ */ jsx(Heart, { size: 9 }), /* @__PURE__ */ jsx("span", { children: (look.likes + (likedIds.has(look.id) ? 1 : 0)).toLocaleString() })]
										})
									] })]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute top-2 left-2",
									children: /* @__PURE__ */ jsx("span", {
										className: "text-[8px] tracking-widest uppercase bg-black/60 backdrop-blur-sm text-charcoal-300 px-2 py-0.5",
										children: look.category
									})
								})
							]
						}, look.id))
					})
				}),
				/* @__PURE__ */ jsx(Newsletter, {})
			] }),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
//#region src/pages/ContributorsPage.tsx
function authorSlug(name) {
	return name.toLowerCase().replace(/\s+/g, "-");
}
function ContributorsPage() {
	const contributorList = Object.values(authors);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-charcoal-950 text-charcoal-100",
		children: [
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsx(FloatingNav, {}),
			/* @__PURE__ */ jsxs("main", { children: [
				/* @__PURE__ */ jsx("div", {
					className: "border-b border-white/10",
					children: /* @__PURE__ */ jsxs("div", {
						className: "max-w-7xl mx-auto px-4 py-12 lg:py-16",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 mb-4",
								children: [/* @__PURE__ */ jsx("div", { className: "h-px bg-gold-500 w-8" }), /* @__PURE__ */ jsx("span", {
									className: "text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium",
									children: "HairProVoices"
								})]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-3xl md:text-4xl font-bold text-white mb-2",
								style: { fontFamily: "'Playfair Display', serif" },
								children: "Our Contributors"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-sm text-charcoal-400",
								children: [contributorList.length, " writers, stylists, and industry experts"]
							})
						]
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "max-w-7xl mx-auto px-4 py-12 lg:py-16",
					children: /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5",
						children: contributorList.map((author) => {
							const slug = authorSlug(author.name);
							const articleCount = articles.filter((a) => a.author === author.name && a.slug !== "what-is-balayage-old").length;
							const recentArticles = articles.filter((a) => a.author === author.name && a.slug !== "what-is-balayage-old").slice(0, 2);
							return /* @__PURE__ */ jsxs("div", {
								className: "bg-charcoal-950 p-6 flex flex-col gap-5 hover:bg-white/[0.03] transition-colors",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-4",
										children: [/* @__PURE__ */ jsx(Link, {
											to: `/author/${slug}`,
											children: /* @__PURE__ */ jsx("div", {
												className: "w-16 h-16 rounded-full overflow-hidden ring-2 ring-gold-500/20 hover:ring-gold-500/50 transition-all flex-shrink-0",
												children: /* @__PURE__ */ jsx("img", {
													src: author.image,
													alt: author.name,
													className: "w-full h-full object-cover object-top"
												})
											})
										}), /* @__PURE__ */ jsxs("div", { children: [
											/* @__PURE__ */ jsx(Link, {
												to: `/author/${slug}`,
												className: "text-base font-bold text-white hover:text-gold-500 transition-colors",
												style: { fontFamily: "'Playfair Display', serif" },
												children: author.name
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-[10px] tracking-widest uppercase text-gold-500 mt-0.5",
												children: author.title
											}),
											/* @__PURE__ */ jsxs("p", {
												className: "text-[10px] text-charcoal-600 mt-0.5",
												children: [
													articleCount,
													" ",
													articleCount === 1 ? "article" : "articles"
												]
											})
										] })]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-sm text-charcoal-400 leading-relaxed line-clamp-3",
										children: author.bio
									}),
									recentArticles.length > 0 && /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-2 pt-3 border-t border-white/5",
										children: [recentArticles.map((article) => /* @__PURE__ */ jsxs(Link, {
											to: `/article/${article.slug}/`,
											className: "group flex items-start gap-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-[9px] tracking-widest uppercase text-gold-500 font-medium mt-0.5 flex-shrink-0",
												children: article.tag
											}), /* @__PURE__ */ jsx("span", {
												className: "text-xs text-charcoal-400 group-hover:text-white transition-colors leading-snug line-clamp-1",
												children: article.title
											})]
										}, article.slug)), /* @__PURE__ */ jsx(Link, {
											to: `/author/${slug}`,
											className: "text-[10px] tracking-widest uppercase text-charcoal-600 hover:text-gold-500 transition-colors mt-1",
											children: "All articles →"
										})]
									})
								]
							}, author.name);
						})
					})
				}),
				/* @__PURE__ */ jsx(Newsletter, {})
			] }),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
//#region src/pages/AboutPage.tsx
function AboutPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-charcoal-950 text-charcoal-100",
		children: [
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsx(Ticker, {}),
			/* @__PURE__ */ jsx(FloatingNav, {}),
			/* @__PURE__ */ jsxs("main", { children: [
				/* @__PURE__ */ jsx("div", {
					className: "border-b border-white/10",
					children: /* @__PURE__ */ jsxs("div", {
						className: "max-w-7xl mx-auto px-4 py-16 lg:py-24",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 mb-6",
							children: [/* @__PURE__ */ jsx("div", { className: "h-px bg-gold-500 w-8" }), /* @__PURE__ */ jsx("span", {
								className: "text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium",
								children: "About"
							})]
						}), /* @__PURE__ */ jsxs("h1", {
							className: "text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl",
							style: { fontFamily: "'Playfair Display', serif" },
							children: [
								"Written by stylists.",
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("em", { children: "Built for everyone." })
							]
						})]
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "max-w-7xl mx-auto px-4 py-14 lg:py-20",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "lg:col-span-7",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-lg md:text-xl text-charcoal-300 leading-relaxed mb-6",
									children: "HairProVoices started with a simple frustration: the best hair knowledge lived inside salons, not on the internet. Colorists, curl specialists, and business coaches were sharing hard-won expertise with clients one chair at a time, but none of it was being written down."
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-base text-charcoal-400 leading-relaxed mb-6",
									children: "We built this publication to change that. Every article on HairProVoices is written or reviewed by a working professional: someone who has spent years behind the chair, in the color lab, or running a salon. We cover technique, trends, hair health, and the business of beauty with the same depth you would expect from a trade publication, but written for anyone who cares about their hair."
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-base text-charcoal-400 leading-relaxed",
									children: "We are independent. We do not accept payment for editorial coverage. When we recommend a product or technique, it is because our contributors believe in it — not because a brand paid us to say so."
								})
							]
						}), /* @__PURE__ */ jsx("div", {
							className: "lg:col-span-5 flex flex-col gap-8",
							children: [
								{
									stat: "85,000+",
									label: "Stylists in our community"
								},
								{
									stat: "200+",
									label: "Articles in planning"
								},
								{
									stat: "15+",
									label: "Contributing professionals"
								}
							].map(({ stat, label }) => /* @__PURE__ */ jsxs("div", {
								className: "border-l-2 border-gold-500 pl-6",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-4xl font-bold text-white mb-1",
									style: { fontFamily: "'Playfair Display', serif" },
									children: stat
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm text-charcoal-500 tracking-wide",
									children: label
								})]
							}, label))
						})]
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "border-t border-white/5 bg-black",
					children: /* @__PURE__ */ jsxs("div", {
						className: "max-w-7xl mx-auto px-4 py-14 lg:py-20",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-10",
							children: "What we stand for"
						}), /* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5",
							children: [
								{
									title: "Expertise first",
									body: "Every piece of advice on this site comes from someone who has done the work."
								},
								{
									title: "Editorial independence",
									body: "We are not a brand channel. Our contributors write freely, and our editors do not accept payment to shape coverage."
								},
								{
									title: "Accessible knowledge",
									body: "Professional hair knowledge should not be locked behind a paywall or a salon appointment. We write for stylists and clients alike. Clearly, without jargon."
								}
							].map(({ title, body }) => /* @__PURE__ */ jsxs("div", {
								className: "bg-black p-8",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-lg font-bold text-white mb-3",
									style: { fontFamily: "'Playfair Display', serif" },
									children: title
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm text-charcoal-500 leading-relaxed",
									children: body
								})]
							}, title))
						})]
					})
				}),
				/* @__PURE__ */ jsx(Newsletter, {})
			] }),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
//#region src/App.tsx
function AppRoutes() {
	return /* @__PURE__ */ jsxs(Routes, { children: [
		/* @__PURE__ */ jsx(Route, {
			path: "/",
			element: /* @__PURE__ */ jsx(HomePage, {})
		}),
		/* @__PURE__ */ jsx(Route, {
			path: "/articles",
			element: /* @__PURE__ */ jsx(ArticlesPage, {})
		}),
		/* @__PURE__ */ jsx(Route, {
			path: "/article/:slug",
			element: /* @__PURE__ */ jsx(ArticlePage, {})
		}),
		/* @__PURE__ */ jsx(Route, {
			path: "/author/:slug",
			element: /* @__PURE__ */ jsx(AuthorPage, {})
		}),
		/* @__PURE__ */ jsx(Route, {
			path: "/gallery",
			element: /* @__PURE__ */ jsx(GalleryPage, {})
		}),
		/* @__PURE__ */ jsx(Route, {
			path: "/contributors",
			element: /* @__PURE__ */ jsx(ContributorsPage, {})
		}),
		/* @__PURE__ */ jsx(Route, {
			path: "/about",
			element: /* @__PURE__ */ jsx(AboutPage, {})
		})
	] });
}
//#endregion
//#region src/entry-server.tsx
function render(url) {
	return renderToString(/* @__PURE__ */ jsx(StaticRouter, {
		location: url,
		children: /* @__PURE__ */ jsx(AppRoutes, {})
	}));
}
//#endregion
export { articles, render };
