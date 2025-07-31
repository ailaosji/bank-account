import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, ChevronDown, ChevronUp, MessageCircle, Users, Globe, CreditCard, DollarSign, AlertCircle, Youtube, ExternalLink } from 'lucide-react';

const BankComparisonWebsite = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    threshold: 'all',
    management_fee: 'all',
    downgrade: 'all',
    countries: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [expandedBank, setExpandedBank] = useState(null);

  const banksData = useMemo(() => [
    {
      id: 1,
      name: '渣打银行',
      product: '优先理财',
      threshold: '50万',
      thresholdValue: 500000,
      managementFee: '150元/月',
      managementFeeValue: 150,
      downgrade: '是',
      countries: ['新加坡', '香港', '迪拜'],
      internationalTransferFee: '免手续费（同名账户）',
      internationalAccountFee: '等级跟随内地账户',
      advantages: ['香港三大发钞行之一', '国际转账免手续费', '外币定存汇率较高'],
      disadvantages: ['APP体验一般', '也没啥明显的缺点'],
      appRating: 2.5,
      specialNotes: '香港账户律师见证费500-800元，新加坡账户免律师见证',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      name: '汇丰银行',
      product: '卓越理财',
      threshold: '50万',
      thresholdValue: 500000,
      managementFee: '150元/月',
      managementFeeValue: 150,
      downgrade: '是（运筹账户10万）',
      countries: ['香港', '新加坡'],
      internationalTransferFee: '免手续费',
      internationalAccountFee: '一地卓越，全球卓越',
      advantages: ['转账到账快', '全球网点相对较多'],
      disadvantages: ['已被平安集团收购'],
      appRating: 3.5,
      specialNotes: '运筹账户保持10W，否则管理费100元/月',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 3,
      name: '东亚银行',
      product: '显卓理财',
      threshold: '50万',
      thresholdValue: 500000,
      managementFee: '免管理费',
      managementFeeValue: 0,
      downgrade: '是',
      countries: ['香港', '新加坡'],
      internationalTransferFee: '免手续费（同名账户）',
      internationalAccountFee: '等级跟随内地账户',
      advantages: ['无账户管理费', '定存利率目前市场最高', '无论是人民币还是美金'],
      disadvantages: ['分行较少'],
      appRating: 3.0,
      specialNotes: '香港/新加坡账户律师见证费500-800元',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 4,
      name: '恒生银行',
      product: '优越理财',
      threshold: '50万',
      thresholdValue: 500000,
      managementFee: '可申请降级免管理费',
      managementFeeValue: 0,
      downgrade: '是',
      countries: ['香港'],
      internationalTransferFee: '合资格客户免手续费',
      internationalAccountFee: '等级跟随内地账户',
      advantages: ['可在线申请', '和汇丰共享ATM'],
      disadvantages: ['无新加坡账户'],
      appRating: 3.0,
      specialNotes: '香港账户律师见证费500元',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 5,
      name: '星展银行',
      product: '丰盛理财',
      threshold: '100万',
      thresholdValue: 1000000,
      managementFee: '300元/月',
      managementFeeValue: 300,
      downgrade: '是',
      countries: ['新加坡', '香港'],
      internationalTransferFee: '汇美金每笔40美金',
      internationalAccountFee: '等级跟随内地账户',
      advantages: ['新加坡最大的商业银行', '全球最安全的银行之一'],
      disadvantages: ['全球同名账户转账有电汇费用', '中间行收取'],
      appRating: 3.0,
      specialNotes: '香港/新加坡账户律师见证费500元',
      color: 'from-indigo-500 to-indigo-600'
    }
  ], []);

  const filteredBanks = useMemo(() => {
    return banksData.filter(bank => {
      const matchesSearch = bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           bank.product.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesThreshold = selectedFilters.threshold === 'all' || 
                              (selectedFilters.threshold === '50w' && bank.thresholdValue <= 500000) ||
                              (selectedFilters.threshold === '100w' && bank.thresholdValue <= 1000000);
      
      const matchesFee = selectedFilters.management_fee === 'all' ||
                        (selectedFilters.management_fee === 'free' && bank.managementFeeValue === 0) ||
                        (selectedFilters.management_fee === 'paid' && bank.managementFeeValue > 0);
      
      const matchesDowngrade = selectedFilters.downgrade === 'all' ||
                              (selectedFilters.downgrade === 'yes' && bank.downgrade.includes('是'));
      
      const matchesCountries = selectedFilters.countries === 'all' ||
                              (selectedFilters.countries === 'hk' && bank.countries.includes('香港')) ||
                              (selectedFilters.countries === 'sg' && bank.countries.includes('新加坡'));
      
      return matchesSearch && matchesThreshold && matchesFee && matchesDowngrade && matchesCountries;
    });
  }, [searchQuery, selectedFilters, banksData]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  const handleNavClick = (section) => {
    console.log(`Navigate to ${section}`);
    // Add your navigation logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">银行账户对比平台</h1>
            </div>
            <nav className="flex space-x-6">
              <button onClick={() => handleNavClick('home')} className="text-gray-600 hover:text-gray-900 bg-transparent border-none cursor-pointer">首页</button>
              <button onClick={() => handleNavClick('compare')} className="text-gray-600 hover:text-gray-900 bg-transparent border-none cursor-pointer">对比工具</button>
              <button onClick={() => handleNavClick('guide')} className="text-gray-600 hover:text-gray-900 bg-transparent border-none cursor-pointer">开户指南</button>
              <button onClick={() => handleNavClick('discussion')} className="text-gray-600 hover:text-gray-900 bg-transparent border-none cursor-pointer">用户讨论</button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">找到最适合您的银行账户</h2>
          <p className="text-xl mb-8 opacity-90">专业对比分析，帮您做出明智的金融选择</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索银行或产品名称..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-gray-700 hover:text-gray-900 mb-4"
          >
            <Filter className="w-5 h-5 mr-2" />
            筛选条件
            {showFilters ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
          </button>
          
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">开户门槛</label>
                <select
                  value={selectedFilters.threshold}
                  onChange={(e) => setSelectedFilters({...selectedFilters, threshold: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">全部</option>
                  <option value="50w">50万及以下</option>
                  <option value="100w">100万及以下</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">管理费</label>
                <select
                  value={selectedFilters.management_fee}
                  onChange={(e) => setSelectedFilters({...selectedFilters, management_fee: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">全部</option>
                  <option value="free">免管理费</option>
                  <option value="paid">有管理费</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">支持降级</label>
                <select
                  value={selectedFilters.downgrade}
                  onChange={(e) => setSelectedFilters({...selectedFilters, downgrade: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">全部</option>
                  <option value="yes">支持降级</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">支持地区</label>
                <select
                  value={selectedFilters.countries}
                  onChange={(e) => setSelectedFilters({...selectedFilters, countries: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">全部</option>
                  <option value="hk">香港</option>
                  <option value="sg">新加坡</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            银行账户对比 ({filteredBanks.length} 个结果)
          </h3>
        </div>

        {/* Bank Cards */}
        <div className="space-y-6">
          {filteredBanks.map((bank) => (
            <div key={bank.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${bank.color} p-6 text-white`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-bold">{bank.name}</h4>
                    <p className="text-lg opacity-90">{bank.product}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{bank.threshold}</div>
                    <div className="text-sm opacity-90">开户门槛</div>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Key Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-600">管理费</div>
                      <div className="font-semibold">{bank.managementFee}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-600">支持降级</div>
                      <div className="font-semibold">{bank.downgrade}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-purple-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-600">支持地区</div>
                      <div className="font-semibold">{bank.countries.join(', ')}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-orange-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-600">APP体验</div>
                      {renderStars(bank.appRating)}
                    </div>
                  </div>
                </div>

                {/* Expandable Details */}
                <button
                  onClick={() => setExpandedBank(expandedBank === bank.id ? null : bank.id)}
                  className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium">查看详细信息</span>
                  {expandedBank === bank.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>

                {expandedBank === bank.id && (
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-green-700 mb-2">优点</h5>
                        <ul className="space-y-1">
                          {bank.advantages.map((advantage, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-red-700 mb-2">缺点</h5>
                        <ul className="space-y-1">
                          {bank.disadvantages.map((disadvantage, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                              <span className="text-red-500 mr-2">✗</span>
                              {disadvantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-blue-900 mb-2">费用详情</h5>
                      <div className="space-y-2 text-sm">
                        <div><strong>国际汇款手续费：</strong>{bank.internationalTransferFee}</div>
                        <div><strong>国际账户管理费：</strong>{bank.internationalAccountFee}</div>
                        <div><strong>特别说明：</strong>{bank.specialNotes}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredBanks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">没有找到符合条件的银行账户</div>
            <div className="text-gray-400 text-sm mt-2">请尝试调整筛选条件或搜索关键词</div>
          </div>
        )}
      </section>

      {/* Expert Recommendation */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">专家建议</h3>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                要说哪家最好，这个真没有确切的答案，还是那句话<strong>"适合自己的就是最好的"</strong>。
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>选新加坡账户</strong>当然首选是星展银行，另外，星展银行有个固定派息的产品，不过对客户要求很高。</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>香港账户</strong>首选渣打银行。</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>如果你<strong>没有太多资金</strong>能放银行，那就选东亚。</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>汇丰和恒生其实是一家，如果已经去香港开过汇丰One账户，那选汇丰也不错。</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>没时间去线下分行</strong>的朋友，或者你在的地方没有这些银行的分行，那就选恒生，直接在手机上就能开通恒生银行账户。</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Discussion Section */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">用户讨论区</h3>
            <p className="text-gray-600">分享您的开户经验，帮助其他用户做出更好的选择</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <div className="text-gray-600 mb-4">
              评论功能将通过 Giscus 集成，基于 GitHub Discussions
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              加载评论区
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">银行账户对比平台</h4>
              <p className="text-gray-400">帮助用户找到最适合的银行账户，做出明智的金融选择。</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => handleNavClick('guide')} className="hover:text-white bg-transparent border-none cursor-pointer text-left p-0 text-gray-400">开户指南</button></li>
                <li><button onClick={() => handleNavClick('calculator')} className="hover:text-white bg-transparent border-none cursor-pointer text-left p-0 text-gray-400">费用计算器</button></li>
                <li><button onClick={() => handleNavClick('faq')} className="hover:text-white bg-transparent border-none cursor-pointer text-left p-0 text-gray-400">常见问题</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">关注我们</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => window.open('https://www.youtube.com/@laosji', '_blank')} 
                  className="flex items-center text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-left p-0"
                >
                  <Youtube className="w-5 h-5 mr-2" />
                  YouTube
                </button>
                <button 
                  onClick={() => window.open('https://laosji.net/', '_blank')} 
                  className="flex items-center text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-left p-0"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  官网
                </button>
                <button 
                  onClick={() => window.open('https://x.com/laosji_fuli', '_blank')} 
                  className="flex items-center text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-left p-0"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  X (Twitter)
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">联系我们</h4>
              <p className="text-gray-400">如有问题或建议，欢迎联系我们。</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 银行账户对比平台. 所有权利保留.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BankComparisonWebsite;
