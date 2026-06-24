"use client";

import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { language, t } = useLanguage();
  const isJa = language === "ja";

  return (
    <footer id="about" className="border-t border-slate-900 bg-slate-950 py-16 px-6 text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand col */}
        <div className="flex flex-col gap-4">
          <a href="/" className="flex items-center gap-2">
            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
            </svg>
            <span className="text-base font-bold tracking-widest text-white">{t.brandName}</span>
          </a>
          <p className="text-xs text-slate-500 font-light leading-relaxed mt-2">
            {t.footer.desc}
          </p>
        </div>

        {/* Dest col */}
        <div className="flex flex-col gap-4 text-xs">
          <h4 className="font-bold text-white uppercase tracking-wider">{t.footer.colDest}</h4>
          <a href="/#destinations" className="hover:text-emerald-400 transition-colors">
            {isJa ? "シーギリヤ＆ダンブッラ" : "Sigiriya & Dambulla"}
          </a>
          <a href="/#destinations" className="hover:text-emerald-400 transition-colors">
            {isJa ? "エッラ＆ヌワラエリヤ" : "Ella & Nuwara Eliya"}
          </a>
          <a href="/#destinations" className="hover:text-emerald-400 transition-colors">
            {isJa ? "ゴール砦＆ヒッカドゥワ" : "Galle Fort & Hikkaduwa"}
          </a>
          <a href="/#destinations" className="hover:text-emerald-400 transition-colors">
            {isJa ? "ミリッサビーチ (ホエールウォッチング)" : "Mirissa Beach (Whale Watching)"}
          </a>
        </div>

        {/* Quick links col */}
        <div className="flex flex-col gap-4 text-xs">
          <h4 className="font-bold text-white uppercase tracking-wider">{t.footer.colServ}</h4>
          <a href="/#services" className="hover:text-emerald-400 transition-colors">{t.footer.quick.transport}</a>
          <a href="/#services" className="hover:text-emerald-400 transition-colors">{t.footer.quick.stays}</a>
          <a href="/guides" className="hover:text-emerald-400 transition-colors">{t.footer.quick.guides}</a>
          <a href="/#services" className="hover:text-emerald-400 transition-colors">{t.footer.quick.airport}</a>
        </div>

        {/* Support col */}
        <div className="flex flex-col gap-4 text-xs">
          <h4 className="font-bold text-white uppercase tracking-wider">{t.footer.colContact}</h4>
          <span className="text-slate-500 font-light">{t.footer.supportEmail}</span>
          <span className="text-slate-500 font-light">{t.footer.supportPhone}</span>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <span>&copy; {new Date().getFullYear()} {t.brandName}. {isJa ? "All rights reserved. (無断転載禁止)" : "All rights reserved."}</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-400 transition-colors">{isJa ? "プライバシーポリシー" : "Privacy Policy"}</a>
          <a href="#" className="hover:text-slate-400 transition-colors">{isJa ? "利用規約" : "Terms of Service"}</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
