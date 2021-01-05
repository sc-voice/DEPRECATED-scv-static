# scv-static
SuttaCentral Voice static website search adapter for bilara-data

[sc-voice.github.io/scv-static](https://sc-voice.github.io/scv-static/)


# Build
When examples or suttas change, *scv-static* needs to be rebuilt to make
the changes visible for other applications such as *scv-bilara* and *Voice*.
To rebuild *scv-static*, open a Linux terminal window in your local *scv-static* 
repository. Type:

```
scripts/build
git commit -am "build examples"
git push
```

# Deploy
To update [sc-voice.github.io/scv-static](https://sc-voice.github.io/scv-static)
with latest *scv-static* content, first build *scv-static* (see above), then
open a Linux terminal window in your local *scv-static* repository and type:

```
scripts/deploy
```


