import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request(
    'https://api.elasticemail.com/v4/emails/transactional',
    data=b'{"Recipients":{"To":["echsateesh@gmail.com"]},"Content":{"Body":[{"ContentType":"HTML","Charset":"utf-8","Content":"Test"}],"From":"airainfrahyd@gmail.com","Subject":"New Enquiry"}}',
    headers={
        'Content-Type': 'application/json',
        'X-ElasticEmail-ApiKey': 'AF00E573A3325343A19D859A31B164DF6C1D594C387CAC2767E552A0FA1D8409323851FE89DD6D539FFAF054B9D180A3'
    }
)
try:
    print(urllib.request.urlopen(req, context=ctx).read())
except urllib.error.HTTPError as e:
    print(e.read())
