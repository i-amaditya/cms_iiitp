import React, { useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';

const RajbhashaLinksPage = () => {
  useEffect(() => {
    document.title = "प्रमुख लिंक | राजभाषा अनुभाग - IIIT Pune";
  }, []);

  const policyLinks = [
    {
      name: "राजभाषा संबंधी प्रावधान",
      url: "https://rajbhasha.gov.in/hi/ol_clause",
      desc: "संविधान के भाग 17 में उल्लिखित संघ की राजभाषा संबंधी संवैधानिक प्रावधान।"
    },
    {
      name: "संसदीय राजभाषा समिति की सिफारिशों पर जारी राष्ट्रपति आदेश",
      url: "https://rajbhasha.gov.in/hi/committee_recommendations_issued",
      desc: "राजभाषा नीति के सुदृढ़ीकरण हेतु जारी किए गए विभिन्न राष्ट्रपति आदेश।"
    },
    {
      name: "वार्षिक कार्यक्रम एवं रिपोर्ट",
      url: "https://rajbhasha.gov.in/hi/annual-programme-and-reports",
      desc: "गृह मंत्रालय द्वारा प्रतिवर्ष जारी किया जाने वाला राजभाषा कार्यान्वयन कार्यक्रम।"
    },
    {
      name: "संसदीय राजभाषा समिति की निरीक्षण प्रश्नावली",
      url: "https://rajbhasha.gov.in/hi/%E0%A4%B8%E0%A4%82%E0%A4%B8%E0%A4%A6%E0%A5%80%E0%A4%AF-%E0%A4%B0%E0%A4%BE%E0%A4%9C%E0%A4%AD%E0%A4%BE%E0%A4%B7%E0%A4%BE-%E0%A4%B8%E0%A4%AE%E0%A4%BF%E0%A4%A4%E0%A4%BF-%E0%A4%95%E0%A5%80-%E0%A4%A8%E0%A4%BF%E0%A4%B0%E0%A5%80%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%A3-%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%B6%E0%A5%8D%E0%A4%A8%E0%A4%BE%E0%A4%B5%E0%A4%B2%E0%A5%80",
      desc: "समिति द्वारा सरकारी कार्यालयों के निरीक्षण हेतु उपयोग की जाने वाली प्रश्नावली।"
    },
    {
      name: "राजभाषा तिमाही प्रगति रिपोर्ट प्रोफार्मा",
      url: "https://rajbhasha.gov.in/hi/news/%E0%A4%A4%E0%A4%BF%E0%A4%AE%E0%A4%BE%E0%A4%B9%E0%A5%80-%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%97%E0%A4%A4%E0%A4%BF-%E0%A4%B0%E0%A4%BF%E0%A4%AA%E0%A5%8B%E0%A4%B0%E0%A5%8D%E0%A4%9F-%E0%A4%95%E0%A5%87-%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A5%8B%E0%A4%AB%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%AE%E0%A5%87-%E0%A4%AE%E0%A5%87%E0%A4%82-%E0%A4%95%E0%A4%BF%E0%A4%8F-%E0%A4%97%E0%A4%8F-%E0%A4%B8%E0%A4%82%E0%A4%B6%E0%A5%8B%E0%A4%A7%E0%A4%A8-%E0%A4%95%E0%A5%87-%E0%A4%B8%E0%A4%82%E0%A4%AC%E0%A4%82%E0%A4%A7-%E0%A4%AE%E0%A5%87%E0%A4%82-%E0%A5%A4",
      desc: "कार्यालयों द्वारा भेजी जाने वाली तिमाही रिपोर्ट का अद्यतन प्रारूप।"
    },
    {
      name: "पुस्तकालयों के लिए चयनित हिंदी पुस्तकों की सूची",
      url: "https://rajbhasha.gov.in/hi/Hindi_selected_list_of_books",
      desc: "सरकारी पुस्तकालयों में क्रय हेतु अनुमोदित पुस्तकों की निर्देशिका।"
    },
    {
      name: "हिंदी शब्द-सिंधु",
      url: "https://hindishabdsindhu.rajbhasha.gov.in/",
      desc: "राजभाषा विभाग का विस्तृत आधिकारिक हिंदी शब्दकोश पोर्टल।"
    }
  ];

  const toolLinks = [
    {
      name: "प्रशासनिक शब्दावली",
      url: "/documents/Glossary-Administrative-Terms.pdf",
      desc: "कार्यालयीन कार्यप्रणाली में प्रयुक्त मानक प्रशासनिक अंग्रेजी-हिंदी शब्द संग्रह।"
    },
    {
      name: "सरल प्रशासनिक शब्दावली",
      url: "/documents/saralshabdavali.pdf",
      desc: "दैनिक कार्यालयीन पत्राचार को सुगम बनाने वाली सामान्य प्रशासनिक शब्दावली।"
    },
    {
      name: "कंप्यूटर विज्ञान शब्दावली",
      url: "/documents/glossary-computer-science-eng-hin.pdf",
      desc: "संगणक (कंप्यूटर) एवं संबद्ध अभियांत्रिकी से जुड़े तकनीकी शब्दों का संग्रह।"
    },
    {
      name: "सूचना प्रौद्योगिकी शब्द संग्रह",
      url: "/documents/glossary-information-technology.pdf",
      desc: "आईटी एवं डिजिटल संचार क्षेत्र में उपयोग होने वाली प्रामाणिक शब्दावली।"
    },
    {
      name: "देवनागरी लिपि तथा हिंदी वर्तनी का मानकीकरण",
      url: "/documents/devnagri-lipi.pdf",
      desc: "भारत सरकार द्वारा अनुमोदित मानक वर्तनी एवं देवनागरी वर्णमाला नियमपुस्तिका।"
    },
    {
      name: "हिंदी स्वयं शिक्षण (लीला) - प्रबोध, प्रवीण एवं प्राज्ञ",
      url: "https://lilappp.rb-aai.in/#!",
      desc: "कंप्यूटर के माध्यम से हिंदी सीखने का उत्कृष्ट ई-लर्निंग प्रोग्राम (LILA)。"
    },
    {
      name: "भारती - बहुभाषी अनुवाद सारथी",
      url: "https://bharati.rajbhasha.gov.in/",
      desc: "राजभाषा विभाग द्वारा संचालित आधुनिक बहुभाषी कंप्यूटर अनुवाद प्रणाली।"
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="राजभाषा अनुभाग" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 md:p-12">
          <h2 className="text-3xl font-bold font-serif text-primary dark:text-blue-400 mb-6">
            प्रमुख लिंक (Useful Links)
          </h2>

          <hr className="border-gray-200 dark:border-gray-700 mb-8" />

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            राजभाषा से संबंधित सभी विभागों एवं अधिकारियों के लिए उपयोगी लिंक संलग्न है, इन लिंक का उद्देश्य संस्थान के कर्मचारियों को राजभाषा कार्यों के निष्पादन में सहायता एवं सुविधा प्रदान करना है।
          </p>

          <div className="space-y-10">
            {/* Rules and Policies */}
            <div>
              <h3 className="text-2xl font-bold font-serif text-primary dark:text-white mb-6 border-b pb-2 border-gray-100 dark:border-gray-800">
                राजभाषा नियम, नीति एवं रिपोर्ट
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {policyLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 bg-gray-50 hover:bg-gray-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 rounded-xl border border-gray-200 dark:border-gray-800 transition-colors group"
                  >
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 group-hover:underline mb-2 flex items-center">
                      {link.name} <span className="ml-1 inline-block transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {link.desc}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Glossaries and Tools */}
            <div>
              <h3 className="text-2xl font-bold font-serif text-primary dark:text-white mb-6 border-b pb-2 border-gray-100 dark:border-gray-800">
                शब्दावली एवं ई-टूल्स
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {toolLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 bg-gray-50 hover:bg-gray-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 rounded-xl border border-gray-200 dark:border-gray-800 transition-colors group"
                  >
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 group-hover:underline mb-2 flex items-center">
                      {link.name} <span className="ml-1 inline-block transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {link.desc}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RajbhashaLinksPage;
