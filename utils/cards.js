const images = []

images['KFPEPE'] = 'QmNPecJjQpggFW3o6ZFoypMrMmLDhxH7oJfjRi1WJA47kq'
images['PEPESTREET'] = 'QmPa25z4Ls4coXtyFKu7wPhsjJ3dnCGcrhGF9LqsSp96Rg'
images['ZENPEPE'] = 'QmThcgQnhJWYzPz7y72jf3v7DPoqW34pyPJeUVjVCrZPzM'
images['PEPRESSIONISM'] = 'QmXLZPkDaM4oqvTUk9mRJgZHzrr2NYE9Xvu7C5sPVpXXVp'
images['PEPEBANKSY'] = 'QmapEhHjuv6uPCmappE4s2zbPGfrUR4soWHe66E6GL6EwH'
images['MONAPEPE'] = 'QmPXsYvAds2Cyuw6hTL12N9Gq9wWdK6m3Br3BVdNCVTYhc'
images['LORDRARE'] = 'QmZj6acc6qMfN1T63b9ewzLfr4JrrEwzh85rwsp2fjwoyR'
images['BASEBALLPEPE'] = 'QmQkXSTDGgWhXqpEjJ2iJWUhoM9k668WK7B2aguCcacaA3'
images['BATPEPE'] = 'QmThrG3akTUtLD3rohRJsLRifNmCB4Ach8Ad31s4oPA6b5'
images['HOTDOGPEPE'] = 'QmSTw3VE8f2WGcsDwiiAUn84uMhEwMe9FwPp7mhFWVFJ17'
images['KINGRARE'] = 'QmWWizgmv3fA1QPf4vPgfXR8t71WKRd6ayTP81cXcZ5M8Z'
images['ACCEPTRARE'] = 'QmbTrry8QGmDL3zcBMmqzrS6xeTRfD7EDbGiB4QaMjCcp5'
images['NEVERENDINGPEPE'] = 'QmeN56gevYaThzTPiJXngi3a1VDC1xjsp8fp9TTHoSTs8B'
images['PEPEGOD'] = 'QmcnuBLCBUanR87hEHFEZDXToDjzKDfsjEePqxPLBG2cDP'
images['PEPEGOLD'] = 'QmPX71LV2C6t5d5UKsJRCugAKNEbTioFL3nfBghoT6Tv11'
images['NEWPEPE'] = 'QmQv5GWLhwRGsoRKvN1bgsQBi3RHd5p4pyPaNPq71PgsaN'
images['PEPETTE'] = 'QmQjJUhzixMpbn8RSc6nB8fD5e2XSwb9wuTAf4gqfPd4dJ'
images['VAPORPEPE'] = 'QmazhPv3ZyPuGSJP7GZGkpV3GjnFeRd7L3rGGVBNHPwQEU'
images['PEPESTENCIL'] = 'QmRA7z9FGcMrMDQ8B5QhvAQLD2Cpa6WKKAvdVFT4HbANTG'
images['GlitchPepe'] = 'QmYMDDB3jcyN2sEByiK6xiQYSiNk3GVJqoUXdGJKcnoC2V'
images['PEPERIUMCLASSIC'] = 'QmYsUg4Li44A15BzuvDi5yaWhqqXZtHJH44CedHjhk2Cp5'
images['CHILLPEPE'] = 'QmaHDZ6X2QpEctQCDqd4uG113DCfLaJTFrC1MaubLNjwbR'
images['RUINSOFPEPE'] = 'QmW7NB2SEyVRxnDSo8cxZ686c5wgeiJfibfda2kE8G62Zg'
images['GIGERPEPECITY'] = 'QmVXFfbRyRzJBqh71QJHDUwCe69Wi7Rb4DTE8u6HnJUT1N'
images['PEPEZEUSLIGHT'] = 'QmSRXeC8Cig6pstNN5VRUhWxtxhGrBUnpkWZ8bGxP76qrF'
images['CRIMEANDPEPESHMENT'] = 'QmUKnaF7gsVNgMBvmPTHQKoxZ4yB1o498q7NZLuRcmx94p'
images['PEPENEMSTEAK'] = 'QmXDuNGWPEzS3T1eLv2fCoTkqkgZrc68TpEJUnsoumwcmg'
images['RPALPHASTIK'] = 'QmcpLiXGBFveVkza6ZrziirXnRsBWyffTy7io1a1atFMUK'
images['UNDEADPEPE'] = 'QmSR3np1ZjTLvVPwfQRywoNcXDJAHgiHGz2bYunzmxfi4B'
images['MHV'] = 'QmezRjeNT8dXoVHjihxLZt9DQUpX3wDfKZPSgcEdorecPy'
images['PBJCAT'] = 'QmYShHHTU87siNdNjy8wbb6Stnx5XFMF8uzwuHfCJHUBYm'

images['TAOWARARE'] = 'QmWVGD3uU9u7S5KKgt7KRmEEzGRKpMxsK5AxGrA3kw1kL5'

const getAmount = (cardId, amount) => {
    if(cardId === '99') {
        return amount / 10 ** 8
    }

    return amount
}

module.exports = exports = {
    getAmount,
    images
}