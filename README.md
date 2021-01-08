# scv-static
SuttaCentral Voice static website search adapter for bilara-data

[sc-voice.github.io/scv-static](https://sc-voice.github.io/scv-static/)


## When content changes
When examples are changed in scv-static, a Github Action automatically
builds scv-static to reflect content changes.

However, When suttas change, *scv-static* needs to be manually rebuilt to make
the changes visible for other applications such as *scv-bilara* and *Voice*.
To rebuild *scv-static*, open a Linux terminal window in your local *scv-static* 
repository. Type:

```
scripts/build
```

Once the new content is built and committed, Github will automatically deploy
the new content to 
[https:sc-voice.github.io/scv-static](https:sc-voice.github.io/scv-static)




