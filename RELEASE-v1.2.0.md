# NAQSH v1.2.0 — Experimental

2026-10-01 · Windows x64 · .NET 10 self-contained · Velopack win feed.

طور الإصدار التطبيق الموجود: واجهة موحدة بثيم فاتح/داكن وموارد عربية وأيقونة، مكتبة بvirtualization، تنويه أول تشغيل، إعدادات schema 2 وبيانات خارج مجلد التثبيت، سجلات منقحة وتشخيص محلي ونسخ احتياطية/استعادة محققة ووضع آمن. أضيف manifest وقنوات تحديث وفحص SHA-256 وهوية الحزمة وسجل معاملة؛ أصلحت حماية CSV ومسارات staging التي تمر عبر junction.

Discord Guild `1496515527877722223` ودعوة [المجتمع](https://discord.gg/2NWFRqXRt) كما قدمهما المالك. **Live Membership Verification: Pending Integration**. اكتملت بنية OAuth/state/nonce/PKCE وcallback محلي وإثبات موقّع وDPAPI ومهلة سماح محدودة للعضو السابق؛ لا Discord Application/Backend HTTPS إنتاجي موصول ولا دخول حي مختبر. طابور الملاحظات محلي محمي، وإرسال Discord يحتاج backend وwebhook خاص. لا secrets في المصدر أو الحزمة ولا bool مخزن لمنح العضوية.

الاختبارات: 282/282 .NET و6/6 Node؛ بناء بلا تحذيرات/أخطاء، 208 render-DPI صور دون قص نص مرصود، Join button يوجه إلى الرابط الصحيح، 1,003 عناصر مكتبة/5 صفوف realized. backend المحلي غير المهيأ أعاد pending/503 بأمان. نجحت تجربة تثبيت 1.1.0/ترقية native إلى 1.2.0، fresh install، reinstall، uninstall مع بقاء بيانات اختبار SHA-256؛ على الحساب الحالي بمسار منفصل، لا clean VM. journal interruptions محاكاة ملفات دائمة؛ rollback UI حي/قطع طاقة وOS scaling/keyboard يدوي اختبارات لاحقة.

المُثبّت **Unsigned**. hashes تتحقق من سلامة التنزيل ولا تحل محل شهادة code-signing. لا دعم لعبة تجارية جديد، ولا محرك تعريب كامل أو مزود ترجمة آلي موصول. تبقى حزم/tag v1.1.0 محفوظة.

Source snapshot (private): `2fd8fcf6ebe21616bfb1ea12eb0b0c1ab21de585`. حزمة canonical من المصدر النظيف لهذا commit؛ tag `v1.2.0` في كل مستودع يشير إلى تاريخ ذلك المستودع، ولا تُنقل الشيفرة الخاصة إلى قناة التوزيع.
