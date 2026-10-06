import React from 'react';
import { Link } from 'react-router';
import PageHeader from '../components/shared/PageHeader';

const RajbhashaPage = () => {
  const cards = [
    {
      title: "प्रोत्साहन योजनाएँ",
      desc: "संस्थान स्तरीय राजभाषा शील्ड (प्रोत्साहन) पुरस्कार - संस्थान द्वारा प्रतिवर्ष हिंदी पखवाड़ा के अवसर पर हिंदी में श्रेष्ठ कार्य करने वाले समूह को पुरस्कृत किया जाता है।",
      link: "/rajbhasha/niti"
    },
    {
      title: "प्रशिक्षण कार्यक्रम",
      desc: "संस्थान के कर्मचारियों को राजभाषा में कार्य करने में निपुणता को प्राप्त करने के लिए, राजभाषा विभाग, गृह मंत्रालय, भारत सरकार द्वारा संचालित प्रशिक्षण कार्यक्रमों में भेजा जाता है।",
      link: "/rajbhasha/prashikshan"
    },
    {
      title: "कार्यान्वयन समिति की बैठक",
      desc: "संस्थान नगर राजभाषा कार्यान्वयन समिति के सदस्य हैं। वरिष्ठ/नामित पदाधिकारी नियमित रूप से बैठकों में भाग लेते हैं।",
      link: "/rajbhasha/samiti-baithak"
    },
    {
      title: "प्रमुख लिंक",
      desc: "संस्था में राजभाषा के क्रियान्वयन एवं विस्तार के लिए राजभाषा विभाग, गृहमंत्रालय, भारत सरकार के नियम, प्रावधान, वार्षिक रिपोर्ट आदि की जानकारी के लिए त्वरित लिंक दिए गए हैं।",
      link: "/rajbhasha/links"
    },
    {
      title: "चित्र दीर्घा",
      desc: "कार्यालयीन कार्यों में हिंदी के प्रोत्साहन हेतु कई कार्यक्रम आयोजित होते रहते हैं। इनमें से कुछ कार्यक्रमों की चित्रवीथी अवलोकनार्थ प्रस्तुत है।",
      link: "/rajbhasha/chitra-dirgha"
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="राजभाषा अनुभाग" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Introduction Section */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 md:p-12">
          <h2 className="text-3xl font-bold font-serif text-primary dark:text-blue-400 mb-6">परिचय</h2>

          <div className="flex flex-col lg:flex-row gap-8 items-start mb-6">
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-justify flex-1">
              <p className="mb-4">
                भारतीय संविधान के भाग XVII में अनुच्छेद 343 से 351 तक राजभाषा संबंधी प्रावधान किए
                गए हैं। संविधान के अनुच्छेद 343(1) में यह उल्लेख है कि "संघ की राजभाषा हिंदी होगी और
                उसकी लिपि देवनागरी होगी।"
              </p>
              <p className="mb-4">
                संविधान के अनुच्छेद 351 में यह भी प्रावधान किया गया है कि संघ का यह दायित्व होगा
                कि वह हिंदी भाषा का प्रसार और विकास करे, ताकि यह भारत की सामासिक संस्कृति के
                सभी तत्वों की अभिव्यक्ति का प्रभावी माध्यम बन सके।
              </p>
              <p className="mb-2">
                संविधान की इस भावना के अनुरूप भारत सरकार ने हिंदी के प्रयोग के लिए निम्न विधायी
                एवं प्रशासनिक प्रावधान किए हैं:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4 text-gray-700 dark:text-gray-300">
                <li>राजभाषा अधिनियम, 1963</li>
                <li>राजभाषा नियम, 1976</li>
                <li>राष्ट्रपति के आदेश, 1960</li>
                <li>राजभाषा संकल्प, 1968 (संसद द्वारा पारित)</li>
              </ul>
              <p className="mb-4">
                गृह मंत्रालय के राजभाषा विभाग द्वारा समय-समय पर दिशा-निर्देश, वार्षिक लक्ष्य तथा
                निरीक्षण नीति जारी की जाती है, जिसके अंतर्गत सभी केंद्रीय कार्यालयों को अपने प्रशासनिक
                कार्यों में हिंदी का प्रयोग बढ़ाने हेतु प्रयास करने होते हैं।
              </p>
              <p>
                इसी क्रम में, भारतीय सूचना प्रौद्योगिकी संस्थान, पुणे (IIIT Pune) द्वारा हिंदी के प्रचार-
                प्रसार, उपयोग और राजभाषा नीति के प्रभावी कार्यान्वयन हेतु निरंतर प्रयास किए जा रहे हैं।
              </p>
            </div>

            <div className="w-full lg:w-1/3 shrink-0">
              <img
                src="/rajbhasha/RajbhashaImage.jpeg"
                alt="Rajbhasha Anubhag"
                className="w-full h-auto rounded-xl shadow-md border border-gray-100 dark:border-gray-700 object-cover"
              />
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-2xl font-bold font-serif text-primary dark:text-blue-400 mb-4">
              संस्थान का परिचय एवं राजभाषा गतिविधियाँ
            </h3>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-justify space-y-4">
              <p>
                भारतीय सूचना प्रौद्योगिकी संस्थान, पुणे की स्थापना वर्ष 2016 में की गई थी।
              </p>
              <p>
                संस्थान में राजभाषा नीति के प्रभावी क्रियान्वयन के लिए राजभाषा कार्यान्वयन समिति का
                गठन किया गया है। यह समिति संस्थान के राजभाषा लक्ष्यों की प्राप्ति हेतु नियमित रूप से
                कार्यरत रहती है और हिंदी के प्रयोग को संस्थानिक कार्य संस्कृति में स्थापित करने के लिए
                महत्वपूर्ण भूमिका निभाती है।
              </p>
              <p>
                संस्थान के सभी शासकीय कार्यों में हिंदी के प्रयोग को बढ़ावा देने हेतु कार्यालयी पत्राचार,
                नोटिंग-ड्राफ्टिंग, नाम पट्टिका, सूचना पट्ट, रिपोर्ट एवं वेबसाइट में हिंदी का प्रयोग सुनिश्चित
                किया जाता है।
              </p>
            </div>
          </div>
        </section>

        {/* Cards Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow flex flex-col h-full group"
            >
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-bold font-serif text-primary dark:text-white">
                  {card.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-8 flex-grow leading-relaxed">
                {card.desc}
              </p>
              <Link
                to={card.link}
                className="mt-auto inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                अधिक जानें
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default RajbhashaPage;
