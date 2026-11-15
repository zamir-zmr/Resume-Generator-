KODULAR BLOCKS - Resume Maker (Print / PDF / Share ke liye)

Components jo Screen1 mein hone chahiye: Web_Viewer1, Activity_Starter1, Sharing1 (tumhare paas pehle se hain).

Designer mein Activity_Starter1:
  Action = android.intent.action.VIEW
  (DataUri khali chhod do - block se set hoga)

Blocks:

when Web_Viewer1.WebViewStringChange (value)
do  if   contains text( get value , piece "open:" )
    then set Activity_Starter1.DataUri  to  replace all( text = get value , segment = "open:" , replacement = "" )
         call Activity_Starter1.StartActivity
    else if contains text( get value , piece "share:" )
    then call Sharing1.ShareMessage
            message = replace all( text = get value , segment = "share:" , replacement = "" )

(Purane block mein "Download PDF" wala message hata do, wo ab nahi chahiye.)

Back button ke liye (optional):
when Screen1.BackPressed
do  if Web_Viewer1.CanGoBack then call Web_Viewer1.GoBack else close application

Kaise kaam karta hai:
- Print / PDF / Share dabane par app "open:<link>" bhejta hai -> phone ka browser (Chrome) resume ke saath khulta hai
  -> wahan PDF download / Print dialog / Share PDF automatically chalta hai.
- Save = app ke andar save (autosave bhi hota hai). Load = file chuno ya text paste karo.
- Photo: WebView ka file chooser chahiye (Kodular Web Viewer mein file upload allowed hona chahiye).
